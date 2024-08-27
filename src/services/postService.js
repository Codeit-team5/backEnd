import postRepository from '../repositories/postRepository.js';

//post를 등록함
async function register(groupId,post) {
  //groupId를 통해서 postId를 찾음
  const oldPostId = await postRepository.findPostIdByGroupId(groupId);

  //postId에 1을 추가하거나 postId가 없었으면 1로 등록함.
  let newPostId;
  if (oldPostId && oldPostId.postId) {
    newPostId = oldPostId.postId + 1;
  } else {
    newPostId = 1;
  }

  const createPost = await postRepository.create(post,groupId,newPostId);   //createPost를 만들고 사용을 안함
  return await postRepository.list(groupId);
}


/*Id,keyword,isPublic*/
//post 조회하기
async function show(groupId,keyword,isPublic){
  //parameter에 의한 list들을 return함.
  return await postRepository.selectiveList(groupId,keyword,isPublic);
}


//비밀 번호 맞는지 확인하기
async function compare(postId,sendPassword){
  //postId를 통해서 postPassword를 반환
  const restorePassword = await postRepository.findByPassword(postId);
  //둘 다 객체이기 때문에 아래와 같이 비교해야함.
  if (restorePassword.postPassword===sendPassword.password){
    return true;
  }
  else{
    return false;
  };
}

async function open(postId){
  return await postRepository.findByIsPublic(postId); 
}

export default {
  register,
  show,
  compare,
  open
};