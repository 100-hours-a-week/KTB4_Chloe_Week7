const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const helperTextEmail = document.getElementById('helperTextEmail');
const helperTextPassword = document.getElementById('helperTextPassword');

const loginButton = document.getElementById('loginBtn');

let isValidEmail = false;
let isValidPassword = false;



//유효성 검사
emailInput.addEventListener('input', function() {
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
  activeLoginButton();
});

passwordInput.addEventListener('input', function() {
  const password = passwordInput.value;
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
  activeLoginButton();
});

function activeLoginButton() {
  if (isValidEmail && isValidPassword) {
    loginButton.classList.add('active');
    loginButton.disabled = false;
  } else {
    loginButton.classList.remove('active');
    loginButton.disabled = true;
  }
}

async function login(user) {
  console.log(JSON.stringify(user));
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error('로그인 실패');
  }

  return response.json();
}

loginButton.addEventListener('click',async function(){
  const user = {
    email: emailInput.value,
    password: passwordInput.value
  };
   try {
    const data = await login(user);
    console.log(data);
    } catch (error) {
    console.error(error);
  }
});

