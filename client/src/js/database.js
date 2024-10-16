import { openDB } from 'idb';

// Initialize the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Method to add content to the database
export const putDb = async (content) => {
  console.log('Adding content to the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  
  const result = await store.add({ content });
  await tx.done;
  console.log('Content added to the database with ID:', result);
};

// Method to get the most recent content from the database
export const getDb = async () => {
  console.log('Fetching content from the database');
  const db = await openDB('jate', 1);
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  
  const allContent = await store.getAll();
  await tx.done;

  // Return the content if found; otherwise, return null or an empty string
  return allContent.length > 0 ? allContent[allContent.length - 1].content : null;
};

// Initialize the database
initdb();