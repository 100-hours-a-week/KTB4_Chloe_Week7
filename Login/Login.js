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

async function login(login_user) {
  console.log(JSON.stringify(login_user));
  const response = await fetch('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(login_user),
  });

  if (!(response.status === 200)) {
    throw new Error('로그인 실패');
  }

  return response.json();
}

loginButton.addEventListener('click', async function () {
  const login_user = {
    email: emailInput.value,
    password: passwordInput.value
  };

  try {
    const response = await login(login_user);
    sessionStorage.setItem('userId', response.data.user_id);

    //로그인 성공하면 백에서 보내온 게시글 목록 링크로 바로 이동
    window.location.href = response.data.link;

  } catch (error) {
    console.error(error);
  }
});



