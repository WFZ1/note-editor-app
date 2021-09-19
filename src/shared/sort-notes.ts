import ISortNotesParams from '../types/sort-notes-params.type';

export const sortNotes = ({ notes, sort }: ISortNotesParams): void => {
  if (sort.direction === 'none') {
    notes.sort((a, b) => b.id - a.id);
  }
  else if (sort.type === 'title') {
    (sort.direction === 'asc') ?
      notes.sort((a, b) => b.title.localeCompare(a.title)) :
      notes.sort((a, b) => a.title.localeCompare(b.title));
  }
  else {
    (sort.direction === 'asc') ?
      notes.sort((a, b) => a.id - b.id) :
      notes.sort((a, b) => b.id - a.id);
  }
};
