export function getHomePageTemplate(locations, eventTypes) {
    return `
    <div id="content" class="flex-wrap">
        <div class="px-4">
        <div class="pt-4">
          <h1>Exploreaza evenimente</h1>
          <div class="search-div">
            <div class="search-div px-5">
            <input type="text" id="search-name" placeholder="Nume eveniment" class="search-input zoom-out px-4 rounded" />
            </div>
            <button id="search-button" class="search-button zoom-out px-5 py-2 text-white rounded">
              <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
            </button>
            <button id="filter-show-button" class="filter-show-button zoom-out px-5 py-2 text-white rounded">
            <i class="fa-solid fa-filter" style="color: #ffffff;"></i></i>
            </button>
          </div>
          <div class="filter-div p-4">
            <div class="select-div">
              <select id="filter-location" class="filter-location zoom-out hidden rounded">
                <option value="">Location</option>
                ${locations}
              </select>
            </div>
            <div class="select-div pr-4">
              <select id="filter-eventType" class="filter-eventType zoom-out hidden rounded">
                <option value="">Type</option>
                ${eventTypes}
              </select>
            </div>
            <div class="select-div">
              <button id="filter-button" class="filter-button zoom-out hidden px-5 py-2 text-white rounded">
                Aplica filtre
              </button>
            </div>
            <div class="select-div">
              <button id="delete-filter-button" class="delete-filter-button zoom-out hidden px-5 py-2 text-white rounded">
                Sterge filtre
              </button>
            </div>
          </div>
        </div>
        </div>
        <div class="events flex flex-wrap item-center justify-center">
        </div>
    </div>
  `;
  }
  
export function getOrdersPageTemplate() {
    return `
        <div id="content">
          <h1 class="pt-4 text-center">Istoric Comenzi</h1>
          <div class="purchases ml-6 mr-6">
            <div class="purchases px-4 py-4 flex font-bold text-xl">
              <span class="ticket zoom-out-purchase">
                Nume
                <button class="sort-name-button"><i id="name-desc" class="fa-solid fa-arrow-down-wide-short" style="color: #ffffff;"></i></button>
              </span>
              <span class="ticket">Nr tickets</span>
              <span class="ticket">Categorie</span>
              <span class="ticket">Data</span>
              <span class="ticket zoom-out-purchase">
                Pret
                <button class="sort-price-button"><i id="price-desc" class="fa-solid fa-arrow-down-wide-short" style="color: #ffffff;"></i></button>
              </span>
              <span class="ticket">Edit</span>
            </div>
          </div>
        </div>
    `;
  }