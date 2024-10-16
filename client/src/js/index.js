import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  `;
  main.appendChild(spinner);
};

// Initialize the editor and handle loading state
const initializeEditor = () => {
  const editor = new Editor();

  // Check if editor is successfully created
  if (typeof editor === 'undefined') {
    loadSpinner();
  }
};

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  const workboxSW = new Workbox('/src-sw.js');

  // Register the service worker and handle success or failure
  workboxSW.register().then(() => {
    console.log('Service worker registered successfully.');
    initializeEditor(); // Initialize the editor after service worker registration
  }).catch((error) => {
    console.error('Service worker registration failed:', error);
    loadSpinner(); // Show spinner if registration fails
  });
} else {
  console.error('Service workers are not supported in this browser.');
  loadSpinner(); // Show spinner if service workers are not supported
}
