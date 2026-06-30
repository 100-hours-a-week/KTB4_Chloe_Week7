const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

const postList = document.querySelector('.post-list');

const userId = sessionStorage.getItem("userId");

profileMenuBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('active');
});

const Params = new URLSearchParams([
  ["cursor", 1],
  ["limit", 10]
]);

async function getlistPost(){
  const response = await fetch(`http://localhost:8080/posts/${userId}?${Params.toString()}`, {
    method: 'GET'
  });

  if (!response.ok) {
      throw new Error('게시글 목록 조회 실패');
    }

    return response.json();
}

// 1,000 이상이면 1k, 10,000 이상이면 10k, 100,000 이상이면 100k 식으로 표기
function formatCount(count) {
  if (count >= 100000) {
    return `${Math.floor(count / 1000)}k`;
  }
  if (count >= 10000) {
    return `${Math.floor(count / 1000)}k`;
  }
  if (count >= 1000) {
    return `${Math.floor(count / 1000)}k`;
  }
  return `${count}`;
}

// yyyy-mm-dd hh:mm:ss 형식으로 변환
function formatDateTime(dateInput) {
  const date = new Date(dateInput);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}

function renderPostList(posts) {
  postList.innerHTML = '';

  posts.forEach((post) => {
    const li = document.createElement('li');
    li.className = 'post-card';

    const postTop = document.createElement('div');
    postTop.className = 'post-top';

    const postTitle = document.createElement('h2');
    postTitle.className = 'post-title';
    postTitle.setAttribute('max-length', '26');
    postTitle.textContent = post.title;

    postTop.appendChild(postTitle);

    const postMeta = document.createElement('div');
    postMeta.className = 'post-meta';

    const metaStats = document.createElement('span');
    metaStats.className = 'meta-stats';
    metaStats.textContent = `좋아요 ${formatCount(post.like_count)}   댓글 ${formatCount(post.comment_count)}   조회수 ${formatCount(post.view_count)}`;

    const metaDate = document.createElement('span');
    metaDate.className = 'meta-date';
    metaDate.textContent = formatDateTime(post.datewritten);

    postMeta.appendChild(metaStats);
    postMeta.appendChild(metaDate);

    const postDivider = document.createElement('div');
    postDivider.className = 'post-divider';

    const postAuthor = document.createElement('div');
    postAuthor.className = 'post-author';

    const authorAvatar = document.createElement('div');
    authorAvatar.className = 'author-avatar';

    const authorName = document.createElement('span');
    authorName.className = 'author-name';
    authorName.textContent = post.writer;

    postAuthor.appendChild(authorAvatar);
    postAuthor.appendChild(authorName);

    li.appendChild(postTop);
    li.appendChild(postMeta);
    li.appendChild(postDivider);
    li.appendChild(postAuthor);

    postList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', async function() {
  const result = await getlistPost();
  renderPostList(result.data);
});