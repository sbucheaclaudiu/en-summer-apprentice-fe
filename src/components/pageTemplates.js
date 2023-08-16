export function getHomePageTemplate(locations, eventTypes) {
    return `
    <div id="content">
        <div class="p-4">
        <div class="p-4">
          <h1>Cauta evenimente</h1>
          <div class="search-div">
            <div class="search-div px-5">
            <input type="text" id="search-name" placeholder="Nume eveniment" class="search-input zoom-out px-4 rounded" />
            </div>
            <button id="search-button" class="search-button zoom-out px-5 py-2 text-white rounded">
              <i class="fa-solid fa-magnifying-glass" style="color: #ffffff;"></i>
            </button>
          </div>
          <div class="filter-div p-4">
            <div class="select-div">
              <select id="filter-location" class="filter-location zoom-out rounded">
                <option value="">Location</option>
                ${locations}
              </select>
            </div>
            <div class="select-div">
              <select id="filter-eventType" class="filter-eventType zoom-out rounded">
                <option value="">Type</option>
                ${eventTypes}
              </select>
            </div>
            <div class="select-div">
              <button id="filter-button" class="filter-button zoom-out px-5 py-2 text-white rounded">
                Aplica filtre
              </button>
            </div>
            <div class="select-div">
              <button id="delete-filter-button" class="delete-filter-button zoom-out px-5 py-2 text-white rounded">
                Sterge filtre
              </button>
            </div>
          </div>
        </div>
        </div>
        <div class="events flex items-center justify-center flex-wrap">
        </div>
    </div>
  `;
  }
  
export function getOrdersPageTemplate() {
    return `
        <div id="content">
          <h1 class="text-2xl mb-6 mt-8 text-center">Orders History</h1>
          <div class="purchases ml-6 mr-6">
            <div class="purchases px-4 py-4 flex font-bold text-xl">
              <span class="ticket">Name</span>
              <span class="ticket">Nr tickets</span>
              <span class="ticket">Category</span>
              <span class="ticket">Date</span>
              <span class="ticket">Price</span>
              <span class="ticket">Edit</span>
            </div>
          </div>
        </div>
    `;
  }