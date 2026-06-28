const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

const profilePreview = document.getElementById('profileImgPreview');
const profileInput = document.getElementById('profileImgInput');

const nicknameInput = document.getElementById('nickname');
const helperTextNickname = document.getElementById('nicknameHelper');
const helperTextProfile = document.getElementById('profileHelper');

const submitBtn = document.getElementById('submitBtn');


const withdrawmodal = document.querySelector('.withdraw_modal');
const withdrawBtn = document.getElementById('withdrawBtn');
const withdrawCancelBtn = document.getElementById('withdrawCancel');

let isValidNickname = false;
let isValidProfile = false;

profileMenuBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('active');
});

//프로필 사진 
profileInput.addEventListener('change', function () {
  const file = profileInput.files[0];

  if (!file) {
    helperTextProfile.classList.add('error');
    helperTextProfile.textContent = '프로필 사진을 추가해주세요.';
    profilePreview.src = '';
    profilePreview.style.display = 'none';
    isValidProfile = false;
    return;
  }

  const imageSrc = URL.createObjectURL(file);
  
  profilePreview.src = imageSrc;
  profilePreview.style.display = 'block';

  helperTextProfile.classList.remove('error');
  helperTextProfile.textContent = '';

  isValidProfile = true;

});



submitBtn.addEventListener('click', function() {
  const nickname = nicknameInput.value;

  if (nickname.length > 11) {
    helperTextNickname.classList.add('error');
    helperTextNickname.textContent = '닉네임은 최대 10자 까지 작성 가능합니다.';
    isValidNickname = false;
  } else if (/\s/.test(nickname)) {
    helperTextNickname.classList.add("error");
    helperTextNickname.textContent = "띄어쓰기를 없애주세요.";
    isValidNickname = false;
  } else if (!nickname) {
    helperTextNickname.classList.add("error");
    helperTextNickname.textContent = "닉네임을 입력해주세요.";
    isValidNickname = false;
  } else {
    helperTextNickname.classList.remove("error");
    helperTextNickname.textContent = "";
    isValidNickname = true;
    }
});

//회원 탈퇴 -> 모달창 띄우기
withdrawBtn.addEventListener('click', function() {
  withdrawmodal.classList.add('active');
});

withdrawCancelBtn.addEventListener('click', function() {
  withdrawmodal.classList.remove('active');
});