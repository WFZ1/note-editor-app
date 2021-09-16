import INoteProps from './note-props.type';

export default interface INoteDetailSectionProps {
  note: INoteProps | null;
  onChangeNote: (note: INoteProps) => void;
  onSaveNote: () => void;
  onDeleteNote: () => void;
};
