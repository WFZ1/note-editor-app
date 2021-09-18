import { FC, useState } from 'react';
import './App.scss';
import { NoteDetailSection } from './components/Note-detail-section/Note-detail-section';
import { NotesSection } from './components/Notes-section/Notes-section';
import INoteProps from './types/note-props.type';

export const App: FC = () => {
  const [notes, setNotes] = useState<INoteProps[]>([]);
  const [activeNote, setActiveNote] = useState<INoteProps | null>(null);

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

    if (updNotes.length) {
      const newActiveNote = updNotes[currentNoteIndex] ? updNotes[currentNoteIndex] : updNotes[currentNoteIndex - 1];
      setActiveNote(newActiveNote);
    } else {
      setActiveNote(null);
    }
  };

  return (
    <div className="App page__app">
      <div className="App__note-board">
        <NotesSection
          notes={ notes }
          onAddNote={ addNote }
          activeNote={ activeNote }
          onSetActiveNote={ (note) => setActiveNote(note) }
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
