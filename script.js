// Get references to the form elements
const eventInput = document.getElementById("event-text");
const addEventButton = document.getElementById("add-event");
const calendarDiv = document.getElementById("calendar");

// Create a simple calendar for the current month
function createCalendar() {
    const daysInMonth = 30; // Simplified, you can add logic for different months
    for (let day = 1; day <= daysInMonth; day++) {
        let dayDiv = document.createElement("div");
        dayDiv.className = "day";
        dayDiv.id = `day-${day}`;
        dayDiv.innerHTML = `<strong>${day}</strong><br><div id="events-${day}"></div>`;
        calendarDiv.appendChild(dayDiv);
    }
}

// Add an event to the calendar
function addEvent() {
    const eventText = eventInput.value;
    if (eventText === "") return alert("Please enter an event.");
    
    const day = prompt("Enter day number (1-30):");
    const eventsDiv = document.getElementById(`events-${day}`);
    if (eventsDiv) {
        const newEvent = document.createElement("div");
        newEvent.innerText = eventText;
        eventsDiv.appendChild(newEvent);

        // Store event in localStorage
        saveEvent(day, eventText);
    } else {
        alert("Invalid day number!");
    }
    
    eventInput.value = ""; // Clear input after adding event
}

// Save event in localStorage
function saveEvent(day, eventText) {
    let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    if (!events[day]) events[day] = [];
    events[day].push(eventText);
    localStorage.setItem("calendarEvents", JSON.stringify(events));
}

// Load events from localStorage
function loadEvents() {
    let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};
    Object.keys(events).forEach(day => {
        const eventsDiv = document.getElementById(`events-${day}`);
        events[day].forEach(event => {
            const newEvent = document.createElement("div");
            newEvent.innerText = event;
            eventsDiv.appendChild(newEvent);
        });
    });
}

// Initialize the calendar and load stored events
createCalendar();
loadEvents();

// Add event listener to button
addEventButton.addEventListener("click", addEvent);
