// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Get all toggle switches for extension cards
    const toggleCheckboxes = document.querySelectorAll('.active-grid-elements .toggle-switch input[type="checkbox"]');

    // Add change event to each toggle switch
    toggleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const gridElement = checkbox.closest('.active-grid-elements');
            // Toggle inactive style on card
            gridElement.classList.toggle("inactive-grid-elements")
        });
    });

    // On load, mark any extensions with data-active="false" as inactive
    document.querySelectorAll('.active-grid-elements[data-active="false"]').forEach(element => {
        element.classList.add('inactive-grid-elements');
    });

});

// Show all extension cards
function showAll() {
    let elements = document.querySelectorAll(".active-grid-elements");
    elements.forEach(el => {
        el.classList.remove("hide-elements");
    })
}

// Show only active extension cards
function active() {
    let elements = document.querySelectorAll(".active-grid-elements");
    let inactiveElements = document.querySelectorAll(".inactive-grid-elements");

    // If all are inactive, alert user
    if (elements.length === inactiveElements.length) {
        return alert("There are no active extensions")
    }

    elements.forEach(el => {
        // Hide inactive, show active
        if (el.classList.contains("inactive-grid-elements")) {
            el.classList.add("hide-elements");
        } else {
            el.classList.remove("hide-elements");
        }
    })
}

// Show only inactive extension cards
function inactive() {
    let elements = document.querySelectorAll(".active-grid-elements");
    let inactiveElements = document.querySelectorAll(".inactive-grid-elements");

    // If none are inactive, alert user
    if (inactiveElements.length === 0) {
        return alert("There are no inactive extensions")
    }

    elements.forEach(el => {
        // Show inactive, hide active
        if (el.classList.contains("inactive-grid-elements")) {
            el.classList.remove("hide-elements");
        } else {
            el.classList.add("hide-elements");
        }
    })
}

// Store the removal action for modal confirmation
let currentRemovalAction = null;

// Open the modal and prepare removal action
function openModal(buttonElement) {
    // Show modal dialog
    document.querySelector(".container2").style.display = "flex"

    // Store removal function with closure over buttonElement
    currentRemovalAction = function removeExt() {
        const elementToRemove = buttonElement.closest('.active-grid-elements');
        if (elementToRemove) {
            elementToRemove.remove(); // Remove the extension card
            console.log('Successfully removed:', elementToRemove);
            // Optionally re-apply filters here if needed
        } else {
            console.warn('Could not find the parent .active-grid-elements for removal.');
        }
    };

    console.log('Modal opened, removal action prepared.');
}

// Set up modal "Yes" button after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const modalYesBtn = document.getElementById('modalYesBtn');
    if (modalYesBtn) {
        modalYesBtn.addEventListener('click', () => {
            // If a removal action is stored, execute it
            if (currentRemovalAction) {
                currentRemovalAction();
                console.log('Removal confirmed and executed.');
            }
            closeModal(); // Always close modal after action
        });
    }
});

// Close the modal and clear removal action
function closeModal() {
    document.querySelector(".container2").style.display = "none"
    currentRemovalAction = null;
}

// Toggle dark/light theme for the UI
function themeToggle() {
    // Toggle body dark mode
    document.querySelector("body").classList.toggle("dark-body");

    // Toggle header dark mode
    document.querySelector(".header").classList.toggle("dark-header")

    // Toggle theme button dark mode
    document.querySelector(".theme-toggle").classList.toggle("dark-theme-toggle")

    // Switch theme icon (moon/sun)
    const imgElement = document.querySelector(".theme-toggle img");
    if (imgElement.src.includes("icon-sun.svg")) {
        imgElement.src = "./assets/images/icon-moon.svg";
        imgElement.alt = "Moon icon";
    } else {
        imgElement.src = "./assets/images/icon-sun.svg";
        imgElement.alt = "Sun icon";
    }

    // Toggle dark mode for filter buttons
    document.querySelector(".list-items").classList.toggle("dark-list-items")

    // Toggle dark mode for all extension cards
    document.querySelectorAll(".active-grid-elements").forEach(element => {
        element.classList.toggle("dark-grid-elements");
    });

    // Toggle dark mode for all buttons
    document.querySelectorAll("button").forEach(element => {
        element.classList.toggle("dark-button");
    });

    // Toggle dark mode for all sliders
    document.querySelectorAll(".slider").forEach(element => {
        element.classList.toggle("dark-slider");
    });

    // Toggle dark mode for modal
    document.querySelector(".modal").classList.toggle("dark-modal");
}