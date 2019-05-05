const admin = require('firebase-admin');
const data = require('./booksWithRatings.json');
const serviceAccount = require('./firebase-admin-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://good-stuff-book-club.firebaseio.com',
});

data &&
  Object.keys(data).forEach(key => {
    const nestedContent = data[key];
    console.log(nestedContent);
    if (typeof nestedContent === 'object') {
      Object.keys(nestedContent).forEach(docTitle => {
        admin
          .firestore()
          .collection(key)
          .doc(docTitle)
          .set(nestedContent[docTitle])
          .then(res => {
            console.log('Document successfully written!');
          })
          .catch(error => {
            console.error('Error writing document: ', error);
          });
      });
    }
  });
