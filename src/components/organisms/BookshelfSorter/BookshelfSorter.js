import React from 'react'
import PropTypes from 'prop-types'

import SortOptionsList from '../../../utils/SortOptionsList'
import './BookshelfSorter.css'

import { Input, Label } from 'components';

const BookshelfSorter = ({ onSorterChange, value }) => {
  const optionsList = SortOptionsList.map(option => (
    <option key={`${option.type}-${option.dir}`} value={option.value}>{option.name}</option>
  ))

  return (
    <header className="BookshelfSorter">
      <form className="form-inline" id="bookshelf-sorter">
        <Label className="mr-sm-2" htmlFor="sorter">Sort by: </Label>

        <Input
          className="custom-select form-control"
          id="sorter"
          name="sorter"
          onChange={onSorterChange}
          type="select"
          value={value}
        >
          {optionsList}
        </Input>
      </form>
    </header>
  )
}

BookshelfSorter.propTypes = {
  onSorterChange: PropTypes.func,
  value: PropTypes.string,
}

export default BookshelfSorter
