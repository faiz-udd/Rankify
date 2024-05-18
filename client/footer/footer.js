// Sample JavaScript to add interactive features like hover effects or click events.
document.querySelectorAll('#footer a').forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.color = 'blue'; // Change color on hover
    });

    link.addEventListener('mouseout', () => {
        link.style.color = 'black'; // Change back to original color
    });
});
