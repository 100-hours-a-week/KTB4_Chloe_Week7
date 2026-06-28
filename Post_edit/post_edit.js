const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

const titleInput = document.getElementById('postTitle');
const titleCount = document.getElementById('titleCount');

const postContentInput = document.getElementById('postContent');

const postImageInput = document.getElementById('postImage');
const fileNameDisplay = document.getElementById('fileName');

const editCompleteBtn = document.getElementById('submitBtn');

profileMenuBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('active');
});


titleInput.addEventListener('input', () => {

  titleCount.textContent = `${titleInput.value.length}/26`;
  activeEditCompleteButton();
});

postContentInput.addEventListener('input', () => {
    activeEditCompleteButton();
});

postImageInput.addEventListener('change', () => {
  const file = postImageInput.files[0];
  if (file) {
    fileNameDisplay.textContent = file.name;
  } else {
    fileNameDisplay.textContent = '파일을 선택해주세요.';
  }

  const fileSrc = URL.createObjectURL(file);
});

function activeEditCompleteButton() {
  const isValidTitle = titleInput.value !== '';
  const isValidContent = postContentInput.value !== '';

  if (isValidTitle && isValidContent) {
    editCompleteBtn.classList.add('active');
    editCompleteBtn.disabled = false;
  } else {
    editCompleteBtn.classList.remove('active');
    editCompleteBtn.disabled = true;
  }
} 