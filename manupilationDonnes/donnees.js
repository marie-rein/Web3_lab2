let currentPage = 1; // Page courante par défaut
const cardsPerPage = 5; // Number of cards to show per page 
const dataContainer = document.getElementById('data-container'); 
const pagination = document.getElementById('pagination'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const pageNumbers = document.getElementById('page-numbers'); 
const pageLinks = document.querySelectorAll('.page-link'); 
let totalPages = 0;

//recupere toutes les publications
function ObtenirDonnees() {
    fetch('http://localhost:3000/publication')
        .then(response => response.json())
        .then(json => {
            totalPages = Math.ceil(json.length / cardsPerPage);
            remplirListe(json);
            displayPage(currentPage);
            updatePagination();
        })
        .catch(err => console.log(err));
}


//rempli la page avec les données de la bd
function remplirListe(listPublication) {

    const maxLength = 40;
    for (let i = 0; i < listPublication.length; i++) {
        let id = listPublication[i].id;
        let design = `<div class='col-12 col-lg-4'>
                            <a href='blogPage.html?id=${id}' class='card p-3 border-secondary border-5 rounded-4 hover-zoom mx-auto'>
                                <img src='../photos/blog.jpg' alt='blog image'height="200" width="280"/>
                                <div class="card-body">
                                    <h5 class='card-title text-white'>${listPublication[i].titre}
                                    </h5>
                                    <p class='card-text'>${listPublication[i].contenu}
                                    </p>
                                </div>
                            </a>
                        </dvi>`;
        
                        
        document.getElementById("contenuPublication").innerHTML += design;
        trimText(document.querySelectorAll(".card-text")[i], maxLength);
    }
}

//diminue le contenu du card pour ne pas afficher tous le contenu et remplace le reste par .....
function trimText(cardBody, maxLength) {
    if (cardBody.textContent.length > maxLength) {
        cardBody.textContent = cardBody.textContent.substring(0, maxLength) + '........';
    }
}
  

//affiche les cards par page
function displayPage(page) {
    const cards = document.querySelectorAll('.col-12.col-lg-4');
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;

    for (let i = 0; i < cards.length; i++) {
        if (i >= startIndex && i < endIndex) {
            cards[i].style.display = 'block'; // Afficher la carte
        } else {
            cards[i].style.display = 'none'; // Masquer la carte
        }
    }
}



// update les bouttons de la pagination et les chiffres

    function updatePagination() {
        const pageNumbers = document.getElementById('page-numbers');
        pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

// Event pour le boutton previous
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePagination();
    }
});

// Event pour le boutton next
document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePagination();
    }
}); 

// Event pour les chiffres 
pageLinks.forEach((link) => { 
    link.addEventListener('click', (e) => { 
        e.preventDefault(); 
        const page = parseInt(link.getAttribute('data-page')); 
        console.log('Page sélectionnée :', page); // Vérifier la valeur de la page sélectionnée
        if (page !== currentPage) { 
            currentPage = page; 
            displayPage(currentPage); 
            updatePagination(); 
        } else {
            console.log('Déjà sur la page sélectionnée'); // Vérifier si le changement de page est effectué
        }
    }); 
});

ObtenirDonnees();








