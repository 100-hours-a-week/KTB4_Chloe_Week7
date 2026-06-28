const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

const titleInput = document.getElementById('postTitle');
const titleCount = document.getElementById('titleCount');

const postContentInput = document.getElementById('postContent');

const postImageInput = document.getElementById('postImage');
const fileNameDisplay = document.getElementById('fileName');

const writeCompleteBtn = document.getElementById('submitBtn');

let isValidTitle = false;
let isValidContent = false;

profileMenuBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('active');
});


titleInput.addEventListener('input', () => {
  if(titleInput.value){
    isValidTitle = true;
  } else {
    isValidTitle = false;
  }
  titleCount.textContent = `${titleInput.value.length}/26`;
  activeWriteCompleteButton();
});

postContentInput.addEventListener('input', () => {
    if(postContentInput.value){
        isValidContent = true;
    } else {
        isValidContent = false;
    }
    activeWriteCompleteButton();
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

function activeWriteCompleteButton() {
  if (isValidTitle && isValidContent) {
    writeCompleteBtn.classList.add('active');
  } else {
    writeCompleteBtn.classList.remove('active');
  }
}



writeCompleteBtn.addEventListener('click', () => {
  const title = titleInput.value;
  const content = postContentInput.value;

  if (!title || !content) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }
});

  