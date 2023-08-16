import { loadImage } from "./utils";
import { addLoader, removeLoader } from "./loader";

export async function fetchEvents() {
    const response = await fetch('http://localhost:8080/api/eventsByName?eventName=', {mode:'cors'});
    const data = await response.json();
  
    return loadImage(data);
  }
  
export async function fetchEventsByName(eventNameValue) {
    const urlWithoutParam = 'http://localhost:8080/api/eventsByName?eventName=';
    const param = eventNameValue.toString();
    const url = urlWithoutParam.concat(param);
  
    const response = await fetch(url, {mode:'cors'});
  
    const data = await response.json();
  
    return loadImage(data);
  }
  
export async function fetchEventsByLocationAndEventType(location, eventType) {
    let url = 'http://localhost:8080/api/eventsByLocationAndEventType?location=';
    url = url.concat(location.value);
    url = url.concat("&eventType=");
    url = url.concat(eventType.value);
  
    const response = await fetch(url, {mode:'cors'});
  
    const data = await response.json();
  
    return loadImage(data);
  }
  
export async function fetchOrders() {
    const response = await fetch('http://localhost:8080/api/orders', {mode:'cors'});
    const data = await response.json();
  
    return data;
  }

  export async function deleteOrder(orderId) {
    addLoader();

    await fetch(`https://localhost:7014/api/Order/Delete?id=${orderId}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      "Accept": "application/json"
      },
    });
    
    removeLoader();

    const purchaseToBeRemoved = document.getElementById(`order-${orderId}`);

    purchaseToBeRemoved.remove();
    toastr.success("Order deleted!");
  }

  export async function patchOrder(orderId, description, numberOfTickets) {
    addLoader();

    return await fetch('https://localhost:7014/api/Order/Patch', 
      {
        mode:'cors',
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body:JSON.stringify({
          orderId: +orderId,
          description: description,
          numberOfTickets: +numberOfTickets
        }),
      }).then((res) => {
          if (res.status === 200) {
            toastr.success('Order modified!');
          } else {
            toastr.error('Error!');
          }
          removeLoader();
          return res.json();
      });
  }