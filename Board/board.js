const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

profileMenuBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('active');
});