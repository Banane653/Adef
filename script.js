document.addEventListener('DOMContentLoaded', () => {
    // Sélection des éléments
    const modal = document.getElementById('contact-modal');
    const openBtns = document.querySelectorAll('.open-modal');
    const closeBtn = document.querySelector('.close-btn');

    // Ouvrir la modale au clic sur n'importe quel bouton "open-modal"
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    });

    // Fermer la modale au clic sur la croix
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Fermer la modale si on clique en dehors de la boîte blanche
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});