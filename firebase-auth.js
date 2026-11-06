/**
 * Mucify - Firebase Authentication Module
 * Supports:
 * - Google Sign-In (Gmail & Google Workspace) via GoogleAuthProvider
 * - Microsoft Sign-In (Outlook, Hotmail, Microsoft 365) via OAuthProvider('microsoft.com')
 * - Persistent Auth State across page refreshes via onAuthStateChanged
 * - Secure Sign-Out functionality
 */

// Import Firebase Modular SDK (v10) directly via official CDN (no bundler required)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    OAuthProvider,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

// ============================================================================
// 1. FIREBASE CONFIGURATION
// Replace the placeholder values below with your credentials from the
// Firebase Console: Project Settings > General > "Your apps" (Web app)
// ============================================================================
const firebaseConfig = {
    apiKey: "AIzaSyAAvAXKxKXEYWPYHZCKX3K0Qys6Ht9uuzg",
    authDomain: "musify-b3961.firebaseapp.com",
    projectId: "musify-b3961",
    storageBucket: "musify-b3961.firebasestorage.app",
    messagingSenderId: "206469060284",
    appId: "1:206469060284:web:4d97a597fdda33bbafa2b9"
};

// Initialize Firebase App & Authentication service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ============================================================================
// 2. AUTHENTICATION PROVIDERS SETUP
// ============================================================================

// --- Google Auth Provider (Gmail) ---
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account' // Always prompt user to pick their Google account
});
googleProvider.addScope('profile');
googleProvider.addScope('email');

// --- Microsoft OAuth Provider (Outlook / Microsoft 365) ---
const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
    prompt: 'select_account',
    // 'tenant: common' allows personal Microsoft accounts (Outlook.com/Hotmail.com)
    // as well as corporate/educational work or school accounts.
    tenant: 'common'
});
microsoftProvider.addScope('user.read');
microsoftProvider.addScope('email');

// ============================================================================
// 3. DOM ELEMENTS
// ============================================================================
const authScreen = document.getElementById('auth-screen');
const authCard = document.querySelector('.auth-card');
const authButtons = document.querySelector('.auth-buttons');
const authLoadingState = document.getElementById('auth-loading-state');
const authErrorBanner = document.getElementById('auth-error-banner');
const authErrorText = document.getElementById('auth-error-text');

const btnLoginGoogle = document.getElementById('btn-login-google');
const btnLoginMicrosoft = document.getElementById('btn-login-microsoft');
const btnLogout = document.getElementById('logout-btn');

// App Profile Elements
const profilePic = document.querySelector('.profile-pic');
const usernameSpan = document.querySelector('.username');
const ownerPic = document.querySelector('.owner-pic');
const ownerName = document.querySelector('.owner-name');
const profileDropdown = document.getElementById('profile-dropdown-menu');

// ============================================================================
// 4. AUTHENTICATION LOGIC
// ============================================================================

/**
 * Handle Sign In with Google
 */
export async function loginWithGoogle() {
    if (isPlaceholderConfig()) {
        showAuthError("⚠️ Please configure your real Firebase keys in firebase-auth.js before signing in.");
        return;
    }

    setButtonLoading(btnLoginGoogle, true, 'Signing in with Google...');
    hideAuthError();

    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        // Retrieve display name, email, and photo
        const displayName = user.displayName || user.email.split('@')[0];
        const email = user.email;

        console.log('[Mucify Auth] ✅ Google Login Successful:', {
            displayName: displayName,
            email: email,
            uid: user.uid,
            photoURL: user.photoURL
        });

        return user;
    } catch (error) {
        console.error('[Mucify Auth] ❌ Google Login Error:', error);
        handleAuthError(error);
    } finally {
        setButtonLoading(btnLoginGoogle, false, 'Sign in with Google');
    }
}

/**
 * Handle Sign In with Microsoft (Outlook / Hotmail)
 */
export async function loginWithMicrosoft() {
    if (isPlaceholderConfig()) {
        showAuthError("⚠️ Please configure your real Firebase keys in firebase-auth.js before signing in.");
        return;
    }

    setButtonLoading(btnLoginMicrosoft, true, 'Signing in with Microsoft...');
    hideAuthError();

    try {
        const result = await signInWithPopup(auth, microsoftProvider);
        const user = result.user;

        // Retrieve display name, email, and photo
        const displayName = user.displayName || user.email.split('@')[0];
        const email = user.email;

        console.log('[Mucify Auth] ✅ Microsoft Login Successful:', {
            displayName: displayName,
            email: email,
            uid: user.uid,
            photoURL: user.photoURL
        });

        return user;
    } catch (error) {
        console.error('[Mucify Auth] ❌ Microsoft Login Error:', error);
        handleAuthError(error);
    } finally {
        setButtonLoading(btnLoginMicrosoft, false, 'Sign in with Microsoft');
    }
}

/**
 * Handle Sign Out
 */
export async function logoutUser() {
    try {
        // Pause any running audio before logout
        pauseAllAudios();

        await signOut(auth);
        console.log('[Mucify Auth] 🔒 User successfully logged out.');
    } catch (error) {
        console.error('[Mucify Auth] ❌ Sign-out error:', error);
        alert('Sign-out failed: ' + error.message);
    }
}

