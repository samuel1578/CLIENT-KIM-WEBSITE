import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyCq9k3arv8CQnlf8Na_uLqFZq-FgsgMeZs",
    authDomain: "new-vintage-luxury-candles.firebaseapp.com",
    projectId: "new-vintage-luxury-candles",
    storageBucket: "new-vintage-luxury-candles.firebasestorage.app",
    messagingSenderId: "840602876611",
    appId: "1:840602876611:web:8628b7c3a75316cf5e0076",
    measurementId: "G-145J58T9T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);


const loginButton = document.getElementById('loginButton');
const authButton = document.getElementById('authButton');
const popupOverlay = document.getElementById('popupOverlay');
const authPopup = document.getElementById('authPopup');
const signupButton = document.getElementById('signupButton');
const loginPopup = document.getElementById('loginPopup');
const signupPopup = document.getElementById('signupPopup');
const backToAuthFromLogin = document.getElementById('backToAuthFromLogin');
const backToAuthFromSignup = document.getElementById('backToAuthFromSignup');

loginButton.addEventListener('click', () => {
    authPopup.style.display = 'none';
    loginPopup.style.display = 'block';
});

signupButton.addEventListener('click', () => {
    authPopup.style.display = 'none';
    signupPopup.style.display = 'block';
});

backToAuthFromLogin.addEventListener('click', () => {
    loginPopup.style.display = 'none';
    authPopup.style.display = 'block';
});

backToAuthFromSignup.addEventListener('click', () => {
    signupPopup.style.display = 'none';
    authPopup.style.display = 'block';
});

popupOverlay.addEventListener('click', () => {
    loginPopup.style.display = 'none';
    signupPopup.style.display = 'none';
});

authButton.addEventListener('click', () => {
    popupOverlay.style.display = 'block';
    authPopup.style.display = 'block';
});

popupOverlay.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    authPopup.style.display = 'none';
});



authButton.addEventListener('click', () => {
    popupOverlay.style.display = 'block';
    authPopup.style.display = 'block';
});

popupOverlay.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
    authPopup.style.display = 'none';
});