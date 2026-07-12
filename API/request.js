// api/request.js

const BASE_URL = 'http://localhost:8080';

// Authorization 헤더가 필요 없는 엔드포인트
const NO_AUTH_PATHS = ['/auth/login', '/users/signup'];

function needsAuth(path) {
  return !NO_AUTH_PATHS.some((noAuthPath) => path.startsWith(noAuthPath));
}

/**
 * 공통 요청 함수
 * @param {string} path - 엔드포인트 (예: '/posts/1')
 * @param {string} method - 'GET' | 'POST' | 'PATCH' | 'DELETE' 등
 * @param {object|FormData|null} data - GET, DELETE는 보통 null
 */
async function request(path, method, data = null) {
  const isFormData = data instanceof FormData;

  const headers = {
    ...(needsAuth(path) && {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    }),
    ...(!isFormData && data !== null && { 'Content-Type': 'application/json' }),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(data !== null && { body: isFormData ? data : JSON.stringify(data) }),
  });

  return handleResponse(response);
}

async function handleResponse(response) {
  const { status } = response;

  // 성공
  if (status === 200 || status === 201) {
    return response.json();
  }
  if (status === 204) {
    return null;
  }

  // 실패 - 에러 body 파싱 (message, status, field)
  const errorBody = await response.json().catch(() => ({}));
  const { message, field } = errorBody;

  switch (status) {
    case 401:
      alert(message ?? '로그인이 필요합니다.');
      //window.location.href = '/login.html';
      break;
    case 403:
      console.error('인가 실패:', message);
      break;
    case 404:
      console.error('리소스를 찾을 수 없습니다:', message);
      break;
    case 409:
      console.error(`중복된 값 (${field}):`, message);
      break;
    case 400:
      console.error('잘못된 요청:', message);
      break;
    case 500:
      console.error('서버 에러:', message);
      break;
    default:
      console.error('알 수 없는 에러:', message);
  }

  const error = new Error(message ?? '요청 처리 중 오류가 발생했습니다.');
  error.status = status;
  error.field = field ?? null;
  throw error;
}

export default request;
