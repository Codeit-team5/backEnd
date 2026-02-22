import commentRepository from '../repositories/commentRepository.js';
import crypto from 'crypto';


//pbkdf2로 hash하기
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

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

  //salt 만들기
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = hashPassword(newComment.password, salt);

  //기존에 뒤에 추가
  const hashAlternative = {
    ...newComment,
    password: hashedPassword,
    salt: salt
  };
  const createComment = await commentRepository.getComment(postId,hashAlternative,newCommentId);

  return await commentRepository.list(postId)
}

//댓글 목록 보여주기
async function show(postId){
  return await commentRepository.selectiveList(postId);
}

//댓글 수정하기
async function fix(commentId,newComment){
  //기존꺼 불러오기
  const restorePassword = await commentRepository.findByPasswordAndSalt(commentId);

  //요청 양식 오류(양식을 입력하기 않았을 때)
  if(newComment.nickname == null || newComment.content ==null
    || newComment.password ==null){
      return "wrongResponse";
    }
    //비밀 번호가 같지 않을 때
  const hashedInput = hashPassword(newComment.password, restorePassword.salt);
  if(hashedInput !== restorePassword.password){
    return "wrongPassword";
  }


  //newSalt로 저장
  const newSalt = crypto.randomBytes(16).toString('hex');
  const newHashedPassword = hashPassword(newComment.password, newSalt);
  newComment.password = newHashedPassword;
  newComment.salt = newSalt;

  return await commentRepository.updateComment(commentId,newComment);

}


//댓글 삭제하기
async function deletetService(commentId,deletePassword){
  //Repository에서 불러옴.
  const delPassword = await commentRepository.findByPasswordAndSalt(commentId);

  if (deletePassword === null){
    return 'badRequest';
  }
  const hashedInput = hashPassword(deletePassword.password, delPassword.salt);
  if(hashedInput !== delPassword.password){
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