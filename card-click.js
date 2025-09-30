// Make entire blog post cards clickable
document.addEventListener('DOMContentLoaded', function() {
    // Select all blog post cards
    const cards = document.querySelectorAll('.card-ml, .card-genomics, .card-chemistry');
    
    cards.forEach(card => {
        // Find the main link in the card (h3 a)
        const link = card.querySelector('h3 a');
        
        if (link) {
            // Make entire card clickable
            card.addEventListener('click', function(e) {
                // Don't interfere if user is selecting text
                if (window.getSelection().toString()) {
                    return;
                }
                
                // Navigate to the article
                window.location.href = link.href;
            });
        }
    });
});
