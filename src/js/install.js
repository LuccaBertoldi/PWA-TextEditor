const butInstall = document.getElementById('buttonInstall');

// Store the event for triggering the install prompt later
let deferredPrompt;

// Logic for installing the PWA
// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-info bar from appearing on mobile
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;

  // Update UI to notify the user they can install the PWA
  butInstall.style.display = 'block';
});

// Implement a click event handler on the butInstall element
butInstall.addEventListener('click', async () => {
  // Hide the install button
  butInstall.style.display = 'none';
  
  // Show the install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferredPrompt variable
    deferredPrompt = null;
  }
});

// Add a handler for the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('PWA was installed');
  // Optionally, you can give feedback to the user or update the UI
});
