import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdOutlineSearch } from 'react-icons/md';
import {
  Header,
  Input,
  Label,
  SearchButton,
  SearchForm,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const searchQuery = e.target.elements.searchQuery.value
      .toLowerCase()
      .trim();

    if (searchQuery === '') {
      return toast.error('Enter your query in search field');
    }

    onSubmit(searchQuery);
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <MdOutlineSearch size={22} />
          <Label>Search</Label>
        </SearchButton>

        <Input
          name="searchQuery"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
