function AjouterPublication() {


        let titre = document.getElementById("titre").value;
        let auteur = document.getElementById("auteur").value;
        let contenu = document.getElementById("contenu").value;
        let id = generateID().toString();
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
                window.location.href = "../Pages/pageprincipale.html";
            })
            .catch(error => {
                console.error('Erreur lors de l\'ajout de la publication :', error);
            });
    }



function generateID() {
    return Math.floor(Math.random() * 9000) + 1;
}

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
                "Ajouter la publication": function() {                  
                    AjouterPublication();
                    $( this ).dialog( "close" );
                },
                Cancel: function() {
                    $( this ).dialog( "close" );
                }
            }  
        });
    });
});
