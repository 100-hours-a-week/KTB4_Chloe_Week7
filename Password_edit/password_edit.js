const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('passwordConfirm');

const helperTextPassword = document.getElementById('passwordHelper');
const helperTextConfirmPassword = document.getElementById('passwordConfirmHelper');

const editPasswordBtn = document.getElementById('submitBtn');

let isValidPassword = false;
let isValidConfirmPassword = false;

profileMenuBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('active');
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

function activeSignupButton() {
  if (isValidPassword && isValidConfirmPassword) {
    editPasswordBtn.classList.add('active');
  } else {
    editPasswordBtn.classList.remove('active');
  }
}


