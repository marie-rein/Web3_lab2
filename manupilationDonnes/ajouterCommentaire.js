//focntion qui va generer mes ids a partir de 11 car j'ai deja fait 10 commentaires

let id = 10;

function generateID() {
    id++;
    return id;
}

//recuperer l'id de la publication dans le url
const urlParams = new URLSearchParams(window.location.search);
const idPub = urlParams.get('id');

//fonction pour ajouter un commentaire
function AjouterCommentaire() {

    let contenus = document.getElementById("contenu").value;
    let datePublications = new Date().toISOString().slice(0, 10);
    let idPublications = idPub;
    let id = generateID();

    fetch("http://localhost:3000/commentaire", {
        method: "POST",
        body: JSON.stringify({
            id: id,
            contenu: contenus,
            datePublication: datePublications,
            idPublication: idPublications
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .catch(error => console.error('Erreur lors de l\'ajout du commentaire :', error));
}    


