const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.updateBookRating = functions.firestore
  .document('books/{bookId}/ratings/{ratingId}')
  .onWrite(async (change, context) => {
    const { bookId } = context.params;
    const bookRef = firestore.doc(`books/${bookId}`);
    const ratingsRef = bookRef.collection('ratings');
    const ratings = await ratingsRef.get().then(v => v);

    let ratingValue;

    if (ratings.docs.length > 0) {
      const bookRatings = [];
      ratings.docs.forEach(doc => {
        bookRatings.push(doc.get('rating'));
      });

      ratingValue = bookRatings.reduce((a, b) => a + b, 0) / bookRatings.length;
    } else {
      ratingValue = -1;
    }

    return bookRef.update({ ratingValue });
  });
