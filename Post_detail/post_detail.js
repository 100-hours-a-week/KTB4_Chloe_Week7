const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

const postTitle = document.querySelector('.post-title');
const authorAvatar = document.querySelector('.author-avatar');
const authorName = document.querySelector('.author-name');
const postDate = document.querySelector('.post-date');
const postImagePlaceholder = document.querySelector('.post-image-placeholder');
const postBody = document.querySelector('.post-body');

const viewCount = document.querySelectorAll('.stat-num')[1];
const commentCount = document.querySelectorAll('.stat-num')[2];

const postDeleteModal = document.querySelector('.post_delete_modal');
const postDeleteBtn = document.getElementById('postDeleteBtn');
const postDeleteConfirmBtn = document.getElementById('postDeleteConfirm');
const postDeleteCancelBtn = document.getElementById('postDeleteCancel');

const commentDeleteModal = document.querySelector('.comment_delete_modal');
const commentDeleteBtn = document.querySelector('.btn-action.btn-delete-comment');
const commentDeleteConfirmBtn = document.getElementById('commentDeleteConfirm');
const commentDeleteCancelBtn = document.getElementById('commentDeleteCancel');

const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');

const commentList = document.getElementById('commentList');
const commentInput = document.getElementById('commentTextarea');
const commentSubmitBtn = document.getElementById('commentSubmitBtn');

const commentEditBtn = document.querySelector('.btn-action.btn-edit-comment');
const commentContent = document.querySelector('.comment-body');

let isEditing = false;

profileMenuBtn.addEventListener('click', function() {
  dropdownMenu.classList.toggle('active');
});


//게시글 삭제 모달 
postDeleteBtn.addEventListener('click', function() {
  postDeleteModal.classList.add('active');
  document.body.classList.add('modal-open');
});

postDeleteCancelBtn.addEventListener('click', function() {
  postDeleteModal.classList.remove('active');
  document.body.classList.remove('modal-open');
});




likeBtn.addEventListener('click', function() {
  if (likeBtn.classList.contains('liked')) {
    likeBtn.classList.remove('liked');
    likeCount.textContent = parseInt(likeCount.textContent) - 1;
  } else {
    likeBtn.classList.add('liked');
    likeCount.textContent = parseInt(likeCount.textContent) + 1;
  }
});

commentInput.addEventListener('input', function() {
  const commentText = commentInput.value;
  if(commentText){
    commentSubmitBtn.classList.add('active');
    commentSubmitBtn.disabled = false;
  } else {
    commentSubmitBtn.classList.remove('active');
    commentSubmitBtn.disabled = true; 
  }
});





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

const params = new URLSearchParams(document.location.search);
const postId = params.get('postId');

const userId = sessionStorage.getItem("userId");

//게시글 상세 조회 API 연동
async function getDetailPost(postId){
  const reponse = await fetch(`http://localhost:8080/posts/${userId}/${postId}`, {
    method: 'GET'
  });

  if(!reponse.ok){
    throw new Error('게시글 상세 조회 실패');
  }

  return reponse.json();
}

document.addEventListener('DOMContentLoaded', async function () {
  const result = await getDetailPost(postId);

  postTitle.textContent = result.data.post.title;
  //authorAvatar.src = `http://localhost:8080${result.data.profileImage}`;
  authorName.textContent = result.data.post.writer;
  postDate.textContent = formatDateTime(result.data.post.datewritten);
  postBody.textContent = result.data.post.content;

  if (result.data.post.post_image) {
    postImagePlaceholder.src = `http://localhost:8080${result.data.post.post_image}`;
    postImagePlaceholder.style.display = 'block';
  } else {
    postImagePlaceholder.style.display = 'none';
  }

  viewCount.textContent = formatCount(result.data.post.view_count);
  commentCount.textContent = formatCount(result.data.post.comment_count);
  likeCount.textContent = formatCount(result.data.post.like_count);

  result.data.comments.forEach((comment) => {
    commentList.appendChild(createCommentElement(comment));
  });

});

//게시글 삭제 API 연동
async function deletePost(postId){
  const response = await fetch(`http://localhost:8080/posts/${userId}/${postId}`, {
    method: 'DELETE'
  });

  if(!response.ok){
    throw new Error('게시글 삭제 실패');
  }
}

postDeleteConfirmBtn.addEventListener('click', async function(){
  try{
   await deletePost(postId);
    window.location.href = "../Board/board.html";
  } catch (error) {
    console.error(error);
  }
});

