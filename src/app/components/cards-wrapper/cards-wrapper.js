document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.add('card--flipped');
        setTimeout(() => {
            card.classList.remove('card--flipped');
        }, 1000); // Flip back after 1 second
    });
}); 

