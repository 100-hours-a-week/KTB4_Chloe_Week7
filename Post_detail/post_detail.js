const profileMenuBtn = document.getElementById('profileMenuBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

const postDeleteModal = document.querySelector('.post_delete_modal');
const postDeleteBtn = document.getElementById('postDeleteBtn');
const postDeleteCancelBtn = document.getElementById('postDeleteCancel');

const commentDeleteModal = document.querySelector('.comment_delete_modal');
const commentDeleteBtn = document.querySelector('.btn-action.btn-delete-comment');
const commentDeleteCancelBtn = document.getElementById('commentDeleteCancel');

const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');

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


//댓글 삭제 모달
commentDeleteBtn.addEventListener('click', function() {
  commentDeleteModal.classList.add('active');
  document.body.classList.add('modal-open');
});
commentDeleteCancelBtn.addEventListener('click', function() {
  commentDeleteModal.classList.remove('active'); 
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

commentEditBtn.addEventListener('click', function() {
  commentInput.value = commentContent.textContent;

  commentSubmitBtn.textContent = '댓글 수정';
  commentSubmitBtn.classList.add('active');
  commentSubmitBtn.disabled = false;

  isEditing = true;
});

commentSubmitBtn.addEventListener('click', function() {
  if (isEditing) {
    commentContent.textContent = commentInput.value;

    commentSubmitBtn.textContent = '댓글 등록';
    commentSubmitBtn.classList.remove('active');
    commentSubmitBtn.disabled = true;

    commentInput.value = '';
    isEditing = false;
  }
});

