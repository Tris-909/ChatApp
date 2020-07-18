  import firebase from 'firebase/app';
  import 'firebase/auth';
  import 'firebase/database';
  import 'firebase/storage';
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyACH67mD4q9tUkXOqlnmBAmLc-iQKXK5uM",
    authDomain: "chatapp-1eca4.firebaseapp.com",
    databaseURL: "https://chatapp-1eca4.firebaseio.com",
    projectId: "chatapp-1eca4",
    storageBucket: "chatapp-1eca4.appspot.com",
    messagingSenderId: "716637568734",
    appId: "1:716637568734:web:81de4e2a2f7e11d9ba8c4f"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);