import './Sort-bar.scss';
import { FC } from 'react';
import ISortBarProps from '../../types/sort-bar-props.type';
import ISortParams from '../../types/sort-params.type';

export const SortBar: FC<ISortBarProps> = (props: ISortBarProps) => {
  const { classes, sort, onSort } = props;

  const changeDirection = (direction: ISortParams['direction']) => {
    switch(direction) {
      case 'none':
        return 'asc';
      case 'asc':
        return 'desc';
      default: return 'none';
    };
  };

  const changeSorting = (target: HTMLButtonElement): void => {
    let { type, direction } = target.dataset;

    const updDirection = changeDirection(direction as ISortParams['direction']);

    onSort({ type, direction: updDirection } as ISortParams);
  };

  const setClass = (type: ISortParams['type']): string => {
    let btnClass = 'Sort-bar__btn';

    if (type === sort.type && sort.direction !== 'none') {
      btnClass += ` Sort-bar__btn_type_${ sort.direction }`;
    }

    return btnClass;
  };

  return (
    <div className={ `Sort-bar ${ classes }` }>
      <button
        className={ setClass('title') }
        data-type="title"
        data-direction={ sort.type === 'title' ? sort.direction : 'none' }
        onClick={ (e) => changeSorting(e.target as HTMLButtonElement) }
      >Title</button>
      <button
        className={ setClass('date') }
        data-type="date"
        data-direction={ sort.type === 'date' ? sort.direction : 'none' }
        onClick={ (e) => changeSorting(e.target as HTMLButtonElement) }
      >Date</button>
    </div>
  );
};
