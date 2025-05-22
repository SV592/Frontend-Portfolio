function toggleContent(buttonElement) { // Changed parameter name from 'event' to 'buttonElement'
    // Get the image element directly within the clicked button
    const imgElement = buttonElement.querySelector('img');

    // Extract the number from the button's ID (e.g., '1' from "button1")
    const buttonId = buttonElement.id; // Get the full ID string
    const buttonIndex = parseInt(buttonId[buttonId.length - 1]); // Get the last character and convert to number

    // Get the associated span element using its ID
    const contentElement = document.getElementById(`span${buttonIndex}`);

    // Check the current image source to determine state (more reliable than innerHTML)
    if (imgElement.src.includes("icon-plus.svg")) {
        // Change image to minus icon
        imgElement.src = "./assets/images/icon-minus.svg";
        // Add 'active' class to show content (CSS transition will handle reveal)
        contentElement.classList.add("active");
    } else {
        // Change image to plus icon
        imgElement.src = "./assets/images/icon-plus.svg";
        // Remove 'active' class to hide content (CSS transition will handle hide)
        contentElement.classList.remove("active");
    }
}
