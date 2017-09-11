//@ts-check
(function() {
  const amazonSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="amazon-logo" width="24" height="24" viewBox="0 0 24 24"><path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66.704-3.716 4.06-4.838 7.066-4.838 1.537 0 3.547.41 4.758 1.574 1.538 1.436 1.392 3.352 1.392 5.438v4.923c0 1.481.616 2.13 1.192 2.929.204.287.247.63-.01.839-.647.541-1.794 1.537-2.423 2.099l-.008-.007zm3.559 1.988c-2.748 1.472-5.735 2.181-8.453 2.181-4.027 0-7.927-1.393-11.081-3.706-.277-.202-.481.154-.251.416 2.925 3.326 6.786 5.326 11.076 5.326 3.061 0 6.614-1.214 9.066-3.494.406-.377.058-.945-.357-.723zm.67 2.216c-.091.227.104.32.31.147 1.339-1.12 1.685-3.466 1.411-3.804-.272-.336-2.612-.626-4.04.377-.22.154-.182.367.062.337.805-.096 2.595-.312 2.913.098.319.41-.355 2.094-.656 2.845z" fill-rule="evenodd" clip-rule="evenodd"/></svg>`;
  const currentUser = WeDeploy.auth('https://auth-gsbc.wedeploy.io').currentUser;
  const data = WeDeploy.data('https://data-gsbc.wedeploy.io');
  const regexMonth = /\w{3}/;

  const getDB = function(db, cb) {
    data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef')
      .get(db)
      .then(res => {cb(res)})
      .catch(e => {console.error(e)})
    ;
  };

  const getItemById = function(db, id, cb) {
    data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef')
      .get(`$db/$id`)
      .then(item => {cb(item)})
      .catch(e => {console.error(e)})
    ;
  }

  const updateItem = function(db, item, config, cb) {
    data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef')
      .update(
        `${db}/${item}`,
        config
      )
      .then(r => {cb(r)})
      .catch(e => {console.error(e)})
    ;
  };

  const bookshelf = {
    init: function() {
      this.container = document.querySelector('#bookshelf');

      data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef')
        .get('members')
        .then(members => {
          this.membersList = members;

          this.renderBookshelf();
          this.bindUI();
        })
        .catch(error => console.error(error))
    },

    bindUI: function() {
      document.querySelector('#addBook').addEventListener('click', event => {
          event.preventDefault();

          this.addBook(document.forms[2]);
      });
    },

    addBook: function(formData) {
      const book = this.simplifyFormData(formData);
      const dateCreated = Date.now();

      data.create(
        'books',
        {
          'bookAmazonUrl': book.bookAmazonUrl,
          'bookAuthor': book.bookAuthor,
          'bookTitle': book.bookTitle,
          'dateCreated': dateCreated,
          'datePicked': book.datePicked,
          'userPicked': book.userPicked,
          'userSubmitted': currentUser.firstName,
        }
      )
      .then(
        newBook => {
          picklist.removePicker(newBook.userPicked);
          this.refreshBookshelf();
          book.reset();
          document.getElementById('addBookModalClose').click();
        }
      )
      .catch(
        error => {
          console.error(error);
        }
      );
    },

    createBookRow: function(book) {
      let noAvg = '';
      let noAvgClass = '';
      const div = document.createElement("div");
      const user = {};

      book = this.formatBookData(book);

      book.bookRatingAvg = 4.3;
      user.rating = 3.2;

      if (book.bookRatingAvg === 0) {
        noAvg = `No one has rated this book yet!<br /><a class="set-user-rating" href="javascript:;" id="setRating-${book.id}">Be the first!</a>`
        noAvgClass = 'hidden d-none'
      }

      let userRating = `<span class="no-rating">You have not rated this book yet - <a class="set-user-rating" href="javascript:;" id="setRating-${book.id}">rate this book</a></span>`;

      if (user.rating) {
        userRating = `Your rating: <span class="current-user-rating">${user.rating}</span> - <a class="set-user-rating" href="javascript:;" id="setRating-${book.id}">edit rating</a>`
      }

      div.className = 'book row';
      div.id = book.id;

      div.innerHTML = `<div class="book-amazon col-2">
          <a class="amazon-wrapper" href="${book.bookAmazonUrl}" rel="noopener">${amazonSVG}</a>
        </div>
        <div class="book-cover-wrapper col-2">
          <div class="book-cover">
            <img alt="${book.bookTitle} - ${book.bookAuthor}" class="img-fluid" src="${book.bookCoverUrl}" />
          </div>
        </div>
        <div class="book-data col-5 col-xl-4">
          <div class="book-rating-wrapper">
            <div class="book-rating ${noAvgClass}" id="rating-${book.id}"></div>
            <div class="book-rating-none">${noAvg}</div>
            <div class="book-rating-user ${noAvgClass}">
              ${userRating}
            </div>
          </div>
          <div class="book-info">
            <h1 class="book-title">${book.bookTitle}</h1>
            <h2 class="book-author">${book.bookAuthor}</h2>
            <p class="book-date-read">${book.datePicked}</p>
          </div>
        </div>
        <div class="book-member col-2 col-xl-3">
          <div class="book-member-profile">
            <img alt="${book.userPicked}" class="img-fluid" src="${book.userPhotoUrl}">
            <span class="book-member-name">${book.userPicked}</span>
          </div>
        </div>`

      this.container.appendChild(div);

      rateYoBook.init(book.id, book.bookRatingAvg);
    },

    formatBookData: function(book) {
      book.bookAmazonUrl = this.setAmazonUrl(book.bookAmazonUrl);

      book.bookRatingAvg = this.setAverageRating(book.bookRatings, book.id);

      book.userPicked = this.getNameById(book.userPicked);

      if (book.bookCoverUrl === undefined) {
        book.bookCoverUrl = 'https://res.cloudinary.com/gsbc/image/upload/v1502156126/defaultcover_wpztad.jpg'
      }

      return book;
    },

    getBooks: function(cb) {
      data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef')
        .get('books')
        .then(books => {
          cb(books);
        })
        .catch(error => {
          console.error(error);
        })
      ;
    },

    getNameById: function(id) {
      let name;

      this.membersList.forEach(member => {
        if (member.id === id) {
          name = member.nameFirst;
        }
      })

      return name;
    },

    refreshBookshelf: function() {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }

      this.renderBookshelf();
    },

    renderBookshelf: function() {
      this.getBooks(books => {
        books.forEach(book => {
          this.createBookRow(book);
        });
      });

      $('[data-toggle="tooltip"]').tooltip();
    },

    setAmazonUrl: function(url) {
      if (url === undefined || url === '') {
        url = 'javascript:;';
      }

      return url;
    },

    setAverageRating: function(ratingsArray, id) {
      let ratings = [];

      if (ratingsArray) {
        ratingsArray.forEach(rating => {
          ratings.push(rating.rating);
        });

        const sum = ratings.reduce(
          (a, b) => a + b
        );

        const avg = (Math.round((sum / ratings.length) * 10) / 10);

        updateItem('book', id, {bookRatingAvg: avg});

        return avg;
      }

      return 0;
    },

    simplifyFormData: function(data) {
      let el = data.elements;

      if (!el['bookAmazonUrl'].value) {
        el['bookAmazonUrl'].value = '';
      }

      let results = {
        'bookAmazonUrl': el['bookAmazonUrl'].value,
        'bookAuthor': el['bookAuthor'].value,
        'bookTitle': el['bookTitle'].value,
        'datePicked': el['datePickedMonth'].value + ' ' + el['datePickedYear'].value,
        'userPicked': el['userPicked'].value
      };

      return results;
    }
  };

  const picklist = {
    init: function() {
      this.container = document.querySelector('#picklist');
      this.renderPicklist();
    },

    getFirstNames: function(members) {
      const picklist = members.map(
        member => member.nameFirst
      );

      picklist.sort();

      return picklist;
    },

    getMemberId: function(name, cb) {
      this.getMembers(members => {
        members.forEach(member => {
          if (name === member.nameFirst) {
            cb(member.id);
          }
        });
      });
    },

    getMembers: function(cb) {
      data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef')
        .get('members')
        .then(members => {
          cb(members);
        })
        .catch(error => {
          console.error(error);
        })
      ;
    },

    renderPicklist: function() {
      this.getMembers(members => {
        let picklistArray = [];
        let picklist;

        members.forEach(member => {
          if (member.pickAvailable) {
            picklistArray.push(member.nameFirst);
          }
        });

        picklistArray.sort();

        if (picklistArray.length > 1) {
            picklist = picklistArray.join(', ');
          }
          else if (picklistArray.length < 1) {
            this.resetAvailablePicks();
          }
          else {
            picklist = picklistArray.join('');
          }

        this.container.innerText = picklist;

        this.renderUserPickedOptions(members);
      });
    },

    removePicker: function(id) {
      data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef')
        .update(
        'members/' + id,
        {
          'pickAvailable': false
        }
      )
      .then((member) => {
        this.renderPicklist();
      })
      .catch(error => console.error(error));
    },

    renderUserPickedOptions: function(members) {
      const frag = document.createDocumentFragment();
      const userPickedSelect = document.querySelector('#userPicked');

      members = this.sortUsers(members)

      members.forEach(member => {
        const option = document.createElement('option');

        option.innerHTML = member.nameFirst;
        option.value = member.id;

        frag.appendChild(option);
      });

      while (userPickedSelect.firstChild) {
        userPickedSelect.removeChild(userPickedSelect.firstChild);
      }

      userPickedSelect.appendChild(frag);
    },

    resetAvailablePicks: function() {
      this.getMembers(members => {
        members.forEach(member => {
          data.auth('682643b8-2be1-4fc8-8d04-a32ffeb3ecef').update(
            'members/' + member.id,
            {
              "pickAvailable": true
            }
          )
          .then(() => {})
          .catch(error => console.error(error));
        });
      });
    },

    sortUsers: function(array) {
      array.sort(function(a, b) {
        const nameA = a.nameFirst.toUpperCase();
        const nameB = b.nameFirst.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

      return array;
    }
  };

  const rateYoBook = {
    init: function(id, rating) {
      const container = $(`#rating-${id}`);
      const ratingLink = $(`#setRating-${id}`);
      const userRatingTpl = `Your rating: <span class="current-user-rating">${rating}</span> - <a class="set-user-rating" href="javascript:;" id="setRating-${id}">edit rating</a>`;

      this.userRatingContainer = container.siblings('.book-rating-user');

      container.rateYo({
        ratedFill: "#FFED85",
        rating: rating,
        readOnly: true,
        spacing: "16px"
      });

      container.find('.ratings-counter').text(rating);

      container.rateYo().on('rateyo.change', (e, data) => {
        const rating = data.rating;

        container.find('.ratings-counter').text(rating);
      });

      ratingLink.on('click', e => {
        container.removeClass('d-none hidden');

        this.userRatingContainer.removeClass('d-none hidden');

        if (ratingLink.hasClass('.book-rating-none')) {
          ratingLink.parent().addClass('d-none');
        }

        container.rateYo('option', 'ratedFill', '#D1B621');
        container.rateYo('option', 'readOnly', false);
      });
    }
  };

  bookshelf.init();
  picklist.init();
})();
