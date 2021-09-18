import INotesFromStorageProps from '../types/notes-from-storage-props.type';

export const getNotesFromStorage = (): INotesFromStorageProps => {
  const notesFromStorage = localStorage.getItem('notes');
  const notes = notesFromStorage ? JSON.parse(notesFromStorage) : [];
  const activeNote = notes.length ? notes[0] : null;

  return { notes, activeNote };
};
