import INoteProps from '../types/note-props.type';

export const findMaxId = (notes: INoteProps[]): number => {
  const note = notes.reduce((maxVal, currentVal) => (maxVal.id > currentVal.id ? maxVal : currentVal));

  return note.id + 1;
};
