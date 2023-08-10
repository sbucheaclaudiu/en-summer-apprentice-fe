import { useStyle } from './styles';

const createEventElement = (eventData) => {

  const eventDiv = document.createElement('div');
  const eventWrapperClasses = useStyle('eventWrapper');
  const actionsWrapperClasses = useStyle('actionsWrapper');
  const quantityClasses = useStyle('quantity');
  const inputClasses = useStyle('input');
  const quantityActionsClasses = useStyle('quantityActions');
  const increaseBtnClasses = useStyle('increaseBtn');
  const decreaseBtnClasses = useStyle('decreaseBtn');
  const addToCartBtnClasses = useStyle('addToCartBtn');

  eventDiv.classList.add(...eventWrapperClasses);

  const contentMarkup = `
  <img src="${eventData.photo}" alt="${eventData.eventName}" class="event-image">
    <div class="content p-5">
      <p class="event-title text-2xl font-bold">${eventData.eventName}</p>
      <p class="description text-gray-700">${eventData.description}</p>
      <p class="date text-gray-700">Date: ${eventData.startDate.slice(0,10)} - ${eventData.endDate.slice(0,10)}</p>
    </div>
  `;
  eventDiv.innerHTML = contentMarkup;

  const actions = document.createElement('div');
  actions.classList.add(...actionsWrapperClasses);

  const categoriesOptions = eventData.ticketCategoryList.map(
    (tc) =>
      `<option value=${tc.ticketCategoryID}>${tc.description}  $${tc.price}</option>`
  );

  const ticketTypeMarkup = `
    <p>Tipul biletului:</p>
    <select id="ticketType" name="ticketType" class="select ${eventData.eventName}-ticket-type border">
      ${categoriesOptions.join('\n')}
    </select>
  `;

  actions.innerHTML = ticketTypeMarkup;

  const quantity = document.createElement('div');
  quantity.classList.add(...quantityClasses);

  const input = document.createElement('input');
  input.classList.add(...inputClasses);

  input.type = 'number';
  input.min = '0';
  input.value = '0';

  input.addEventListener('blur', () => {
    if (!input.value) {
      input.value = 0;
    }
  });

  input.addEventListener('input', () => {
    const currentQuantity = parseInt(input.value);
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  quantity.appendChild(input);

  const quantityActions = document.createElement('div');
  quantityActions.classList.add(...quantityActionsClasses);

  const increase = document.createElement('button');
  increase.classList.add(...increaseBtnClasses);
  increase.innerText = '+';
  increase.addEventListener('click', () => {
    input.value = parseInt(input.value) + 1;
    const currentQuantity = parseInt(input.value);
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  const decrease = document.createElement('button');
  decrease.classList.add(...decreaseBtnClasses);
  decrease.innerText = '-';
  decrease.addEventListener('click', () => {
    const currentValue = parseInt(input.value);
    if (currentValue > 0) {
      input.value = currentValue - 1;
    }
    const currentQuantity = parseInt(input.value);
    if (currentQuantity > 0) {
      addToCart.disabled = false;
    } else {
      addToCart.disabled = true;
    }
  });

  quantityActions.appendChild(increase);
  quantityActions.appendChild(decrease);

  quantity.appendChild(quantityActions);
  actions.appendChild(quantity);
  eventDiv.appendChild(actions);

  const eventFooter = document.createElement('footer');
  const addToCart = document.createElement('button');
  addToCart.classList.add(...addToCartBtnClasses);
  addToCart.innerText = 'Cumpara';
  addToCart.disabled = true;

  addToCart.addEventListener('click', () => {
    handleAddToCart(eventData.eventName, eventData.eventID, input, addToCart);
  });
  eventFooter.appendChild(addToCart);
  eventDiv.appendChild(eventFooter);

  return eventDiv;
};

const handleAddToCart = (name, id, input, addToCart) => {
  const ticketType = document.querySelector(`.${name}-ticket-type`).value;
  const quantity = input.value;

  console.log("ok", ticketType);

  if (parseInt(quantity)) {
    fetch('http://localhost:8080/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ticketCategoryID: +ticketType,
        eventID: +id,
        numberOfTickets: +quantity,
      }),
    })
      .then((response) => {
        return response.json().then((data) => {
          console.log("ok", data);
          return data;
        });
      })
      .then((data) => {
        //addPurchase(data);
        input.value = 0;
        addToCart.disabled = true;
      })
      .catch((error) => {
        console.error('Error saving purchased event:', error);
      })
      .finally(() => {
      });
  }
};

// Main function to create the event element
export const createEvent = (eventData) => {
  const eventElement = createEventElement(eventData);
  return eventElement;
};