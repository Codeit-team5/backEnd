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


export default{
  show,
  fix
}