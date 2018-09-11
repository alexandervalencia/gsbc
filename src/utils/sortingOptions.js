const sortingOptions = [
  {
    selected: '',
    dir: 'asc',
    name: 'Author: A-Z',
    type: 'author',
    value: '0',
  },
  {
    selected: '',
    dir: 'desc',
    name: 'Author: Z-A',
    type: 'author',
    value: '1',
  },
  {
    selected: '',
    dir: 'asc',
    name: 'Date Read: Oldest to Newest',
    type: 'datePicked',
    value: '2',
  },
  {
    selected: 'selected',
    dir: 'desc',
    name: 'Date Read: Newest to Oldest',
    type: 'datePicked',
    value: '3',
  },
  {
    selected: '',
    dir: 'asc',
    name: 'Picked By: A-Z',
    type: 'userPicked',
    value: '4',
  },
  {
    selected: '',
    dir: 'desc',
    name: 'Picked By: Z-A',
    type: 'userPicked',
    value: '5',
  },
  {
    selected: '',
    dir: 'asc',
    name: 'Rating: Low to High',
    type: 'rating',
    value: '6',
  },
  {
    selected: '',
    dir: 'desc',
    name: 'Rating: High to Low',
    type: 'rating',
    value: '7',
  },
  {
    selected: '',
    dir: 'asc',
    name: 'Title: A-Z',
    type: 'title',
    value: '8',
  },
  {
    selected: '',
    dir: 'desc',
    name: 'Title: Z-A',
    type: 'title',
    value: '9',
  },
];

export default sortingOptions;
