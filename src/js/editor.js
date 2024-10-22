import { putDb, getDb } from './database.js'; // Add .js extension
import { header } from './header.js'; 

export default class Editor {
  constructor() {
    const localData = localStorage.getItem('content');

    // Check if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    // Load content into the editor
    this.loadEditorContent(localData);

    // Save to localStorage on change
    this.editor.on('change', this.saveToLocalStorage.bind(this));

    // Save content to IndexedDB when the editor loses focus
    this.editor.on('blur', this.saveToIndexedDB.bind(this));
  }

  async loadEditorContent(localData) {
    try {
      const data = await getDb();
      console.info('Loaded data from IndexedDB, injecting into editor');
      // If IndexedDB has content, set it; otherwise, fall back to localStorage
      const content = data.length > 0 ? data[0].content : localData || header;
      this.editor.setValue(content);
    } catch (error) {
      console.error('Failed to load data from IndexedDB:', error);
      this.editor.setValue(localData || header);
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('content', this.editor.getValue());
    console.info('Content saved to localStorage');
  }

  saveToIndexedDB() {
    console.log('The editor has lost focus');
    putDb(this.editor.getValue())
      .then(() => console.info('Content saved to IndexedDB'))
      .catch((error) => {
        console.error('Failed to save data to IndexedDB:', error);
      });
  }
}
