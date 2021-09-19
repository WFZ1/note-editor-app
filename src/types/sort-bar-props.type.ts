import ISortParams from "./sort-params.type";

export default interface ISortBarProps {
  classes: string;
  sort: ISortParams;
  onSort: (props: ISortParams) => void;
};
