import { FC } from 'react';
import './Note-detail-section.scss';
import trashCan from '../../assets/icons/trash-can.svg';

export const NoteDetailSection: FC = () => {
  return (
    <div className="Note-detail-section">
      <button className="Note-detail-section__delete">
        <img src={ trashCan } alt="Trash can" />
      </button>

      <label className="Note-detail-section__box Note-detail-section__box_size_mid">
        <span className="Note-detail-section__title">Title</span>
        <input className="Note-detail-section__field" type="text" />
      </label>

      <label className="Note-detail-section__box">
        <span className="Note-detail-section__title">Description</span>
        <textarea className="Note-detail-section__field" rows={ 10 }>

        </textarea>
      </label>

      <button className="Note-detail-section__save">Save</button>
    </div>
  );
};
