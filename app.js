// Firebase CDN (WORKS on GitHub Pages)
const firebaseConfig = {
  apiKey: "AIzaSyAxSyj6mPU4oWVmRdH_bUTky7j7A8TMWQw",
  authDomain: "cashbacker-52a60.firebaseapp.com",
  projectId: "cashbacker-52a60",
  storageBucket: "cashbacker-52a60.firebasestorage.app",
  messagingSenderId: "971010772824",
  appId: "1:971010772824:web:27b1a47eaf460d2f94df2d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Login
function login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      document.getElementById("user").textContent =
        "Welcome " + user.displayName;
      document.getElementById("loginBtn").style.display = "none";
      alert("Login successful!");
    })
    .catch((error) => {
      alert(error.message);
      console.error(error);
    });
}
