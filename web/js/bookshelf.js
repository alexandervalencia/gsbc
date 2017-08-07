//@ts-check
(function() {
  const amazonSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="amazon-logo" width="24" height="24" viewBox="0 0 24 24"><path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.189-.512.201-.745.074-1.052-.872-1.238-1.276-1.814-2.106-1.734 1.767-2.962 2.297-5.209 2.297-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.82-1.775-.82-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.549.582l-3.061-.333c-.259-.056-.548-.266-.472-.66.704-3.716 4.06-4.838 7.066-4.838 1.537 0 3.547.41 4.758 1.574 1.538 1.436 1.392 3.352 1.392 5.438v4.923c0 1.481.616 2.13 1.192 2.929.204.287.247.63-.01.839-.647.541-1.794 1.537-2.423 2.099l-.008-.007zm3.559 1.988c-2.748 1.472-5.735 2.181-8.453 2.181-4.027 0-7.927-1.393-11.081-3.706-.277-.202-.481.154-.251.416 2.925 3.326 6.786 5.326 11.076 5.326 3.061 0 6.614-1.214 9.066-3.494.406-.377.058-.945-.357-.723zm.67 2.216c-.091.227.104.32.31.147 1.339-1.12 1.685-3.466 1.411-3.804-.272-.336-2.612-.626-4.04.377-.22.154-.182.367.062.337.805-.096 2.595-.312 2.913.098.319.41-.355 2.094-.656 2.845z" fill-rule="evenodd" clip-rule="evenodd"/></svg>`;
  const currentUser = WeDeploy.auth('https://auth-gsbc.wedeploy.io').currentUser;
  const data = WeDeploy.data('https://data-gsbc.wedeploy.io');
  const regexMonth = /\w{3}/;

  const bookshelf = {
    init: function() {
      this.container = document.querySelector('#bookshelf');

      data.get('members')
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

          this.addBook(document.forms.book);
      });
    },

    addBook: function(book) {
      const b = this.simplifyFormData(book);
      const dateCreated = Date.now();

      data.create(
        'books',
        {
          'bookAmazonUrl': b.bookAmazonUrl,
          'bookAuthor': b.bookAuthor,
          'bookTitle': b.bookTitle,
          'dateCreated': dateCreated,
          'datePicked': b.datePicked,
          'userPicked': b.userPicked,
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

    createBookRow: function(book, user) {
      const div = document.createElement("div");
      let userRating = `<span class="no-rating">You have not rated this book yet - <a class="set-user-rating" href="javascript:;">rate this book</a></span>`;

      book = this.formatBookData(book);

      if (user) {
        userRating = `Your rating: <span class="current-user-rating">${user.rating}</span> - <a class="set-user-rating" href="javascript:;">edit rating</a>`
      }

      div.className = 'book row';
      div.id = book.id;

      div.innerHTML = `<div class="book-amazon col-2">
          <a class="amazon-wrapper" href="${book.bookAmazonUrl}">${amazonSVG}</a>
        </div>
        <div class="book-cover-wrapper col-2">
          <div class="book-cover">
            <img alt="${book.bookTitle} - ${book.author}" class="img-fluid" src="${book.bookCoverUrl}" />
          </div>
        </div>
        <div class="book-data col-5 col-xl-4">
          <div class="book-rating-wrapper">
            <div class="book-rating" data-placement="right" data-toggle="tooltip" title="${book.bookRating}" id="${book.id}-rating"></div>
            <div class="book-rating-user">
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
            <spam class="book-member-name">${book.userPicked}</span>
          </div>
        </div>`

      return div
    },

    formatBookData: function(book) {
      book.bookAmazonUrl = this.setAmazonUrl(book.bookAmazonUrl);

      if (book.bookRatings) {
        book.bookRating = this.setAverageRating(book.bookRatings);
      }
      else {
        book.bookRating = '';
      }

      book.userPicked = this.getNameById(book.userPicked);

      return book;
    },

    getBooks: function(cb) {
      data.get('books')
        .then(
          books => {
            cb(books);
          }
        )
        .catch(
          error => {
            console.error(error);
          }
        )
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
      const frag = document.createDocumentFragment();

      this.getBooks(books => {
        books.forEach(book => {
          let row = this.createBookRow(book);

          frag.appendChild(row);
        });

        this.container.append(frag);
      });
    },

    setAmazonUrl: function(url) {
      if (url === undefined || url === '') {
        url = 'javascript:;';
      }

      return url;
    },

    setAverageRating: function(ratingsArray) {
      let ratings = [];

      ratingsArray.forEach(rating => {
        ratings.push(rating.rating);
      });

      const sum = ratings.reduce(
        (a, b) => a + b
      );

      const avg = (sum / ratings.length);

      return (Math.round(avg * 2) / 2).toFixed(1);
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
      data.get('members')
        .then(
          members => {
            cb(members);
          }
        )
        .catch(
          error => {
            console.error(error);
          }
        )
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
      data.update(
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
          data.update(
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

    sortUsers(array) {
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

  bookshelf.init();
  picklist.init();
})();

const createBook = function(title, author, datePicked, userPicked) {
  WeDeploy.data('http://data.gsbc.wedeploy.io')
    .create(
      'books',
      {
        'bookAuthor': author,
        'bookTitle': title,
        'datePicked': datePicked,
        'userPicked': userPicked,
      }
    )
    .then(newBook => console.log(newBook))
    .catch(error => console.error(error))
};

const createMember = function(nameF) {
  WeDeploy.data('http://data.gsbc.wedeploy.io')
    .create(
      'members',
      {
        'nameFirst': nameF,
        'pickAvailable': true
      }
    )
    .then(name => console.log(name))
    .catch(error => console.error(error))
};

const getAllIds = () => {
  WeDeploy.data('http://data.gsbc.wedeploy.io')
    .get('members')
    .then(members => {
      members.forEach(member => {
        console.log(member.id);
      })
    })
    .catch(error => console.error(error))
}

const getAllUsers = () => {
  WeDeploy.data('http://data.gsbc.wedeploy.io')
    .get('members')
    .then(members => {
      console.log(members);
    })
    .catch(error => console.error(error))
}
