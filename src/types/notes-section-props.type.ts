import INoteProps from "./note-props.type";

export default interface INotesSectionProps {
  notes: INoteProps[];
  onAddNote: (note: INoteProps) => void;
  onSetActiveNote: (id: number) => void;
};
