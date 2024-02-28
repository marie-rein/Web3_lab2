document.addEventListener("DOMContentLoaded", function() {
   
    const navbarContainer = document.getElementById("navbar-container");
    if (navbarContainer) {
        fetch("../navFooterHtml/navbar.html")
            .then(response => response.text())
            .then(html => navbarContainer.innerHTML = html)
            .catch(error => console.error('Error loading navbar:', error));
    }

    
    const footerContainer = document.getElementById("footer-container");
    if (footerContainer) {
        fetch("../navFooterHtml/footer.html")
            .then(response => response.text())
            .then(html => footerContainer.innerHTML = html)
            .catch(error => console.error('Error loading footer:', error));
    }
});
