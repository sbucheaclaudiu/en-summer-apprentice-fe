export function getLocations(eventList){
    let locations = '';
    let locationsList = new Array();
  
    eventList.forEach(event =>{
      locationsList.push(event.venue.location);
    });
  
    const uniqueLocationsList = [... new Set(locationsList)]
    uniqueLocationsList.forEach(venueElem =>{
      locations = locations + ` <option>${venueElem}</option>` + '\n';
    });
  
    return locations;
  }

export function getEventTypes(eventList){
    let eventTypes = '';
    let eventTypeList = new Array();
  
    eventList.forEach(event =>{
      eventTypeList.push(event.eventTypeName);
    });
  
    const uniqueEventTypesList = [... new Set(eventTypeList)]
    uniqueEventTypesList.forEach(typeElem =>{
      eventTypes = eventTypes + ` <option>${typeElem}</option>` + '\n';
    });
  
    return eventTypes;
  }

export function loadImage(data) {
    data.forEach(event => {
      if(event.eventName == "Untold") event.photo = "src/assets/untold.jpg"
      else if(event.eventName == "Electric Castle") event.photo = "src/assets/electric.jpeg"
      else if(event.eventName == "Meci de fotbal") event.photo = "src/assets/game.jpg"
      else if(event.eventName == "Wine Festival") event.photo = "src/assets/wine.jpg"
    });
  
    return data;
  }