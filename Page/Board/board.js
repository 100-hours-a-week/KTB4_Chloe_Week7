import request from "../../API/request.js";

const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

const postList = document.querySelector('.post-list');

const sentinel = document.getElementById("sentinel");
const postLoading = document.getElementById("postLoading");
const postEmpty = document.getElementById("postEmpty");
const postError = document.getElementById("postError");

profileMenuBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('active');
});


let cursorId = null; //처음엔 null
const LIMIT = 7;

let isLoading = false;


const intersectionObserver = new IntersectionObserver( async function (entries) {
  entries.forEach(async (entry) => {
    if (!entry.isIntersecting) return;
    if (isLoading) return;

    try {
      isLoading = true;

      postLoading.hidden = false;
      postError.hidden = true;

      const result = await getlistPost();
      const posts = result.data
      if (posts.length > 0) {
        postEmpty.hidden = true;
        renderPostList(posts);
      }

    } catch (error) {
      console.error(error);
      postError.hidden = false;

    } finally {
      isLoading = false;
      postLoading.hidden = true;
    }
  })
});

intersectionObserver.observe(sentinel);

async function getlistPost() {

  // cursor가 있을 때만 파라미터에 포함
  // 최초 요청에는 cursor 값이 null이지만, 그 이후에 요청에 대해서는 cursor 값이 다 있음.
  const Params = new URLSearchParams({ limit: LIMIT });

  if (cursorId !== null) {
    Params.set("cursor", cursorId);
  }

  const result = await request(`/posts?${Params.toString()}`, 'GET');

  // 받아온 목록의 마지막 postId를 다음 cursor로 업데이트
  const posts = result.data;
  if (posts && posts.length > 0 && posts.length === LIMIT) {
    cursorId = posts[posts.length - 1].post_id;
  }
  else{
    intersectionObserver.unobserve(sentinel);
  }

  return result;
}

// 1,000 이상이면 1k, 10,000 이상이면 10k, 100,000 이상이면 100k 식으로 표기
function formatCount(count) {
  if (count >= 1000) {
    return `${parseFloat((count / 1000).toFixed(1))}k`;
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

    const postLink = document.createElement('a');
    postLink.href = `../Post_detail/post_detail.html?postId=${post.post_id}`;

    postLink.appendChild(postTop);
    postLink.appendChild(postMeta);
    postLink.appendChild(postDivider);
    postLink.appendChild(postAuthor);

    li.appendChild(postLink);

    postList.appendChild(li);
  });
}
