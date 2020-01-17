import * as sapper from '@sapper/app'
import firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyCIx-t2a2w5API_HbqcCSqqVgh7kHUlhac",
    authDomain: "mathblog-54ab9.firebaseapp.com",
    databaseURL: "https://mathblog-54ab9.firebaseio.com",
    projectId: "mathblog-54ab9",
    storageBucket: "mathblog-54ab9.appspot.com",
    messagingSenderId: "628508635218",
    appId: "1:628508635218:web:b1b44fc1e6050f340b6f8b"
}

firebase.initializeApp(firebaseConfig);

sapper.start({
	target: document.querySelector('#sapper')
});