import React from 'react'
import PropTypes from 'prop-types'
import SortOptionsList from './utilities/SortOptionsList'
import '../styles/Sorter.css'

const Sorter = ({ onSorterChange, value }) => {
  const optionsList = SortOptionsList.map(option => (
    <option key={`${option.type}-${option.dir}`} value={option.value}>{option.name}</option>
  ))
  return (
    <header className="Sorter">
      <form className="form-inline" id="bookshelf-sorter">
        <label className="mr-sm-2" htmlFor="sorter">Sort by: </label>
        <select
          className="custom-select form-control mb-2 mb-sm-0"
          id="sorter"
          name="sorter"
          onChange={onSorterChange}
          type="select"
          value={value}
        >
          {optionsList}
        </select>
      </form>
    </header>
  )
}

Sorter.propTypes = {
  onSorterChange: PropTypes.func,
  value: PropTypes.string,
}

export default Sorter
