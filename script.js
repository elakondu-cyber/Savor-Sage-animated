// Interactive Category Filter Logic
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('#menu-grid .card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Remove active class from all buttons and apply to clicked button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // 2. Get selected filter value
      const filterValue = button.getAttribute('data-filter');

      // 3. Show or hide items based on category
      menuCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
});