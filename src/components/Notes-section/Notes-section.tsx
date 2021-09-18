import { FC, useEffect, useRef, useState } from 'react';
import { findMaxId } from '../../shared/find-max-id';
import INotesSectionProps from '../../types/notes-section-props.type';
import './Notes-section.scss';

export const NotesSection: FC<INotesSectionProps> = (props: INotesSectionProps) => {
  const { notes, onAddNote, activeNote, onSetActiveNote } = props;

  const noteInitialId = notes.length ? findMaxId(notes) : 1;
  const [noteCounter, setNoteCounter] = useState<number>(noteInitialId);

  const notesList = useRef<null | HTMLUListElement>(null);

  const createNote = (): void => {
    const title = 'New note' + (noteCounter ? noteCounter : '');
    onAddNote({ id: noteCounter, title, description: '' });
    setNoteCounter(noteCounter + 1);
  };

  useEffect(() => {
    if (notesList.current && activeNote) {
      const items = notesList.current.children;

      for (let i = 0; i < items.length; i++) {
        const item = items[i] as HTMLLIElement;
        const id = Number(item.dataset.id);

        if (id !== activeNote.id) {
          items[i].classList.remove('Notes-section__note_active');
        } else {
          items[i].classList.add('Notes-section__note_active');
        }
      }
    }
  }, [activeNote]);

  return (
    <div className="Notes-section">
      <button className="Notes-section__create" onClick={ () => createNote() }>+ New</button>

      <ul className="Notes-section__list" ref={ notesList }>
        {
          notes.length ? (
            notes.map((note) => (
              <li
                className="Notes-section__note"
                key={ note.id }
                onClick={ () => onSetActiveNote(note) }
                data-id={ note.id }
              >{ note.title }</li>
            ))
          ) : <li className="Notes-section__empty">Notes list empty!</li>
        }
      </ul>
    </div>
  );
};
