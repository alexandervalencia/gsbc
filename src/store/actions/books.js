// import * as actionTypes from './actionTypes';
// import WeDeploy from 'wedeploy';
// import { sortingOptions } from 'utils';
// import { bookSorter, newBookConfig } from '../../utils/booksUtils';

// const data = WeDeploy.data(process.env.REACT_APP_DATABASE);

// export const addBook = values => dispatch => {
//   dispatch(addBookBegin());

//   let newBook = newBookConfig(values);

//   data
//     .create('books', newBook)
//     .then(book => {
//       dispatch(addBookSuccess());
//       dispatch(getBooks());
//     })
//     .catch(error => dispatch(addBookFailure(error)));
// };

// export const addBookBegin = () => ({
//   type: actionTypes.ADD_BOOK_BEGIN,
// });

// export const addBookFailure = error => ({
//   type: actionTypes.ADD_BOOK_FAILURE,
//   payload: error,
// });

// export const addBookSuccess = books => ({
//   type: actionTypes.ADD_BOOK_SUCCESS,
//   payload: books,
// });

// export const getBooksBegin = () => ({
//   type: actionTypes.GET_BOOKS_BEGIN,
// });

// export const getBooksSuccess = books => ({
//   type: actionTypes.GET_BOOKS_SUCCESS,
//   payload: books,
// });

// export const getBooksFailure = error => ({
//   type: actionTypes.GET_BOOKS_FAILURE,
//   payload: error,
// });

// export const getBooks = (sortValue = '3') => {
//   return dispatch => {
//     dispatch(getBooksBegin());

//     data
//       .get('books')
//       .then(books => {
//         const config = sortingOptions.find(opt => sortValue === opt.value);
//         const sortedBooks = bookSorter(books, config);

//         dispatch(getBooksSuccess(sortedBooks));
//       })
//       .catch(error => dispatch(getBooksFailure(error)));
//   };
// };

// export const sortBooks = (books, sortValue) => {
//   const config = sortingOptions.find(opt => sortValue === opt.value);
//   const sortedBooks = bookSorter(books, config);

//   return {
//     type: actionTypes.SORT_BOOKS,
//     payload: {
//       sortedBooks,
//       sortValue,
//     },
//   };
// };

// export const updateBookRating = (book, ratingValue) => dispatch => {
//   dispatch(updateBookRatingBegin());

//   data
//     .update(`books/${book.id}`, { ratingValue: ratingValue })
//     .then(() => {
//       const updatedBook = book;
//       updatedBook.ratingValue = ratingValue;

//       dispatch(updateBookRatingSuccess(updatedBook));
//     })
//     .catch(error => dispatch(updateBookRatingFailure(error)));
// };

// export const updateBookRatingBegin = () => ({
//   type: actionTypes.UPDATE_BOOK_RATING_BEGIN,
// });

// export const updateBookRatingFailure = error => ({
//   type: actionTypes.UPDATE_BOOK_RATING_FAILURE,
//   payload: error,
// });
// export const updateBookRatingSuccess = updatedBook => ({
//   type: actionTypes.UPDATE_BOOK_RATING_SUCCESS,
//   payload: updatedBook,
// });
