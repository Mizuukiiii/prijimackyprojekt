import firebase from "@/firebase/config";


const firestore = firebase.firestore();

// Reference to a specific document by its ID
const documentRef = firestore.collection('mathProblems').doc('iQZSumSKIEfXJiY1Pm9a');

// Fetch the document
documentRef.get()
  .then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      console.log('Document data:', data);
    } else {
      console.log('No such document!');
    }
  })
  .catch((error) => {
    console.error('Error fetching document: ', error);
  });
