import { Workbox } from 'workbox-window';
import Editor from './editor.js';
import { putDb, getDb } from './database.js';
import { header } from './header.js';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
  return spinner; // Return the spinner element for later removal
};

const initializeEditor = async () => {
  loadSpinner();
  
  const editor = new Editor();
  
  // If the editor has a method to check readiness
  await editor.initialize(); // Hypothetical async initialization method

  // Optionally remove the spinner after the editor is ready
  main.innerHTML = ''; // Clear spinner
  main.appendChild(editor.element); // Add editor element (ensure you have a way to access it)
};

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  const workboxSW = new Workbox('/src-sw.js');
  
  workboxSW.register().catch(error => {
    console.error('Service worker registration failed:', error);
  });
} else {
  console.error('Service workers are not supported in this browser.');
}

// Start editor initialization
initializeEditor();
