import './Search-bar.scss';
import { FC, FormEvent, useState } from 'react';
import loupe from '../../assets/icons/loupe.svg';
import ISearchBarProps from '../../types/search-bar-props.type';

export const SearchBar: FC<ISearchBarProps> = (props: ISearchBarProps) => {
  const { classes, onSearch } = props;
  const [value, setValue] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <form className={ `Search-bar ${classes}` } onSubmit={ (e) => handleSubmit(e) }>
      <input
        className="Search-bar__field"
        type="search"
        value={ value }
        name="search"
        onChange={ (e) => setValue(e.target.value) }
        placeholder="Search by title"
      />
      <button className="Search-bar__btn">
        <img className="Search-bar__btn-image" src={ loupe } alt="Loupe" />
      </button>
    </form>
  );
};