//댓글 생성 API 연동
async function createComment(comment_data){
    const response = await fetch(`http://localhost:8080/posts/${userId}/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment_data),
    });
  
    if (!response.ok) {
      throw new Error('댓글 작성 실패');
    }
  
    return response.json();
}


function createCommentElement(comment) {
  const li = document.createElement('li');
  li.className = 'comment-item';

  const commentHeader = document.createElement('div');
  commentHeader.className = 'comment-header';

  const commentAuthorWrap = document.createElement('div');
  commentAuthorWrap.className = 'comment-author-wrap';

  const commentAvatar = document.createElement('div');
  commentAvatar.className = 'author-avatar';

  const commentAuthor = document.createElement('span');
  commentAuthor.className = 'comment-author';
  commentAuthor.textContent = comment.commenter;

  const commentDate = document.createElement('span');
  commentDate.className = 'comment-date';
  commentDate.textContent = formatDateTime(comment.commentDateWritten);

  commentAuthorWrap.appendChild(commentAvatar);
  commentAuthorWrap.appendChild(commentAuthor);
  commentAuthorWrap.appendChild(commentDate);

  const commentActions = document.createElement('div');
  commentActions.className = 'comment-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'btn-action btn-edit-comment';
  editBtn.textContent = '수정';
  editBtn.dataset.commentId = comment.commentId;


  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn-action btn-delete-comment';
  deleteBtn.textContent = '삭제';
  deleteBtn.dataset.commentId = comment.commentId;

  commentActions.appendChild(editBtn);
  commentActions.appendChild(deleteBtn);

  commentHeader.appendChild(commentAuthorWrap);
  commentHeader.appendChild(commentActions);

  const commentBody = document.createElement('p');
  commentBody.className = 'comment-body';
  commentBody.textContent = comment.commentContent;

  li.appendChild(commentHeader);
  li.appendChild(commentBody);

  return li;
}

//댓글 수정 API 연동
async function editComment(commentId,comment_data){

  const response = await fetch(`http://localhost:8080/posts/${userId}/${postId}/comment/${commentId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment_data),
  });

  if (!response.ok) {
    throw new Error('댓글 수정 실패');
  }

  return response.json();
}

//댓글 삭제 API 연동
async function deleteComment(commentId){
  const response = await fetch(`http://localhost:8080/posts/${userId}/${postId}/comment/${commentId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('댓글 삭제 실패');
  }
} 

//댓글 삭제 모달
commentDeleteCancelBtn.addEventListener('click', function() {
  commentDeleteModal.classList.remove('active'); 
  document.body.classList.remove('modal-open');
}); 


let currentEditCommentId = null;

//각 댓글 당 수정&삭제 버튼 등록..
commentList.addEventListener('click', async function(e) {

  const editBtn = e.target.closest('.btn-edit-comment');
  const deleteBtn = e.target.closest('.btn-delete-comment');

  if (editBtn) {
    const commentId = editBtn.dataset.commentId;
    const commentBody = editBtn.closest('.comment-item').querySelector('.comment-body'); // 댓글 내용

    commentInput.value = commentBody.textContent;
    commentSubmitBtn.textContent = '댓글 수정';
    commentSubmitBtn.classList.add('active');
    commentSubmitBtn.disabled = false;
    isEditing = true;

    currentEditCommentId = editBtn.dataset.commentId;
  }

  if(deleteBtn) {
    const commentId = deleteBtn.dataset.commentId;
    commentDeleteModal.classList.add('active');
    document.body.classList.add('modal-open');

    commentDeleteConfirmBtn.addEventListener('click', async function () {
      await deleteComment(commentId);
      const commentItem = deleteBtn.closest('.comment-item');
      if (commentItem) {
        commentItem.remove();
      }
      commentDeleteModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    });
  }
});

commentSubmitBtn.addEventListener('click', async function() {
  const comment_data = {
    commentContent: commentInput.value
  }


  try {
    //댓글 수정으로 버튼이 변한 경우
    if (isEditing) {
      const result = await editComment(currentEditCommentId, comment_data);

      // 제출 시점에 ID로 다시 찾기 (재렌더링돼도 안전)
      const editBtnAgain = commentList.querySelector(
        `.btn-edit-comment[data-comment-id="${currentEditCommentId}"]`
      );
      const targetBody = editBtnAgain?.closest('.comment-item')?.querySelector('.comment-body');

      if (targetBody) {
        targetBody.textContent = result.data.commentContent;
      } else {
        console.warn('해당 댓글 요소를 찾을 수 없음:', currentEditCommentId);
      }

      isEditing = false;
      currentEditCommentId = null;
      commentSubmitBtn.textContent = '댓글 등록';
    } else {
      const result = await createComment(comment_data);
      commentList.prepend(createCommentElement(result.data));
    }

    commentInput.value = '';
    commentSubmitBtn.classList.remove('active');
    commentSubmitBtn.disabled = true;
  } catch (error) {
    console.error(error);
  }
});