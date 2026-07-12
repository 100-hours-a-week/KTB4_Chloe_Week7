import request from "../../API/request.js";

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('passwordConfirm');
const nicknameInput = document.getElementById('nickname');

const helperTextEmail = document.getElementById('emailHelper');
const helperTextPassword = document.getElementById('passwordHelper');
const helperTextConfirmPassword = document.getElementById('passwordConfirmHelper');
const helperTextNickname = document.getElementById('nicknameHelper');

const signupButton = document.getElementById('submitBtn');

const profilePreview = document.getElementById('profilePreview');
const profileInput = document.getElementById('profileInput');
const profilePlus = document.getElementById('profilePlus');
const helperTextProfile = document.getElementById('profileHelper');

let isValidEmail = false;
let isValidPassword = false;
let isValidConfirmPassword = false;
let isValidNickname = false;
let isValidProfile = false;


function setProfileInvalid() {
  helperTextProfile.classList.add('error');
  helperTextProfile.textContent = '프로필 사진을 추가해주세요.';
  profilePreview.src = '';
  profilePreview.style.display = 'none';
  profilePlus.style.display = 'block';
  isValidProfile = false;
}

// 페이지 로드 시 최초 상태로 미리 세팅
setProfileInvalid();

//프로필 사진 
profileInput.addEventListener('change', function () {
  const file = profileInput.files[0];

  if (!file) {
    helperTextProfile.classList.add('error');
    helperTextProfile.textContent = '프로필 사진을 추가해주세요.';
    profilePreview.src = '';
    profilePreview.style.display = 'none';
    profilePlus.style.display = 'block';
    isValidProfile = false;
    return;
  }

  const imageSrc = URL.createObjectURL(file);
  
  profilePreview.src = imageSrc;
  profilePreview.style.display = 'block';
  profilePlus.style.display = 'none';

  helperTextProfile.classList.remove('error');
  helperTextProfile.textContent = '';

  isValidProfile = true;
  activeSignupButton();

});



//유효성 검사
emailInput.addEventListener('blur', function() {
  const email = emailInput.value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    helperTextEmail.classList.add('error');
    helperTextEmail.textContent = '유효한 이메일 주소를 입력해주세요.';
    isValidEmail = false;
  } else {
    helperTextEmail.classList.remove('error');
    helperTextEmail.textContent = '';
    isValidEmail = true;
  }
  activeSignupButton();
});

passwordInput.addEventListener('blur', function() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/'])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/']{8,20}$/;


  if (!passwordRegex.test(password)) {
    helperTextPassword.classList.add('error');
    helperTextPassword.textContent = '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
    isValidPassword = false;
  } else {
    helperTextPassword.classList.remove('error');
    helperTextPassword.textContent = '';
    isValidPassword = true;
  }

    if (password !== confirmPassword) {
    helperTextConfirmPassword.classList.add('error');
    helperTextConfirmPassword.textContent = '비밀번호가 일치하지 않습니다.';
    isValidConfirmPassword = false;
  } else {
    helperTextConfirmPassword.classList.remove('error');
    helperTextConfirmPassword.textContent = '';
    isValidConfirmPassword = true;
  }

  activeSignupButton();
});

confirmPasswordInput.addEventListener('blur', function() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/'])[A-Za-z\d!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/']{8,20}$/;

  //정규식 검사 
  if (!passwordRegex.test(confirmPassword)) {
    helperTextConfirmPassword.classList.add('error');
    helperTextConfirmPassword.textContent = '비밀번호는 8자 이상, 20자 이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
    isValidConfirmPassword = false;
  } else {
    helperTextConfirmPassword.classList.remove('error');
    helperTextConfirmPassword.textContent = '';
    isValidConfirmPassword = true;
  }

  //비밀번호 일치 검사 
  if (confirmPassword !== password) {
    helperTextConfirmPassword.classList.add('error');
    helperTextConfirmPassword.textContent = '비밀번호가 일치하지 않습니다.';
    isValidConfirmPassword = false;
  } else {
    helperTextConfirmPassword.classList.remove('error');
    helperTextConfirmPassword.textContent = '';
    isValidConfirmPassword = true;
  }
  activeSignupButton();
});

nicknameInput.addEventListener('blur', function() {
  const nickname = nicknameInput.value;

  if (nickname.length >10) {
    helperTextNickname.classList.add('error');
    helperTextNickname.textContent = '닉네임은 최대 10자 까지 작성 가능합니다.';
    isValidNickname = false;
  } else if (/\s/.test(nickname)) {
    helperTextNickname.classList.add("error");
    helperTextNickname.textContent = "띄어쓰기를 없애주세요.";
    isValidNickname = false;
  } else if(!nickname){
    helperTextNickname.classList.add("error");
    helperTextNickname.textContent = "낙네임을 입력해주세요";
    isValidNickname = false;
  }
    else {
    helperTextNickname.classList.remove("error");
    helperTextNickname.textContent = "";
    isValidNickname = true;
  }
  activeSignupButton();
});

function activeSignupButton() {
  if (isValidEmail && isValidPassword && isValidConfirmPassword && isValidNickname && isValidProfile) {
    signupButton.classList.add('active');
    signupButton.disabled = false;
  } else {
    signupButton.classList.remove('active');
    signupButton.disabled = true;
  }
}



async function signUp(signUp_user) {
  return await request('/users/signup', 'POST', signUp_user);
}

signupButton.addEventListener('click', async function () {
  const formData = new FormData();

  formData.append("email", emailInput.value);
  formData.append("password", passwordInput.value);
  formData.append("nickname", nicknameInput.value);
  formData.append("profile_image", profileInput.files[0]);

  try {
    const result = await signUp(formData);
    console.log(result.data.link);
    window.location.href = result.data.link;

  } catch (error) {
    if (error.status === 409) {
      if (error.field === 'email') {
        helperTextEmail.classList.add('error');
        helperTextEmail.textContent = "중복된 이메일 입니다.";
        isValidEmail = false;
      }

      if (error.field === 'nickname') {
        helperTextNickname.classList.add('error');
        helperTextNickname.textContent = "중복된 닉네임 입니다.";
        isValidNickname = false;
      }

      activeSignupButton();

    } else {
      console.error(error);
    }
  }
});
