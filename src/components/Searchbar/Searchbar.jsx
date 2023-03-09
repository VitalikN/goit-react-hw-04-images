import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  Input,
} from './Searchbar.styled';

export const Searchbar = ({ onSearch }) => {
  const [nameSearch, setNameSearch] = useState('');

  const handleSearch = evt => {
    setNameSearch(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (nameSearch.trim() === '') {
      toast.error('Here is your toast.');
      return;
    }
    onSearch(nameSearch);
    setNameSearch('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BiSearchAlt2 />
          <SearchFormButtonLabel />
        </SearchFormButton>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={nameSearch}
          onChange={handleSearch}
        />
      </SearchForm>
    </Header>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
