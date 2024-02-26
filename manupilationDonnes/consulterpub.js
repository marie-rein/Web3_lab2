//recuperer id de la publication
const params = new URLSearchParams(window.location.search);
let id = params.get('id');

function remplirBloc(pub) {

    for (let i = 0; i < pub.length; i++) {
        if(id !== null && pub[i].id == id) {
            let titre = `<p class="title text-center">${pub[i].titre}</p>'`;
            let contenu = `<p>${pub[i].contenu}</p>`;
            let auteur = `<p>Fait par : ${pub[i].auteur} </br> Le : ${pub[i].datePublication}</p>`;
             
            document.querySelector(".contenu").innerHTML = contenu;
            document.getElementById("auteur").innerHTML = auteur;
            document.getElementById("contenu2").innerHTML = contenu;
            document.getElementById("contenu3").innerHTML = contenu;
            document.getElementById("titre").innerHTML = titre;
            break;
        }
        else{
            console.log("La publication n'existe pas");
        }
    }
    
}


//recuperer toutes les publications
function recupererToutesPublications() {
    fetch('http://localhost:3000/publication')
        .then(response => response.json())
        .then(json => remplirBloc(json))
        .catch(err => console.log(err)); 
  }
recupererToutesPublications();

//recuperer les commentaires de la publication

function remplirCommentaires(commentaires) {

    for (let i = 0; i < commentaires.length; i++) {
        if(id !== null && commentaires[i].idPublication == id) {
            let commentaire = `<p class="small mb-0">${commentaires[i].contenu}</p>`;
            let stringComment = `
                
                <div class="d-flex flex-start">
                <img class="rounded-circle shadow-1-strong me-3"
                    src="photos/iconcomment.png" alt="avatar" width="40"
                    height="40" />
                <div class="flex-grow-1 flex-shrink-1">
                    <div class="d-flex">
                 
                    <p class="small mb-0 align-items-end">
                    ${commentaires[i].contenu}  
                    </p>
                    </div>
                </div>   
                </div>
               
                `;
            document.getElementById("lescommentaires").innerHTML += stringComment;
            
        }
    }

}
function recupererTousCommentaires() {
    fetch('http://localhost:3000/commentaire')
        .then(response => response.json())
        .then(json => remplirCommentaires(json))
        .catch(err => console.log(err));
}



function generateID() {
    return Math.floor(Math.random() * 9000) + 11;
}
function AjouterCommentaire() {
    let userComment = document.getElementById("commentaireUser").value;
    let dateComment = new Date().toISOString().slice(0, 10);
    let idComment = generateID();
    let imgUrl = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp";

    let stringComment = `
                
    <div class="d-flex flex-start">
    <img class="rounded-circle shadow-1-strong me-3"
        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width="50"
        height="50" />
    <div class="flex-grow-1 flex-shrink-1">
        <div class="d-flex">
     
        <p class="small mb-0 align-items-end">
        ${userComment}  
        </p>
        </div>
    </div>   
    </div>
   
    `;
 
      
    document.getElementById("lescommentaires").innerHTML += stringComment;
  
    
    

    // document.getElementById("commentaireUser").value = "";
   

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
        AjouterCommentaire();
    })
})

recupererTousCommentaires();
// AjouterCommentaire();



