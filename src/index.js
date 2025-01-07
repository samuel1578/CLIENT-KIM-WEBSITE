import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

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
console.log('Initializing Firebase...');
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log('Firebase initialized.');

// DOM elements
const loginButton = document.getElementById('loginButton');
const authButton = document.getElementById('authButton');
const popupOverlay = document.getElementById('popupOverlay');
const authPopup = document.getElementById('authPopup');
const signupButton = document.getElementById('signupButton');
const loginPopup = document.getElementById('loginPopup');
const signupPopup = document.getElementById('signupPopup');
const backToAuthFromLogin = document.getElementById('backToAuthFromLogin');
const backToAuthFromSignup = document.getElementById('backToAuthFromSignup');
const logoutButton = document.getElementById('logoutButton');

// Toggle login/logout button
const toggleLoginLogoutButton = (isLoggedIn) => {
    if (isLoggedIn) {
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
};

// Firebase Authentication Handlers
const handleSignup = async (event) => {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const username = document.getElementById('signupUsername').value; // Capture the username
    console.log('[Signup] Email:', email, 'Username:', username);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update the user's display name
        await updateProfile(user, {
            displayName: username
        });

        console.log('[Signup] User created successfully with username:', username);
        alert(`Account created successfully! Welcome, ${username}!`);

        signupPopup.style.display = 'none';
        popupOverlay.style.display = 'none';
    } catch (error) {
        console.error('[Signup] Error:', error.code, error.message);
        alert(`Signup failed: ${error.message}`);
    }
};

const handleLogin = async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    console.log('[Login] Email:', email);

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('[Login] Logged in successfully:', user);

        const username = user.displayName || 'User';
        alert(`Logged in successfully! Welcome back, ${username}!`);

        loginPopup.style.display = 'none';
        popupOverlay.style.display = 'none';

        // Toggle button to logout
        toggleLoginLogoutButton(true);
    } catch (error) {
        console.error('[Login] Error:', error.code, error.message);
        alert(`Login failed: ${error.message}`);
    }
};

const handleLogout = async () => {
    console.log('[Logout] Attempting logout...');
    try {
        await signOut(auth);
        console.log('[Logout] Successfully logged out.');
        alert('Logged out successfully!');

        // Toggle button to login
        toggleLoginLogoutButton(false);
    } catch (error) {
        console.error('[Logout] Error:', error.code, error.message);
        alert(`Logout failed: ${error.message}`);
    }
};

// Popup Navigation
loginButton.addEventListener('click', () => {
    console.log('[Popup] Login button clicked.');
    authPopup.style.display = 'none';
    loginPopup.style.display = 'block';
});

signupButton.addEventListener('click', () => {
    console.log('[Popup] Signup button clicked.');
    authPopup.style.display = 'none';
    signupPopup.style.display = 'block';
});

backToAuthFromLogin.addEventListener('click', () => {
    console.log('[Popup] Back to auth from login clicked.');
    loginPopup.style.display = 'none';
    authPopup.style.display = 'block';
});

backToAuthFromSignup.addEventListener('click', () => {
    console.log('[Popup] Back to auth from signup clicked.');
    signupPopup.style.display = 'none';
    authPopup.style.display = 'block';
});

popupOverlay.addEventListener('click', () => {
    console.log('[Popup] Popup overlay clicked.');
    loginPopup.style.display = 'none';
    signupPopup.style.display = 'none';
    authPopup.style.display = 'none';
    popupOverlay.style.display = 'none';
});

authButton.addEventListener('click', () => {
    console.log('[Popup] Auth button clicked.');
    popupOverlay.style.display = 'block';
    authPopup.style.display = 'block';
});

// Form Event Listeners
const signupForm = document.querySelector('#signupPopup form');
const loginForm = document.querySelector('#loginPopup form');

if (signupForm) {
    console.log('[Form] Signup form found, attaching event listener.');
    signupForm.addEventListener('submit', handleSignup);
} else {
    console.error('[Form] Signup form not found.');
}

if (loginForm) {
    console.log('[Form] Login form found, attaching event listener.');
    loginForm.addEventListener('submit', handleLogin);
} else {
    console.error('[Form] Login form not found.');
}

// Logout button event listener
logoutButton.addEventListener('click', handleLogout);
