import commentRepository from '../repositories/commentRepository.js';

//댓글 등록하기
async function register(postId,newComment){
  const oldCommentId = await commentRepository.findCommentIdByPostId(postId);

  //commentId에 1을 추가하거나 commentId가 없었으면 1로 등록함.
  let newCommentId;
  if (oldCommentId && oldCommentId.commentId) {
    newCommentId = oldCommentId.commentId + 1;
  } else {
    newCommentId = 1;
  }

  const createComment = await commentRepository.getComment(postId,newComment,newCommentId);

  return await commentRepository.list(postId)
}

//댓글 목록 보여주기
async function show(postId){
  return await commentRepository.selectiveList(postId);
}

//댓글 수정하기
async function fix(commentId,newComment){
  const restorePassword = await commentRepository.findByPassword(commentId);

  //요청 양식 오류(양식을 입력하기 않았을 때)
  if(newComment.nickname == null || newComment.content ==null
    || newComment.password ==null){
      return "wrongResponse";
    }
    //비밀 번호가 같지 않을 때
  if(restorePassword.password !=newComment.password){
    return "wrongPassword";
  }

  return await commentRepository.updateComment(commentId,newComment);

}


//댓글 삭제하기
async function deletetService(commentId,deletePassword){
  const delPassword = await commentRepository.findByPassword(commentId);

  if (deletePassword === null){
    return 'badRequest';
  }
  if(delPassword.password!==deletePassword.password){
    return 'forbidden';
  }
return await commentRepository.deleteComment(commentId);
}




export default{
  register,
  show,
  fix,
  deletetService
}