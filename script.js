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

const form = document.getElementById("lead-form");
const status = document.getElementById("form-status");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // 1. État de chargement immédiat
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Envoi en cours...";
    submitBtn.disabled = true; // Empêche le double clic
    submitBtn.style.opacity = "0.7";

    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // 2. Succès : On cache le formulaire et on montre le statut
            form.style.display = "none";
            status.style.display = "block";
            
            // 3. On laisse le message affiché plus longtemps (5 secondes)
            setTimeout(() => {
                // On réinitialise pour la prochaine fois
                document.getElementById('contact-modal').style.display = 'none';
                
                // Optionnel : remettre le formulaire à zéro après la fermeture
                setTimeout(() => {
                    form.reset();
                    form.style.display = "block";
                    status.style.display = "none";
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = "1";
                }, 500);
            }, 5000); 

        } else {
            throw new Error();
        }
    } catch (error) {
        alert("Oups ! Une erreur est survenue. Vérifiez votre connexion.");
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
    }
});