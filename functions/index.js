const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();

exports.mv = functions.https.onRequest(request => {
  const mv = async (collRefSource, collRefDest) => {
    const querySnapshot = await collRefSource.get();
    querySnapshot.forEach(async docSnapshot => {
      (async () => {
        await collRefDest.doc(docSnapshot.id).set(docSnapshot.data());
        docSnapshot.ref.delete();
      })();
      const collRefs = await docSnapshot.ref.getCollections();
      for (const collRef of collRefs) {
        mv(collRef, collRefDest.doc(docSnapshot.id).collection(collRef.id));
      }
    });
  };

  const collRefSource = firestore.collection(request.query.collPathSource);
  const collRefDest = firestore.collection(request.query.collPathDest);

  mv(collRefSource, collRefDest);
});

// Example: https://us-central1-good-stuff-book-club.cloudfunctions.net/mv?collPathSource=collection1%2Fdocument1%2Fcollection2&collPathDest=collection3
