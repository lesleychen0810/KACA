
import { app } from './firebase.js';

import { 
    getAuth, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-auth.js";

import { 
    getFirestore, 
    doc, 
    getDoc, 
    deleteDoc 
} from "https://www.gstatic.com/firebasejs/9.9.2/firebase-firestore.js";

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Set session
const auth = getAuth(app);
const user = auth.currentUser;
// Get id from url
const url = location.href;
if (url.indexOf('?') != -1)
{
    // 分割字串把分割後的字串放進陣列中
    var ary1 = url.split('?');
    // 把後方傳遞的每組資料各自分割
    var ary2 = ary1[1].split('&');
    // Get recordid
    var ary3 = ary2[0].split('=');
    var recordid = ary3[1];
    console.log(recordid);
    // Get memberid
    if (url.includes('memberid')) {
        var ary4 = ary2[1].split('=');
        var memberid = ary4[1];
        console.log(memberid);
    }
}

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

        document.getElementById('user').innerHTML = user.email;

        // Get record data
        getDoc(doc(db, 'users', user.uid, 'records', recordid)).then(docSnap => {
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                let firstIndex = docSnap.data().firstIndex;
                let firstValue = docSnap.data().firstValue;

                let secondIndex = docSnap.data().secondIndex;
                let secondValue = docSnap.data().secondValue;

                let thirdIndex = docSnap.data().thirdIndex;
                let thirdValue = docSnap.data().thirdValue;

                // 圓餅圖
                const ctx = document.querySelector('#myChart').getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: [firstIndex, secondIndex, thirdIndex],
                        datasets: [{
                            // label: '# of Votes',
                            data: [firstValue, secondValue, thirdValue],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)' 
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)' 
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                })
            } else {
              console.log("No such document!");
            }
        })

        // Delete record data
        const docRef = doc(db, 'users', user.uid, 'records', recordid);

        document.getElementById('delbtn').addEventListener('click', function () {
            if (confirm("確定要刪除此紀錄?")) {
                deleteDoc(docRef)
                .then(() => {
                    alert("已成功刪除");
                    location.href = './record.html';
                })
                .catch(error => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    console.log(errorCode + errorMessage);
                    alert(errorCode + errorMessage);
                })
            } else {
                alert("已取消刪除");
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
