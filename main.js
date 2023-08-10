import { addEvents } from './src/utils';
let events = null;

// Navigate to a specific URL
function navigateTo(url) {
  history.pushState(null, null, url);
  renderContent(url);
}

// HTML templates
function getHomePageTemplate() {
  return `
  <div id="content" >
      <div class="events flex items-center justify-center flex-wrap">
      </div>
  </div>
`;
}

function getOrdersPageTemplate() {
  return `
  <div id="content" class="hidden">
    <div class="flex flex-col items-center">
      <div class="w-80">
        <h1>Explore Events</h1>
      </div>
    </div>
    <div class="events flex items-center justify-center flex-wrap">
    </div>
  </div>
  `;
}


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

function loadImage(data) {
  data.forEach(event => {
    if(event.eventName == "Untold") event.photo = "src/assets/untold.jpg"
    else if(event.eventName == "Electric Castle") event.photo = "src/assets/electric.jpeg"
    else if(event.eventName == "Meci de fotbal") event.photo = "src/assets/game.jpg"
    else if(event.eventName == "Wine Festival") event.photo = "src/assets/wine.jpg"
  });

  return data;
}


async function fetchEvents() {
  const response = await fetch('http://localhost:8080/api/events', {mode:'cors'});
  const data = await response.json();

  return loadImage(data);
}

async function fetchOrders() {
  const response = await fetch('/api/orders');
  const orders = await response.json();
  return orders;
}

async function renderHomePage() {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = getHomePageTemplate();

  fetchEvents()
    .then((data) => {
      addEvents(data);
    });
}

function renderOrdersPage() {}

// Render content based on URL
function renderContent(url) {
  const mainContentDiv = document.querySelector('.main-content-component');
  mainContentDiv.innerHTML = '';

  if (url === '/events') {
    renderHomePage();
  } else if (url === '/orders') {
    renderOrdersPage();
  }
}


// Call the setup functions
setupNavigationEvents();
setupMobileMenuEvent();
setupPopstateEvent();
setupInitialPage();
