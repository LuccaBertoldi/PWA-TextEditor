const butInstall = document.getElementById('buttonInstall');

// Variable to hold the deferred prompt
let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the mini info bar from appearing on mobile
    event.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = event;
    // Show the install button
    butInstall.style.display = 'block';
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, log the outcome
        console.log(`User response to the install prompt: ${outcome}`);
        // Clear the deferredPrompt variable, it can only be used once
        deferredPrompt = null;
        // Hide the install button
        butInstall.style.display = 'none';
    }
});

// Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Log the event or provide feedback to the user
    console.log('PWA was installed.');
    // Optionally, you could provide a message to the user
    alert('Thank you for installing our app!');
});