import { getDb, putDb } from './database';
import { header } from './header';

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

    this.initializeEditor(localData);
    
    // Save the content of the editor on change
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor when it loses focus
    this.editor.on('blur', async () => {
      console.log('The editor has lost focus');
      try {
        await putDb(this.editor.getValue());
        console.log('Content saved to IndexedDB');
        localStorage.removeItem('content'); // Clear local storage after saving
      } catch (error) {
        console.error('Failed to save content to IndexedDB:', error);
      }
    });
  }

  async initializeEditor(localData) {
    try {
      const data = await getDb();
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    } catch (error) {
      console.error('Failed to load data from IndexedDB:', error);
      this.editor.setValue(localData || header); // Fallback to localStorage or header
    }
  }
}