// ============================================================================
// 5. STATE MANAGEMENT (onAuthStateChanged)
// Detects if user is already logged in on page load / refresh
// ============================================================================
onAuthStateChanged(auth, (user) => {
    // Hide initial auth checking indicator
    if (authLoadingState) authLoadingState.style.display = 'none';

    if (user) {
        // User is currently authenticated
        const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Music Fan');
        const email = user.email || 'No email attached';
        const photoURL = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1db954&color=fff&bold=true`;

        console.log(`[Mucify Auth] Session active for: ${displayName} (${email})`);

        // 1. Update UI user elements in header and playlists
        updateUserUI(displayName, email, photoURL);

        // 2. Grant access: Hide login screen, reveal application
        document.body.classList.remove('not-authenticated');
        document.body.classList.add('authenticated');

        if (authScreen) {
            authScreen.classList.add('hidden');
        }
    } else {
        // User is NOT logged in: Lock application and present login UI
        console.log('[Mucify Auth] No active user session detected.');

        document.body.classList.remove('authenticated');
        document.body.classList.add('not-authenticated');

        if (authButtons) authButtons.style.display = 'flex';
        if (authScreen) {
            authScreen.classList.remove('hidden');
        }
    }
});

// ============================================================================
// 6. UI HELPERS & EVENT LISTENERS
// ============================================================================

/**
 * Update Header and Profile UI with logged-in user information
 */
function updateUserUI(displayName, email, photoURL) {
    if (usernameSpan) {
        usernameSpan.textContent = displayName;
        usernameSpan.title = email;
    }
    if (profilePic) {
        profilePic.src = photoURL;
        profilePic.alt = displayName;
    }
    if (ownerName) {
        ownerName.textContent = displayName;
    }
    if (ownerPic) {
        ownerPic.src = photoURL;
        ownerPic.alt = displayName;
    }

    // Add or update user email pill in profile dropdown
    if (profileDropdown) {
        let emailEl = profileDropdown.querySelector('.profile-dropdown-user-email');
        if (!emailEl) {
            emailEl = document.createElement('div');
            emailEl.className = 'profile-dropdown-user-email';
            profileDropdown.insertBefore(emailEl, profileDropdown.firstChild);
        }
        emailEl.textContent = email;
    }
}

/**
 * Pause all audio elements when user logs out
 */
function pauseAllAudios() {
    try {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach(audio => {
            try { audio.pause(); } catch (e) { }
        });
        // Click play/pause button if player is running
        const playBtn = document.getElementById('play-btn');
        if (playBtn && playBtn.classList.contains('playing')) {
            playBtn.click();
        }
    } catch (e) {
        console.warn('[Mucify Auth] Error pausing audio on logout:', e);
    }
}

/**
 * Check if the developer hasn't replaced the placeholder credentials
 */
function isPlaceholderConfig() {
    return !firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY";
}

/**
 * Button loading spinner state toggle
 */
function setButtonLoading(button, isLoading, text) {
    if (!button) return;
    const label = button.querySelector('.auth-btn-label');
    const spinner = button.querySelector('.auth-spinner');
    button.disabled = isLoading;

    if (isLoading) {
        if (spinner) spinner.style.display = 'inline-block';
        if (label && text) label.textContent = text;
    } else {
        if (spinner) spinner.style.display = 'none';
        if (label && text) label.textContent = text;
    }
}

/**
 * Display readable error messages to the user
 */
function showAuthError(message) {
    if (!authErrorBanner || !authErrorText) return;
    authErrorText.textContent = message;
    authErrorBanner.style.display = 'flex';
}

function hideAuthError() {
    if (!authErrorBanner) return;
    authErrorBanner.style.display = 'none';
}

/**
 * Map Firebase Auth error codes to user-friendly messages
 */
function handleAuthError(error) {
    let message = 'An unexpected error occurred. Please try again.';

    switch (error.code) {
        case 'auth/popup-closed-by-user':
            message = 'The sign-in window was closed before completion. Please try again.';
            break;
        case 'auth/cancelled-popup-request':
            message = 'Multiple popup requests opened. Only the latest is handled.';
            break;
        case 'auth/popup-blocked':
            message = 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
            break;
        case 'auth/invalid-api-key':
        case 'auth/api-key-not-valid':
            message = 'Invalid Firebase API Key. Please update your firebaseConfig in firebase-auth.js.';
            break;
        case 'auth/unauthorized-domain':
            message = `Domain "${window.location.hostname}" is not authorized. Add it in Firebase Console > Authentication > Settings > Authorized domains.`;
            break;
        case 'auth/operation-not-allowed':
            message = 'This sign-in provider is not enabled in the Firebase Console (Authentication > Sign-in method).';
            break;
        case 'auth/account-exists-with-different-credential':
            message = 'An account already exists with this email using a different sign-in method.';
            break;
        default:
            message = error.message || message;
    }

    showAuthError(message);
}

// ============================================================================
// 7. INITIALIZATION & EVENT BINDINGS
// ============================================================================
function checkConfigOnStartup() {
    // Re-trigger Lucide icon generation for newly mounted auth UI if lucide is present
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    // If placeholders are still present, display friendly onboarding reminder
    if (isPlaceholderConfig()) {
        showAuthError("⚠️ Setup required: Replace the placeholder firebaseConfig keys in 'firebase-auth.js' with your project keys from Firebase Console.");
        if (authLoadingState) authLoadingState.style.display = 'none';
        if (authButtons) authButtons.style.display = 'flex';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkConfigOnStartup);
} else {
    checkConfigOnStartup();
}

if (btnLoginGoogle) {
    btnLoginGoogle.addEventListener('click', (e) => {
        e.preventDefault();
        loginWithGoogle();
    });
}

if (btnLoginMicrosoft) {
    btnLoginMicrosoft.addEventListener('click', (e) => {
        e.preventDefault();
        loginWithMicrosoft();
    });
}

if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        logoutUser();
    });
}

// Expose auth utilities on window for debugging and interoperability
window.MucifyAuth = {
    auth,
    loginWithGoogle,
    loginWithMicrosoft,
    logoutUser,
    get currentUser() {
        return auth.currentUser;
    }
};
