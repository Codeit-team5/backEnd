import commentRepository from '../repositories/commentRepository.js';

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

//댓글 등록하기
async function post(commentId){
  const postComment = await commentRepository.getComment(commentId);

  return await commentRepository.getComment(commentId);
}

//댓글 삭제하기
async function deleteCtService(commentId){
  const delComment = await commentRepository.deleteComment(commentId);
  const delPassword = await commentRepository.findByPassword(commentId);

  if (!delComment){
    return 'badRequest';
  }
  if(delPassword.password!==commentPassword.password){
    return 'forbidden';
  }
return await groupRepository.deleteByGroupId(groupId,groupPassword);
}


export default{
  show,
  fix,
  post,
  deleteCtService
}