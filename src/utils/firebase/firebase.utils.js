import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,

    } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {

    apiKey: " AIzaSyA7PxFnxXA-YRFNRZk4vfHb4MJuoHUJo8A",
  
    authDomain: "e-commerce-store-291b0.firebaseapp.com",
  
    projectId: "e-commerce-store-291b0",
  
    storageBucket: "e-commerce-store-291b0.appspot.com",
  
    messagingSenderId: "617308919295",
  
    appId: "1:617308919295:web:3934715f172ca2610e83ca"
  
  };
  
  const firebaseApp = initializeApp(firebaseConfig)

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters(
    {
        prompt: 'select_account'
    }
  );

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object);
  })
  
  await batch.commit();
  console.log('done')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
  return categoryMap;
}

export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
  
 export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {

    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error){
            console.log('error creating the user')
        }
    }

    return userDocRef;

    //if user data exists
    //return user data
    // if not create user data
  }


  export const createAuthUserWithEmailandPassword = async (email, password) => {

    if(!email || !password) return;

    return  await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInUserWithEmailAndPassword = async (email, password) => {
    
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth, email, password);   
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
  