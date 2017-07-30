//@ts-check
(function() {
  const amazonSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13.305 10.271v.456c0 .821.019 1.504-.394 2.234-.334.594-.867.958-1.458.958-.809 0-1.282-.616-1.282-1.528.001-1.794 1.611-2.12 3.134-2.12zm10.695-5.271v14c0 2.761-2.238 5-5 5h-14c-2.761 0-5-2.239-5-5v-14c0-2.761 2.239-5 5-5h14c2.762 0 5 2.239 5 5zm-10.695 3.31v.274c-1.222.136-2.818.227-3.961.73-1.32.57-2.247 1.732-2.247 3.442 0 2.189 1.38 3.283 3.154 3.283 1.498 0 2.317-.353 3.473-1.531.384.554.508.823 1.21 1.404.155.085.363.081.502-.045.419-.374 1.184-1.038 1.615-1.399.171-.139.142-.368.006-.56-.384-.532-.795-.965-.795-1.952v-3.282c0-1.391.097-2.668-.928-3.625-.807-.776-2.147-1.049-3.172-1.049-2.004 0-4.241.748-4.711 3.226-.05.263.143.402.315.44l2.041.222c.191-.01.33-.198.366-.388.175-.853.89-1.265 1.693-1.265.434 0 .927.16 1.183.546.296.434.256 1.027.256 1.529zm4.497 8.879c-1.832.981-3.823 1.454-5.635 1.454-2.684 0-5.284-.929-7.387-2.471-.185-.135-.321.103-.167.277 1.949 2.218 4.523 3.551 7.383 3.551 2.04 0 4.41-.809 6.044-2.33.271-.251.039-.629-.238-.481zm1.594-.96c-.182-.224-1.741-.417-2.693.252-.147.103-.121.245.041.225.536-.064 1.73-.208 1.942.065.213.272-.236 1.395-.437 1.896-.061.151.07.213.207.098.892-.747 1.122-2.311.94-2.536z"/></svg>`;
  const currentUser = WeDeploy.auth('http://auth.gsbc.wedeploy.io').currentUser;
  const data = WeDeploy.data('http://data.gsbc.wedeploy.io');
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

    createBookRow: function(book) {
      const tr = document.createElement("tr");

      book = this.formatBookData(book);

      tr.className = 'book';
      tr.id = book.id;

      tr.innerHTML = `<th class="title" scope="row">
          <div class="book-title-wrapper">
            <span class="book-title">${book.bookTitle}</span>
            <span class="amazon"><a href="${book.bookAmazonUrl}" target="_blank">${amazonSVG}</a></span>
          </div>
        </th>
        <td class="book-rating">
          <span class="average-rating" data-book-id="${book.id}">${book.bookRating}</span>
        </td>
        <td class="author">${book.bookAuthor}</td>
        <td class="datePicked">${book.datePicked}</td>
        <td class="pickedBy">
          ${book.userPicked}
          <span class="form-controls hidden">
            <a href="javascript:;"><i class="fa fa-minus-square book-delete" aria-hidden="true"></i></a>
            <a href="javascript:;"> <i class="fa fa-pencil-square-o book-edit" aria-hidden="true"></i></a>
          </span>
        </td>`

      return tr
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
        function(a, b) {
          return a + b;
        }
      );

      const avg = (sum / ratings.length);

      return (Math.round(avg * 2) / 2).toFixed(1);
    },

    simplifyFormData: function(data) {
      let el = data.elements;
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
        function(member) {
          return member.nameFirst;
        }
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
