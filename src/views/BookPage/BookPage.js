import React, { useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { BookCover, BookInfo, EditBookModal, Spinner } from 'components';
import { BooksContext } from '../../providers/BooksProvider';

import './BookPage.scss';

export const BookPage = ({ match }) => {
  const { books } = useContext(BooksContext);

  const book = books.find(book => book.id === match.params.id);

  let page = <Spinner />;

  if (book) {
    page = (
      <Container className="BookPage">
        <Row>
          <Col>
            <BookCover coverImg={book.coverImg} size="large" title={book.title} />
          </Col>
          <Col>
            <BookInfo author={book.author} title={book.title} subtitle={book.subtitle} datePicked={book.datePicked} />

            <EditBookModal book={book} />
          </Col>
        </Row>
      </Container>
    );
  }

  return page;
};

export default BookPage;
