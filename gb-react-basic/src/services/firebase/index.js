import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBS2bbCRyQW7ds34Be2B1567QOcEfP4bu4",
  authDomain: "gb-react-basic.firebaseapp.com",
  projectId: "gb-react-basic",
  storageBucket: "gb-react-basic.appspot.com",
  messagingSenderId: "86957711147",
  appId: "1:86957711147:web:24e499ffb77700446d6f6e"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.database();

export const rootRef = db.ref("root");

// export const todoRef = db.ref("todo");
// export const projectRef = todoRef.child('project')
// export const tasksRef = todoRef.child('tasks')

// export const chatsRef = rootRef.child("chats");