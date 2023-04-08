import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    // active: {
    //   id: '',
    //   title: '',
    //   body: '',
    //   date: 123345,
    //   imageUrls: ['']

    // }
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload), (state.isSaving = false);
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        return note.id === action.payload.id ? action.payload : note;
      });
      state.messageSaved = `${action.payload.title}, was succesfully updated`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.active.imgUrls = [...state.active.imgUrls, ...action.payload]
      state.isSaving = false
    },
    clearNotesOnLogout: (state) => {
      state.isSaving = false,
      state.messageSaved = '',
      state.notes = [],
      state.active = null
    },
    deleteNoteById: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
  },
});
export const {
  addNewEmptyNote,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
  deleteNoteById,
  setPhotosToActiveNote,
  clearNotesOnLogout
} = journalSlice.actions;
