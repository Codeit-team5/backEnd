import commentRepository from '../repositories/commentRepository.js';

//댓글 목록 보여주기
async function show(postId){
  return await commentRepository.selectiveList(postId);
}

//댓글 수정하기
async function fix(commentId,newComment){
  return await commentRepository.updateComment(commentId,newComment);
}


export default{
  show,
  fix
}