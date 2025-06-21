document.addEventListener("DOMContentLoaded", function() {
    // Get references to DOM elements
    const form = document.getElementById("guest-form");
    const guestList = document.getElementById("guest-list");
    const nameInput = document.getElementById("guest-name");
    const categoryInput = document.getElementById("guest-category");

    // Array to store guest objects
    let guests = [];

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const category = categoryInput.value;
        const timestamp = new Date().toLocaleDateString();

        // Prevent adding empty names
        if (!name) return;
        // Limit guest list to 10 people
        if (guests.length >= 10) {
            alert("Guest is limited to 10 people.");
            return;
        }

        // Create new guest object
        const guest = {
            id: Date.now(),
            name,
            category,
            timestamp,
            attending: false 
        };
        guests.push(guest);
        renderList();
        form.reset(); // Clear form inputs
    });

    // Function to render the guest list
    function renderList() {
        guestList.innerHTML = ""; // Clear current list

        guests.forEach((guest) => {
            const li = document.createElement("li");
            li.className = `category-${guest.category}`;

            // Display guest name, category, and timestamp
            const nameSpan = document.createElement("span");
            nameSpan.textContent = `${guest.name} (${guest.category}) - Added on: ${guest.timestamp}`;

            // Display RSVP status
            const statusSpan = document.createElement("span");
            statusSpan.textContent = `RSVP: ${guest.attending ? "Attending" : "Not Attending"}`;

            // Container for action buttons
            const btnContainer = document.createElement("div");
            btnContainer.className = "buttons";

            // Button to toggle RSVP status
            const toggleBtn = document.createElement("button");
            toggleBtn.textContent = "Toggle RSVP";
            toggleBtn.onclick = () => {
                guest.attending = !guest.attending;
                renderList();
            };

            // Button to remove guest from the list
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Remove";
            deleteBtn.onclick = () => {
                guests = guests.filter(g => g.id !== guest.id);
                renderList();
            };

            // Button to edit guest name
            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.onclick = () => {
                const newName = prompt("Enter new name", guest.name);
                if (newName) {
                    guest.name = newName;
                    renderList();
                }
            };

            // Add buttons to container and list item
            btnContainer.append(toggleBtn, deleteBtn, editBtn);
            li.append(nameSpan, statusSpan, btnContainer);
            guestList.appendChild(li);
        });
    }
});