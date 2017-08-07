//@ts-check
$(function() {

  const auth = WeDeploy.auth('https://auth-gsbc.wedeploy.io');
  const data = WeDeploy.data('https://data-gsbc.wedeploy.io');
  const currentUser = auth.currentUser;
  const controlBar = document.querySelector('#control-bar');
  const signInBtn = document.querySelector('#signInBtn');
  const stuff = $('#stuff');

  const addMemberToDatabase = function(member) {
    data.create('members', {
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      pickAvailable: true
    })
    .then(function(newMember) {
      // console.log(newMember);
    })
    .catch(function(err) {
      console.error(err)
    });
  };

  const newMember = function() {
    auth.createUser({
      email: user.email.value,
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      password: user.password.value
    })
    .then(function(member) {
      addMemberToDatabase(member);
      alert('Account sucessfully created!');
      signIn();
      user.reset();
    })
    .catch(function(err) {
      alert('Sign-up failed. Try again.');
      console.log(err);
      user.reset();
    });
  }

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

    controlBar.innerHTML = `<button data-target="#addBookModal" data-toggle="modal" id="addBookBtn" type="button">Add a Book</button> | <button id="signOutBtn" type="button">Sign Out</button>`

    const signOutBtn = document.querySelector('#signOutBtn');

    signOutBtn.addEventListener('click', signOut);

  }
  else {
    controlBar.innerHTML = `<button data-target="#signInModal" data-toggle="modal" type="button">Sign In</button>`

    signInBtn.addEventListener('click', signIn);
  }

});
