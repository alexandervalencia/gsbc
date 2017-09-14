import React from 'react';
import options from './utilities/options_util';
import '../styles/sorter.css'

const Sorter = ({ handleChange, value }) => {
  return (
    <header className="sorter-header">
      <div className="row">
        <div className="col">
          <form className="form-inline sorter" id="bookshelf-sorter">
            <label className="mr-sm-2" htmlFor="sorter">Sort by: </label>
            <select className="custom-select form-control mb-2 mb-sm-0" id="sorter" name="sorter" onChange={handleChange} type="select" value={value}>
              {options.map((option, index) => (
                <option key={index} value={JSON.stringify({dir: option.dir, type: option.type})}>{option.value}</option>
              ))}
            </select>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Sorter;
