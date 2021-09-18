import { ChangeEvent, FC, useEffect, useState } from 'react';
import './Note-detail-section.scss';
import trashCan from '../../assets/icons/trash-can.svg';
import INoteDetailSectionProps from '../../types/note-detail-section-props.type';
import INoteProps from '../../types/note-props.type';

export const NoteDetailSection: FC<INoteDetailSectionProps> = (props: INoteDetailSectionProps) => {
  const { note, onChangeNote, onSaveNote, onDeleteNote } = props;
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    ['title', 'description'].forEach((field) => {
      if (!note) return;

      const value = note[field as keyof INoteProps] as string;
      let regex = /^.{3,120}$/;

      if (field === 'description') {
        regex = /^[\s\S]{5,500}$/;
      }

      if (!regex.test(value)) {
        if (!errors.includes(field)) {
          setErrors([...errors, field]);
        }
      } else if (errors.includes(field)) {
        const newErrors = errors.filter((error) => error !== field);
        setErrors(newErrors);
      }
    });
  }, [note, errors]);

  const changeNote = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!note) return;

    const { value, name } = e.target;
    onChangeNote({ ...note, [name]: value });
  };

  return (
    note &&
    <div className="Note-detail-section">
      <button
        className="Note-detail-section__delete"
        onClick={ () => onDeleteNote() }
      >
        <img src={ trashCan } alt="Trash can" />
      </button>

      <label className={ `Note-detail-section__box Note-detail-section__box_size_mid ${ errors.includes('title') ? 'Note-detail-section__box_invalid' : '' }` }>
        <span className="Note-detail-section__title">Title</span>
        <input
          className="Note-detail-section__field"
          value={ note.title }
          onChange={ (e) => changeNote(e) }
          name="title"
          type="text"/>
      </label>

      <label className={ `Note-detail-section__box ${ errors.includes('description') ? 'Note-detail-section__box_invalid' : '' }` }>
        <span className="Note-detail-section__title">Description</span>
        <textarea
          className="Note-detail-section__field"
          value={ note.description }
          onChange={ (e) => changeNote(e) }
          name="description"
          rows={ 10 }/>
      </label>

      <button
        className="Note-detail-section__save"
        onClick={ () => onSaveNote() }
        disabled={ errors.length > 0 }
      >Save</button>
    </div>
  );
};
