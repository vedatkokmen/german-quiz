var firebaseConfig = {
	apiKey: "AIzaSyDwLW5_tHzQOM0w8JtkFNIY3G1L_Z0M5KQ",
	authDomain: "german-quiz-e481e.firebaseapp.com",
	databaseURL: "https://german-quiz-e481e.firebaseio.com",
	projectId: "german-quiz-e481e",
	storageBucket: "german-quiz-e481e.appspot.com",
	messagingSenderId: "1051579186513",
	appId: "1:1051579186513:web:0533f16a7dfd6aa119e770",
	measurementId: "G-KY1Z7QYDQE"
};


import * as firebase from 'firebase/app';
import 'firebase/firestore';

const app = firebase.initializeApp(firebaseConfig);

var db = firebase.firestore()

export default db
