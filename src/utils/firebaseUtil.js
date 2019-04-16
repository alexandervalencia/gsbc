import { firestore } from '../firebase';

export const collectIdsAndDocs = doc => ({ id: doc.id, ...doc.data() });

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user ', error.message);
    }
  }

  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;

  try {
    return firestore.collection('users').doc(uid);
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};
