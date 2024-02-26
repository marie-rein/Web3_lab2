let currentPage = 1; // Page courante par défaut
const cardsPerPage = 5; // Number of cards to show per page 
const dataContainer = document.getElementById('data-container'); 
const pagination = document.getElementById('pagination'); 
const prevButton = document.getElementById('prev'); 
const nextButton = document.getElementById('next'); 
const pageNumbers = document.getElementById('page-numbers'); 
const pageLinks = document.querySelectorAll('.page-link'); 
let totalPages = 0;

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



function remplirListe(listPublication) {

    const maxLength = 40;
    for (let i = 0; i < listPublication.length; i++) {
        let id = listPublication[i].id;
        let design = `<div class='col-12 col-lg-4'>
                            <a href='blogPage.html?id=${id}' class='card p-3 border-secondary border-5 rounded-4 hover-zoom mx-auto'>
                                <img src='photos/blog.jpg' alt='blog image'height="200" width="280"/>
                                <div class="card-body">
                                    <h5 class='card-title text-white'>${listPublication[i].titre}
                                    </h5>
                                    <p class='card-text'>${listPublication[i].contenu}
                                    </p>
                                </div>
                            </a>
                        </dvi>`;
        
                        
        document.getElementById("contenuPublication").innerHTML += design;

        //trimText(listPublication[i].contenu, maxLength);
        trimText(document.querySelectorAll(".card-text")[i], maxLength);
    }
}
function trimText(cardBody, maxLength) {
    if (cardBody.textContent.length > maxLength) {
        cardBody.textContent = cardBody.textContent.substring(0, maxLength) + '........';
    }
}
  
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



// Function to update pagination buttons and page numbers 

    function updatePagination() {
        const pageNumbers = document.getElementById('page-numbers');
        pageNumbers.textContent = `Page ${currentPage} of ${totalPages}`;
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

// Event listener for "Previous" button 
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePagination();
    }
});

// Event listener for "Next" button
document.getElementById('next').addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePagination();
    }
}); 

// Event listener for page number buttons 
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
// trimText();

//event onclick sur le card pour rediriger vers la page de blog
link.addEventListener('click', (e) => {
    
})






