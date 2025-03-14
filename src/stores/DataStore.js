import { defineStore } from "pinia";

export const useDataStore = defineStore('data', {
  state: () => ({
    data: [],
    view: false,
    nameFol: '',
    file: null,
    error: {
      status: false,
      message: ''
    }
  }),
  getters: {
    getData: (state) => state.data,
    getView: (state) => state.view,
    getNameFol: (state) => state.nameFol,
    getFile: (state) => state.file,
    hasError: (state) => state.error.status,
    errorMessage: (state) => state.error.message
  },
  actions: {
    changeView() {
      this.view = !this.view;
    },
    addData(newItem) {
      try {
        if (!newItem || !Array.isArray(newItem)) {
          throw new Error('Invalid data format');
        }
        this.data = newItem;
        this.error.status = false;
        this.error.message = '';
      } catch (err) {
        this.error.status = true;
        this.error.message = err.message;
      }
    },
    changeNameFol(name) {
      if (!name.trim()) {
        this.error.status = true;
        this.error.message = 'Folder name cannot be empty';
        return;
      }
      this.nameFol = name.trim();
      this.error.status = false;
    },
    changeFile(file) {
      this.file = file;
    },
  }
});