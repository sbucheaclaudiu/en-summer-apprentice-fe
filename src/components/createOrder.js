import { useStyle } from './styles';
import { deleteOrder, patchOrder } from './fetchs';
import { addLoader, removeLoader } from './loader';

export const createOrder = (order) => {

  //div
  const orderDiv = document.createElement('div');
  orderDiv.id = `order-${order.orderID}`;
  orderDiv.classList.add(...useStyle('purchase'));

  //eventName
  const orderEventName = document.createElement('p');
  orderEventName.classList.add(...useStyle('ticket'));
  orderEventName.classList.add('font-bold');

  orderEventName.innerText = order.event.eventName;
  orderDiv.appendChild(orderEventName);

  //Quantity
  const orderQuantityDiv = document.createElement('div');
  orderQuantityDiv.classList.add(...useStyle('ticket'));

  const orderQuantity = document.createElement('input');
  orderQuantity.classList.add(...useStyle('ticket'));
  orderQuantity.type = 'number';
  orderQuantity.min = '1';
  orderQuantity.value = order.numberOfTickets;
  orderQuantity.disabled = true;

  orderQuantityDiv.append(orderQuantity);
  orderDiv.appendChild(orderQuantityDiv);

  //ticketCategory
  const orderTicketCategory = document.createElement('select');
  orderTicketCategory.classList.add(...useStyle('ticket'));
  orderTicketCategory.setAttribute('disabled', 'true');

  let ticketCategoryOptions = new Array();

  const buyedOptionString = `<option value=${order.ticketCategory.ticketCategoryID}>${order.ticketCategory.description} &nbsp $${order.ticketCategory.price}</option>`;
  ticketCategoryOptions.push(buyedOptionString);

  order.event.ticketCategoryList.map(
    (tc) =>{
      if(tc.ticketCategoryID != order.ticketCategory.ticketCategoryID){
        const str = `<option value=${tc.ticketCategoryID}>${tc.description} &nbsp $${tc.price}</option>`;
        ticketCategoryOptions.push(str);
      }
    }
  );

  const orderId = order.orderID.toString();
  const eventNameWithoutSpaces = order.event.eventName.replace(/\s/g, '');

  const ticketTypeMarkup = `
    <select id="ticketType" name="ticketType" class="select ${orderId}-ticket-type border">
      ${ticketCategoryOptions}
    </select>
  `;

  orderTicketCategory.innerHTML = ticketTypeMarkup;

  const purchaseTypeDiv = document.createElement('div');
  purchaseTypeDiv.classList.add(...useStyle('ticket'));

  purchaseTypeDiv.append(orderTicketCategory);
  orderDiv.appendChild(purchaseTypeDiv);

  //date
  const orderDateDiv = document.createElement('div');
  orderDateDiv.classList.add(...useStyle('ticket'));

  orderDateDiv.innerText = new Date(order.orderedAt).toLocaleDateString();
  orderDiv.appendChild(orderDateDiv);

  //price
  const orderPriceDiv = document.createElement('div');
  orderPriceDiv.classList.add(...useStyle('ticket'));

  orderPriceDiv.innerText = order.totalPrice;
  orderDiv.appendChild(orderPriceDiv);

  //Buttons
  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add(...useStyle('ticket'));

  const editButton = createButton([...useStyle(['actionButton', 'editButton'])], '<i class="fa-solid fa-pencil"></i>', editHandler);
  actionsDiv.appendChild(editButton);

  const saveButton = createButton([...useStyle(['actionButton', 'saveButton'])], '<i class="fa-solid fa-floppy-disk"></i>', saveHandler);
  actionsDiv.appendChild(saveButton);

  const cancelButton = createButton([...useStyle(['actionButton', 'cancelButton'])], '<i class="fa-solid fa-xmark"></i>', cancelHandler);
  actionsDiv.appendChild(cancelButton);

  const deleteButton = createButton([...useStyle(['actionButton', 'deleteButton'])], '<i class="fa-solid fa-trash-can"></i>', deleteHandler);
  actionsDiv.appendChild(deleteButton);

  orderDiv.appendChild(actionsDiv);

  function createButton(classes, innerHTML, handler) {
    const button = document.createElement('button');
    button.classList.add(...classes);
    button.innerHTML = innerHTML;
    button.addEventListener('click', handler);
    return button;
  }

  function editHandler() {
    if (saveButton.classList.contains('hidden') && cancelButton.classList.contains('hidden')) {
      editButton.classList.add('hidden');
      saveButton.classList.remove('hidden');
      cancelButton.classList.remove('hidden');
      orderTicketCategory.removeAttribute('disabled');
      orderQuantity.removeAttribute('disabled');
    }
  }

  function saveHandler() {
    const newQuantity = parseInt(orderQuantity.value);
    const orderId = order.orderID;

    var description = orderTicketCategory.options[orderTicketCategory.selectedIndex].text.replace(/[^a-zA-Z]/g, '');

    if (description != order.ticketCategory.description || newQuantity != order.numberOfTickets) {
      addLoader();
      
      patchOrder(orderId, description, newQuantity).then((data) => {
        order = data;
        orderPriceDiv.innerText = order.totalPrice;
        orderDateDiv.innerText = new Date(order.orderedAt).toLocaleDateString();
      });
    
    }

    saveButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
    editButton.classList.remove('hidden');
    orderTicketCategory.setAttribute('disabled', 'true');
    orderQuantity.setAttribute('disabled', 'true');
  }

  function cancelHandler() {
    saveButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
    editButton.classList.remove('hidden');

    Array.from(orderTicketCategory.options).forEach(function (element, index) {
      if (element.value == order.ticketCategory.ticketCategoryID) {
        orderTicketCategory.options.selectedIndex = index;
        return;
      }
    });

    orderQuantity.value = order.numberOfTickets;
    orderTicketCategory.setAttribute('disabled', 'true');
    orderQuantity.setAttribute('disabled', 'true');
  }

  function deleteHandler() {
    deleteOrder(order.orderID);
  }

  return orderDiv;
};