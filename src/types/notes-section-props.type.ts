import INoteProps from "./note-props.type";

export default interface INotesSectionProps {
  notes: INoteProps[];
  onAddNote: (note: INoteProps) => void;
  activeNote: INoteProps | null;
  onSetActiveNote: (note: INoteProps) => void;
  search: string;
};
