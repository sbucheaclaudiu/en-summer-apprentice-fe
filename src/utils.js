import { createEvent } from './components/createEventCard.js';

export const addEvents = (events) => {
    const eventsDiv = document.querySelector('.events');
    eventsDiv.innerHTML = 'No events available';
  
    if(events.length) {
      eventsDiv.innerHTML = '';
      events.forEach((event) => {
        eventsDiv.appendChild(createEvent(event));
      });
    }
  };