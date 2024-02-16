function ObtenirDonnees() {
    fetch('http://localhost:3000/publication')
        .then(response => response.json())
        .then(json => remplirListe(json))
        .catch(err => console.log(err));

}



function remplirListe(listPublication) {
    for (let i = 0; i < listPublication.length; i++) {

        let design = `<div class='col-12 col-lg-4'>
                            <a href='blogPage.html' class='card p-3 border-secondary border-5 rounded-4 hover-zoom mx-auto'>
                                <img src='blog.jpg' alt='blog image'/>
                                <div class='card-body'>
                                    <h5 class='card-title text-white'>${listPublication[i].titre}
                                    </h5>
                                    <p class='card-text'>${listPublication[i].contenu}
                                    </p>
                                </div>
                            </a>
                        </dvi>`;
                        
        document.getElementById("contenuPublication").innerHTML += design;
    }
}

ObtenirDonnees();


function AjouterPublication() {
    const confirmation = window.confirm("Voulez-vous vraiment ajouter cette publication ?");

    if (confirmation) {


        let titre = document.getElementById("titre").value;
        let auteur = document.getElementById("auteur").value;
        let contenu = document.getElementById("contenu").value;
        let id = generateID();
        let datePublication = new Date().toISOString().slice(0, 10);

        fetch("http://localhost:3000/publication", {
            method: "POST",
            body: JSON.stringify({
                id: id,
                titre: titre,
                auteur: auteur,
                contenu: contenu,
                datePublication: datePublication
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                window.location.href = "pageprincipale.html";
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la publication :', error);
            });
    }

}

function generateID() {
    return Math.floor(Math.random() * 9000) + 1000;
}

document.addEventListener("DOMContentLoaded", function () {

    const envoyerBtn = document.querySelector(".envoyer");

    envoyerBtn.addEventListener("click", function () {
        AjouterPublication();
    });
});
