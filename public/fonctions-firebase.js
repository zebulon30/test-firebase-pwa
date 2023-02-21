
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";
import { } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5DY2q4HhPax-TOL5yBPfKdv6lvVb4T7w",
    authDomain: "test-firebase-pwa.firebaseapp.com",
    projectId: "test-firebase-pwa",
    storageBucket: "test-firebase-pwa.appspot.com",
    messagingSenderId: "20075001776",
    appId: "1:20075001776:web:103e1e35710d0f24ed0875",
    measurementId: "G-0NHSZTXHD0"
  };

// Initialise Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Obtient l'instance Auth
var auth = getAuth(firebaseApp);

// ------------------------------------------------------------------------------------------

// Si click sur bouton [Créer]
document.querySelector(".creer_compte").addEventListener("click", function(e){
    e.preventDefault() // Empèche l'exécuton normal du click sur le bouton
    let email = document.querySelector("#inputEmail").value
    let password = document.querySelector("#inputPassword").value

    // Appel de la fonction firebase et traitement de la réponse ( .then() et .catch() )
    // createUserWithEmailAndPassword retourne une Promise (promesse)
    // donc la structure du code ci-dessous est le suivant :
    // [Promise].then(traitement_si_ok).catch(traitement_si_ko)
    // .then() et .catch() sont des méthodes liées à une promise.
    createUserWithEmailAndPassword( auth, email, password )
    .then( (userCredentials) => { // le .then permet de traiter le cas de l'exécution correcte de createUserWithEmailAndPassword
        console.log( userCredentials )
        let a = document.getElementById("erreur_api")
        a.innerHTML = "Compte correctement créé" // Change le contenu de la div erreur_api
        a.style.color = "green"; // Change la couleur du texte

    })
    .catch( (error) => { // Le .catch permet de traiter le cas où createUserWithEmailAndPassword retourne une erreur
        let a = document.getElementById("erreur_api")
        a.innerHTML = error.code+" : "+error.message
        a.style.color = "red";
    })

}, false)


// Si click sur bouton [Tester disponibilité email]
document.querySelector(".tester_compte").addEventListener("click", function(e){
    e.preventDefault()
    let email = document.querySelector("#inputEmail").value
    if ( email != "" ) {
        // On fait un usage détourné de cette fonction car il n'y a pas de fonction ayant pour paramètre uniquement l'email
        // C'est normal car cela peut causer un problème de sécurité en donnant à un utilisateur l'information
        // comme quoi l'email existe et donc qu'il n'y a plus qu'à chercher le password.
        // et qui retourne l'existance ou non de l'email.
        fetchSignInMethodsForEmail(auth, email)
        .then((valeur_retour) => { // Retourne la chaine 'password' si l'email existe, sinon retourne une chaine vide
            if ( valeur_retour != "" ) { // vaut 'password"
                let a = document.querySelector("#erreur_email")
                a.innerHTML = "L'email existe déjà"
                a.style.color = "red";
            } else {
                // Le user n. C'est que l'email existe
                let a = document.querySelector("#erreur_email")
                a.innerHTML = "Email DISPO"
                a.style.color = "green";
            }
        })
        .catch((error) => {
            // L'appel se plante, c'est que l'email n'existe pas donc qu'il est disponible
            let a = document.querySelector("#erreur_email")
            a.innerHTML = "Email DISPO"
            a.style.color = "green";
        })
    } else {
        let a = document.querySelector("#erreur_email")
        a.innerHTML = "Vous devez saisir quelque chose dans le champ email"
        a.style.color = "red";
    }
}, false)

document.querySelector(".password").addEventListener("click", function(e){
    e.preventDefault()
    let a = document.querySelector("#inputPassword")
    let etat = a.getAttribute('type')
    if ( etat == "password" ) {
        a.setAttribute('type', 'text')
    } else {
        a.setAttribute('type', 'password')
    }
}, false)