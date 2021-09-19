import { FC, useEffect, useState } from 'react';
import './App.scss';
import { NoteDetailSection } from './components/Note-detail-section/Note-detail-section';
import { NotesSection } from './components/Notes-section/Notes-section';
import { SearchBar } from './components/Search-bar/Search-bar';
import { SortBar } from './components/Sort-bar/Sort-bar';
import { getNotesFromStorage } from './shared/get-notes-from-storage';
import { sortNotes } from './shared/sort-notes';
import INoteProps from './types/note-props.type';
import ISortParams from './types/sort-params.type';

export const App: FC = () => {
  const storedData = getNotesFromStorage();
  const [notes, setNotes] = useState<INoteProps[]>(storedData.notes);
  const [activeNote, setActiveNote] = useState<INoteProps | null>(storedData.activeNote);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<ISortParams>({ type: 'none', direction: 'none' });

  useEffect(() => {
    const data = JSON.stringify(notes);
    localStorage.setItem('notes', data);
  }, [notes]);

  useEffect(() => {
    if (search.length) {
      setActiveNote(null);
    }
  }, [search]);

  useEffect(() => {
    const updNotes = [...notes];

    sortNotes({ notes: updNotes, sort })
    setNotes(updNotes);
  }, [sort]);

  const addNote = (note: INoteProps): void => {
    setNotes([note, ...notes]);
    setActiveNote(note);
  };

  const saveNote = (): void => {
    if (!activeNote) return;

    const updNotes = [...notes];
    const currentNoteIndex = notes.findIndex((note) => note.id === activeNote.id);
    updNotes[currentNoteIndex] = { ...activeNote };

    setNotes(updNotes);
  }

  const deleteNote = (): void => {
    if (!activeNote) return;

    const updNotes = [...notes];
    const currentNoteIndex = notes.findIndex((note) => note.id === activeNote.id);
    updNotes.splice(currentNoteIndex, 1);

    setNotes(updNotes);

    if (updNotes.length && !search) {
      const newActiveNote = updNotes[currentNoteIndex] ? updNotes[currentNoteIndex] : updNotes[currentNoteIndex - 1];
      setActiveNote(newActiveNote);
    } else {
      setActiveNote(null);
    }
  };

  return (
    <div className="App page__app">
      <header className="App__header">
        <SortBar
          classes="App__sort-bar"
          sort={ sort }
          onSort={ (props) => setSort(props) }
        />
        <SearchBar classes="App__search-bar" onSearch={ (title) => setSearch(title) } />
      </header>

      <div className="App__note-board">
        <NotesSection
          notes={ notes }
          onAddNote={ addNote }
          activeNote={ activeNote }
          onSetActiveNote={ (note) => setActiveNote(note) }
          search={ search }
        />
        <NoteDetailSection
          note={ activeNote }
          onChangeNote={ (note) => setActiveNote(note) }
          onSaveNote={ saveNote }
          onDeleteNote={ deleteNote }
        />
      </div>
    </div>
  );
};
