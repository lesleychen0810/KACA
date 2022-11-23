
import { app } from './firebase.js';

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc,
    addDoc,
    collection,
    query,
    getDocs
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

const db = getFirestore(app);
// Set session
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // location.href = './index.html';
        // ...
        console.log(user.uid);
        // 登入/註冊按鈕隱藏
        const logreg = document.querySelector('#logreg');
        logreg.style.display = "none";

        document.getElementById('send').addEventListener('click', function () {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                // location.href = './index.html';
                // ...
                console.log(user.uid);

                const title = "hihi";
                const content = "hihi";
                const date = Math.round(Date.now() / 1000);
                async function setDocument() {
                    await setDoc(doc(db, 'blogs', user.uid), {
                        //
                    })
                }
            }
        })

    } else {
        // User is signed out
        // ...
        console.log("no user");
        // 登出按鈕隱藏
        const logout = document.querySelector('#logout');
        logout.style.display = "none";
        // 會員資料按鈕隱藏
        const self = document.querySelector('#self');
        self.style.display = "none";
    }
})


// Sign out function
document.getElementById('logout').addEventListener('click', function () {
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log("Logout success");
        alert("Logout success");
    })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorCode + errorMessage);
            alert(errorCode + errorMessage);
        })
})
