//@ts-check
$(function() {

  const auth = WeDeploy.auth('https://auth-gsbc.wedeploy.io');
  const data = WeDeploy.data('https://data-gsbc.wedeploy.io');
  const currentUser = auth.currentUser;
  const controlBar = document.querySelector('#control-bar');
  const signInBtn = document.querySelector('#signInBtn');
  const stuff = $('#stuff');

  const newMemberBtn = document.querySelector('#newMemberBtn');

  const addMemberToDatabase = function(member) {
    data.create('members', {
      email: member.email,
      nameFirst: member.nameFirst,
      nameLast: member.lastName,
      pickAvailable: true,
      userId: member.userId
    })
    .then(function(newMember) {
      // console.log(newMember);
    })
    .catch(function(err) {
      console.error(err)
    });
  };

  const newMember = function(event) {
    event.preventDefault();

    let form = event.target.form;
    let email = form.querySelector('#email').value;
    let nameFirst = form.querySelector('#nameFirst').value;
    let nameLast = form.querySelector('#nameLast').value;
    let password = form.querySelector('#password').value;

    auth.createUser({
      email: email,
      nameFirst: nameFirst,
      nameLast: nameLast,
      password: password
    })
    .then(function(member) {
      member.userId = member.id;
      addMemberToDatabase(member);
      alert('Account sucessfully created!');
      //signIn();
      user.reset();
    })
    .catch(function(err) {
      alert('Sign-up failed. Try again.');
      console.log(err);
      user.reset();
    });
  }

  newMemberBtn.addEventListener('click', newMember);

  const signIn = function(event) {
    event.preventDefault();

    const failAlert = document.querySelector('#signInFailAlert');
    const loader = document.querySelector('.spinner-container');
    const form = event.target.form;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    if (email && password) {
      loader.className += ' show';

      signInBtn.className = 'btn btn-primary disabled';
      signInBtn.disabled = true;

      auth.signInWithEmailAndPassword(email, password)
      .then(function() {
        user.reset();
        document.location.href = '/';
      })
      .catch(function(err) {
        failAlert.className += ' show';
        loader.classList.remove('show');
        signInBtn.classList.remove('disabled');
        signInBtn.disabled = false;

        setTimeout(
          function() {
            $(".alert").alert('close')
          },
          5000
        );
      });
    }
  }

  const signOut = function() {
    auth.signOut()
      .then(function() {
        document.location.href = '/';
      });
  }

  if (currentUser) {
    stuff.hover(
      function() {
        stuff.text('Shit ')
      },
      function() {
        stuff.text('Stuff')
      }
    );

    //controlBar.innerHTML = `<button data-target="#addBookModal" data-toggle="modal" id="addBookBtn" type="button">Add a Book</button> | <button id="signOutBtn" type="button">Sign Out</button>`

    //const signOutBtn = document.querySelector('#signOutBtn');

    //signOutBtn.addEventListener('click', signOut);

  }
  else {
    //controlBar.innerHTML = `<button data-target="#signInModal" data-toggle="modal" type="button">Sign In</button>`

    //signInBtn.addEventListener('click', signIn);
  }

});

const getAllAuthUsers = () => {
  WeDeploy.auth('https://auth-gsbc.wedeploy.io')
    .getAllUsers()
    .then(users => {
      console.log(users);
    })
    .catch(error => {console.error(error)})
}

const getAllUsers = () => {
  WeDeploy.data('https://data-gsbc.wedeploy.io')
    .get('members')
    .then(members => {
      console.log(members);
    })
    .catch(error => {console.error(error)})
}

const getAllBooks = () => {
  WeDeploy.data('https://data-gsbc.wedeploy.io')
    .get('books')
    .then(books => {console.log(books)})
    .catch(error => {console.error(error)})
}
