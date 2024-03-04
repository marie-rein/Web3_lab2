//recuperer id de la publication
const params = new URLSearchParams(window.location.search);
let id = params.get('id');

//recuperer toutes les publications
function recupererToutesPublications(id) {
    fetch('http://localhost:3000/publication/' + id) // Ajoutez l'ID à l'URL pour récupérer la publication spécifique
        .then(response => response.json())
        .then(json => remplirBloc(json))
        .catch(err => console.log(err));
}

//remplir les contenus aux bons endroits
function remplirBloc(pub) {
    console.log(id);
    console.log(pub.id);
    if (pub.id === id) {
        let titre = `<p class="title text-center">${pub.titre}</p>`;
        let contenu = `<p>${pub.contenu}</p>`;
        let auteur = `<p>Fait par : ${pub.auteur} </br> Le : ${pub.datePublication}</p>`;
        document.querySelector(".contenu").innerHTML = contenu;
        document.getElementById("auteur").innerHTML = auteur;
        document.getElementById("contenu2").innerHTML = contenu;
        document.getElementById("contenu3").innerHTML = contenu;
        document.getElementById("titre").innerHTML = titre;
    } else {
        console.log("La publication n'existe pas");
    }
}


//genere un string du div commentaire par ce que je l'utilise plusieurs endroits comme afficher et ajouter un nouveau commentaire
function genererStringComment(contenu) {
    return `
        <div class="d-flex flex-start">
            <img class="rounded-circle shadow-1-strong me-3"
                src="../photos/iconcomment.png" alt="avatar" width="40"
                height="40" />
            <div class="flex-grow-1 flex-shrink-1">
                <div class="d-flex">
                    <p class="small mb-0 align-items-end">
                        ${contenu}
                    </p>
                </div>
            </div>   
        </div>
    `;
}


recupererToutesPublications(id);  // recupere les données de la publication avec l'id


//remplis les commentaires d'une publication
function remplirCommentaires(commentaires) {
    commentaires.forEach(commentaire => {
        if (id !== null && commentaire.idPublication == id) {
            let stringComment = genererStringComment(commentaire.contenu);
            document.getElementById("lescommentaires").innerHTML += stringComment;
        }
    });
}


//recupere tous les commentaires du bd
function recupererTousCommentaires() {
    fetch('http://localhost:3000/commentaire?idPublication=' + id)
        .then(response => response.json())
        .then(json => remplirCommentaires(json))
        .catch(err => console.log(err));
}


//genere un id
function generateID() {
    return Math.floor(Math.random() * 9000) + 11;
}

//ajouter un nouveau commentaire
function AjouterCommentaire() {
    let userComment = document.getElementById("commentaireUser").value;
    let dateComment = new Date().toISOString().slice(0, 10);
    let idComment = generateID();
    let imgUrl = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp";

    let stringComment = genererStringComment(userComment); 
    document.getElementById("lescommentaires").innerHTML += stringComment;
   

    fetch("http://localhost:3000/commentaire", {
        method: "POST",
        body: JSON.stringify({
            id: idComment,
            contenu: userComment,
            datePublication: dateComment,
            idPublication: id
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .catch(error => console.error('Erreur lors de l\'ajout du commentaire :', error));
}

//domContentLoaded
document.addEventListener("DOMContentLoaded", function () {

    const envoyerBtn = document.querySelector(".envoyer");

    envoyerBtn.addEventListener("click", function () {
        $("#dialog-confirm-text").show();
        $( "#dialog-confirm" ).dialog({
            resizable: false,
            height: "auto",
            width: 400,
            modal: true,
            buttons: {
                "Ajouter le commentaire": function() {                  
                    AjouterCommentaire();
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            }  
        });
    });
});


recupererTousCommentaires();