import { FC, useState } from 'react';
import './App.scss';
import { NoteDetailSection } from './components/Note-detail-section/Note-detail-section';
import { NotesSection } from './components/Notes-section/Notes-section';
import INoteProps from './types/note-props.type';

export const App: FC = () => {
  const [notes, setNotes] = useState<INoteProps[]>([]);
  const [activeNote, setActiveNote] = useState<INoteProps | null>(null);

  const addNote = (note: INoteProps): void => setNotes([note, ...notes]);

  const activateNote = (id: number): void => {
    const currentNote = notes.find((note) => note.id === id);

    if (currentNote) setActiveNote(currentNote);
  }

  const changeActiveNote = (note: INoteProps): void => setActiveNote(note);

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
    setActiveNote(null);
  }

  return (
    <div className="App">
      <NotesSection
        notes={ notes }
        onAddNote={ addNote }
        onSetActiveNote={ activateNote }
      />
      <NoteDetailSection
        note={ activeNote }
        onChangeNote={ changeActiveNote }
        onSaveNote={ saveNote }
        onDeleteNote={ deleteNote }
      />
    </div>
  );
};
