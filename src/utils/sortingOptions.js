export const AUTHOR_ASCENDING = 'AUTHOR_ASCENDING';
export const AUTHOR_DESCENDING = 'AUTHOR_DESCENDING';
export const DATE_ASCENDING = 'DATE_ASCENDING';
export const DATE_DESCENDING = 'DATE_DESCENDING';
export const MEMBER_ASCENDING = 'MEMBER_ASCENDING';
export const MEMBER_DESCENDING = 'MEMBER_DESCENDING';
export const RATING_ASCENDING = 'RATING_ASCENDING';
export const RATING_DESCENDING = 'RATING_DESCENDING';
export const TITLE_ASCENDING = 'TITLE_ASCENDING';
export const TITLE_DESCENDING = 'TITLE_DESCENDING';

export const sortingOptions = [
  {
    selected: '',
    direction: 'asc',
    name: 'Author: A-Z',
    type: 'author',
    value: AUTHOR_ASCENDING,
  },
  {
    selected: '',
    direction: 'desc',
    name: 'Author: Z-A',
    type: 'author',
    value: AUTHOR_DESCENDING,
  },
  {
    selected: '',
    direction: 'asc',
    name: 'Date Read: Oldest to Newest',
    type: 'datePicked',
    value: DATE_ASCENDING,
  },
  {
    selected: 'selected',
    direction: 'desc',
    name: 'Date Read: Newest to Oldest',
    type: 'datePicked',
    value: DATE_DESCENDING,
  },
  {
    selected: '',
    direction: 'asc',
    name: 'Picked By: A-Z',
    type: 'userPicked',
    value: MEMBER_ASCENDING,
  },
  {
    selected: '',
    direction: 'desc',
    name: 'Picked By: Z-A',
    type: 'userPicked',
    value: MEMBER_DESCENDING,
  },
  {
    selected: '',
    direction: 'asc',
    name: 'Rating: Low to High',
    type: 'ratingValue',
    value: RATING_ASCENDING,
  },
  {
    selected: '',
    direction: 'desc',
    name: 'Rating: High to Low',
    type: 'ratingValue',
    value: RATING_DESCENDING,
  },
  {
    selected: '',
    direction: 'asc',
    name: 'Title: A-Z',
    type: 'title',
    value: TITLE_ASCENDING,
  },
  {
    selected: '',
    direction: 'desc',
    name: 'Title: Z-A',
    type: 'title',
    value: TITLE_DESCENDING,
  },
];

export default sortingOptions;
