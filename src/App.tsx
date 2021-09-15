import { FC, useState } from 'react';
import './App.scss';
import { NotesSection } from './components/NotesSection/Notes-section';
import INoteProps from './types/note-props.type';

export const App: FC = () => {
  const [notes, setNotes] = useState<INoteProps[]>([]);

  const addNote = (note: INoteProps): void => setNotes([note, ...notes]);

  return (
    <div className="App">
      <NotesSection notes={ notes } onAddNote={ addNote }/>
    </div>
  );
};
