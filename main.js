import { addEvents } from './src/utils';
import { createOrder } from './src/components/createOrder.js';
import { removeLoader, addLoader } from './src/components/loader.js';
import { getLocations, getEventTypes, loadImage, sortOrdersByPrice, sortOrdersByName } from './src/components/utils';
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

function setupOrdersPage() {
  const sortNameButton = document.querySelector('.sort-name-button');
  const sortPriceButton = document.querySelector('.sort-price-button');

  sortNameButton.addEventListener('click', () => {
    handleSortNameButton();
  });

  sortPriceButton.addEventListener('click', () => {
    handleSortPriceButton();
  });
}

function handleSortNameButton() {
  const sortNameButton = document.querySelector('.sort-name-button');
  const nameCresc = document.getElementById('name-cresc');
  let string = '';

  if(nameCresc === null){
    sortNameButton.innerHTML = '<i id="name-cresc" class="fa-solid fa-arrow-up-wide-short" style="color: #ffffff;"></i>';
    string = 'asc';
  }
  else {
    sortNameButton.innerHTML = '<i id="name-desc" class="fa-solid fa-arrow-down-wide-short" style="color: #ffffff;"></i>';
    string = 'desc';
  }

  fetchOrders().then((data) => {
    sortOrdersByName(data, string);
  });

}

function handleSortPriceButton() {
  const sortPriceButton = document.querySelector('.sort-price-button');
  const priceCresc = document.getElementById('price-cresc');
  let string = '';
  
  if(priceCresc === null){
    sortPriceButton.innerHTML = '<i id="price-cresc" class="fa-solid fa-arrow-up-wide-short" style="color: #ffffff;"></i>';
    string = 'asc';
  }
  else {
    sortPriceButton.innerHTML = '<i id="price-desc" class="fa-solid fa-arrow-down-wide-short" style="color: #ffffff;"></i>';
    string = 'desc';
  }

  fetchOrders().then((data) => {
    sortOrdersByPrice(data, string);
  });
}

function setupSearchEvents() {
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');
  const filterShowButton = document.querySelector('.filter-show-button');

  searchButton.addEventListener('click', () => {
    handleSearchButton(searchInput);
  });

  filterShowButton.addEventListener('click', () => {
    handleFilterShowButton();
  });
}

function handleFilterShowButton(){
  const filterButton = document.querySelector('.filter-button');
  const filterLocation = document.querySelector('.filter-location');
  const filterEventType = document.querySelector('.filter-eventType');
  const deleteFilterButton = document.querySelector('.delete-filter-button');

  const style = window.getComputedStyle(filterLocation);

  if(style.display === 'none'){
    filterButton.classList.remove('hidden');
    filterLocation.classList.remove('hidden');
    filterEventType.classList.remove('hidden');

    filterButton.addEventListener('click', () => {
      handleFilterButton(filterLocation, filterEventType);
    });

    deleteFilterButton.classList.remove('hidden');

    deleteFilterButton.addEventListener('click', () => {
      handleDeleteFilterButton(filterLocation, filterEventType);
    });
  }
  else {
    filterButton.classList.add('hidden');
    filterLocation.classList.add('hidden');
    filterEventType.classList.add('hidden');
    deleteFilterButton.classList.add('hidden');
  }

}

function handleFilterButton(filterLocation, filterEventType) {
  addLoader();

  fetchEventsByLocationAndEventType(filterLocation, filterEventType)
    .then((data) => {
      setTimeout(() => {
        removeLoader();
      }, 200);
      addEvents(data);
    });
}

function handleDeleteFilterButton(filterLocation, filterEventType){
  addLoader();
  filterLocation.value = '';
  filterEventType.value = '';

  fetchEventsByLocationAndEventType(filterLocation, filterEventType)
    .then((data) => {
      setTimeout(() => {
        removeLoader();
      }, 200);
      addEvents(data);
    });
}

function handleSearchButton(searchInput) {
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
  
  const orderDiv = document.createElement('div');
  orderDiv.id = "orders-div-line";

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
            orderDiv.appendChild(newOrder);
          });
        }
      });
  }

  purchasesDiv.appendChild(orderDiv);
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
    setupOrdersPage();
  }
}


setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();
