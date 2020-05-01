import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCce-LoN4ndqO5Utrvz4VFdelwx6s5qtlM",
    authDomain: "tddd27-webshop.firebaseapp.com",
    databaseURL: "https://tddd27-webshop.firebaseio.com",
    projectId: "tddd27-webshop",
    storageBucket: "tddd27-webshop.appspot.com",
    messagingSenderId: "301645169700",
    appId: "1:301645169700:web:412893f40e533fc18344b1",
    measurementId: "G-EC674355ZF"
  };

const fire = firebase.initializeApp(firebaseConfig);
export default fire;