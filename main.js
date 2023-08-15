import { addEvents } from './src/utils';
import { createOrder } from './src/components/createOrder.js';
import { removeLoader, addLoader } from './src/components/loader.js';
import { getLocations, getEventTypes, loadImage } from './src/components/utils';
import { getHomePageTemplate, getOrdersPageTemplate } from './src/components/pageTemplates';
import { fetchEvents, fetchEventsByLocationAndEventType, fetchEventsByName, fetchOrders } from './src/components/fetchs';

function setupNavigationEvents() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const href = link.getAttribute('href');
      navigateTo(href);
    });
  });
}

function setupMobileMenuEvent() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
}

function setupPopstateEvent() {
  window.addEventListener('popstate', () => {
    const currentUrl = window.location.pathname;
    renderContent(currentUrl);
  });
}

function setupInitialPage() {
  const initialUrl = window.location.pathname;
  renderContent(initialUrl);
}

function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}

function setupSearchEvents() {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');

  searchButton.addEventListener('click', () => {
    handleSearchButton(searchInput);
  });

  const filterButton = document.querySelector('.filter-button');
  const filterLocation = document.querySelector('.filter-location');
  const filterEventType = document.querySelector('.filter-eventType');

  filterButton.addEventListener('click', () => {
    handleFilterButton(filterLocation, filterEventType);
  });
}

function handleFilterButton(filterLocation, filterEventType){
  addLoader();

  fetchEventsByLocationAndEventType(filterLocation, filterEventType)
    .then((data) => {
      setTimeout(() => {
        removeLoader();
      }, 200);
      addEvents(data);
    });
}

function handleSearchButton(searchInput){
  addLoader();

  fetchEventsByName(searchInput.value)
    .then((data) => {
      setTimeout(() => {
        removeLoader();
      }, 200);
      addEvents(data);
    });
}

async function renderEventPage(events) {
  const locations = getLocations(events);
  const eventTypes = getEventTypes(events);

  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate(locations, eventTypes);
  addLoader();

  fetchEvents()
    .then((data) => {
      setTimeout(() => {
        removeLoader();
      }, 200);
      addEvents(data);
    });
}

async function renderOrdersPage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getOrdersPageTemplate();

  const purchasesDiv = document.querySelector('.purchases');
  addLoader();

  if (purchasesDiv) {
    fetchOrders()
      .then((orders) => {
        if (orders.length > 0) {
          setTimeout(() => {
            removeLoader();
          }, 200);
          orders.forEach((order) => {
            const newOrder = createOrder(order);
            purchasesDiv.appendChild(newOrder);
          });
        }
      });
  }
}

// Render content based on URL
async function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  const events = await fetchEvents();

  if (url === '/events') {
    renderEventPage(events);
    setupSearchEvents();
  } else if (url === '/orders') {
    renderOrdersPage();
  }
}


setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();
