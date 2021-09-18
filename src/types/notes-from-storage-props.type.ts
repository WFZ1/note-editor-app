import INoteProps from "./note-props.type";

export default interface INotesFromStorageProps {
  notes: INoteProps[];
  activeNote: INoteProps | null;
};
