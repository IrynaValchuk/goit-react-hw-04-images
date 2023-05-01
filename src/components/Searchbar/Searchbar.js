import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from 'components/Searchbar/Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [queryValue, setQueryValue] = useState('');

  const handleChangeInput = evt => {
    setQueryValue(evt.target.value.toLowerCase());
  };

  const handleSubmitForm = evt => {
    evt.preventDefault();

    if (queryValue.trim() === '') {
      toast.error('Please, repeat the search');
      return;
    }

    onSubmit(queryValue.trim());
    setQueryValue('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmitForm}>
        <input
          className={css.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={queryValue}
          onChange={handleChangeInput}
        />
        <button type="submit" className={css.searchFormButton}>
          Search
        </button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
