import React from 'react';
import './Spinner.scss';

const Spinner = () => (
  <div className="Spinner">
    <ul className="books_list">
      <li className="book_item first" />
      <li className="book_item second" />
      <li className="book_item third" />
      <li className="book_item fourth" />
      <li className="book_item fifth" />
      <li className="book_item sixth" />
    </ul>
    <div className="shelf" />
  </div>
);

export default Spinner;
