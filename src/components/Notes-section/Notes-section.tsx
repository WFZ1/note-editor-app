import { FC, useRef, useState } from 'react';
import INotesSectionProps from '../../types/notes-section-props.type';
import './Notes-section.scss';

export const NotesSection: FC<INotesSectionProps> = (props: INotesSectionProps) => {
  const { notes, onAddNote } = props;
  const [noteCounter, setNoteCounter] = useState<number>(0);

  const notesList = useRef<null | HTMLUListElement>(null);

  const createNote = (): void => {
    const title = 'New note' + (noteCounter ? noteCounter : '');
    setNoteCounter(noteCounter + 1);

    onAddNote({ title, description: '' });
  };

  const selectNote = (target: HTMLLIElement): void => {
    if (notesList.current) {
      const items = notesList.current.children;

      for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('Notes-section__note_active');
      }
    }

    target.classList.add('Notes-section__note_active');
  };

  return (
    <div className="Notes-section">
      <button className="Notes-section__create" onClick={ () => createNote() }>+ New</button>

      <ul className="Notes-section__list" ref={ notesList }>
        {
          notes.length ? (
            notes.map((note) => (
              <li
                className="Notes-section__note"
                key={ note.title }
                onClick={ (e) => selectNote(e.target as HTMLLIElement) }
              >{ note.title }</li>
            ))
          ) : <li className="Notes-section__empty">Notes list empty!</li>
        }
      </ul>
    </div>
  );
};
