import React, { useContext } from 'react';

import { sortingOptions } from 'utils';
import './BookSorter.scss';

import { Input, Label } from 'components';

import { BooksContext } from '../../../providers/BooksProvider';

const BookSorter = () => {
  const { orderBy, setOrderBy } = useContext(BooksContext);

  const optionsList = sortingOptions.map(option => (
    <option key={`${option.type}-${option.direction}`} value={option.value}>
      {option.name}
    </option>
  ));

  const onSorterChange = value => {
    setOrderBy(value);
  };

  return (
    <header className="BookSorter">
      <form className="form-inline" id="bookshelf-sorter">
        <Label className="mr-sm-2" htmlFor="sorter">
          Sort by:&nbsp;
        </Label>

        <Input
          className="custom-select form-control"
          id="sorter"
          name="sorter"
          onChange={e => onSorterChange(e.target.value)}
          type="select"
          value={orderBy}
        >
          {optionsList}
        </Input>
      </form>
    </header>
  );
};

export default BookSorter;
