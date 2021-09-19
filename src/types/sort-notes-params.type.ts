import INoteProps from "./note-props.type";
import ISortParams from "./sort-params.type";

export default interface ISortNotesParams {
  notes: INoteProps[];
  sort: ISortParams;
};
