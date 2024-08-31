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


/////////////////////////////////////////////////////////////////////
//id와 객체를 받아서 그룹 수정
async function fixPost(postId, newPost){
  const groupPass = await groupRepository.findByPassword(groupId);

  //양식을 입력하기 않았을 때
  if(newPost.nickname == null,
    newPost.title==null,
    newPost.content == null,
    newPost.postPassword == null,
    newPost.imageUrl == null,
    newPost.tags == null,
    newPost.location == null,
    newPost.moment == null,
    newPost.isPublic == null){
      return "wrongFixPostResponse";
    }
    //비밀 번호가 같지 않을 때
  if(groupPass.password !=newPost.password){
    return "wrongFixPostPassword";
  }

  return await postRepository.fixByPostId(postId,newPost);

}

//id를 받아서 입력과 같은 id라면 삭제.
async function deletePost(postId, postPassword){
  const deletedPost = await postRepository.deleteByPostId(postId, postPassword);

  if (!deletedPost){
    return 'nonPostError';
  }
  if(deletedpost.password!==postPassword.password){
    return 'wrongPostPassError';
  }
return await postRepository.deleteByPostId(postId,postPassword);
}

export default {
  register,
  show,
  compare,
  open,
  fixPost,
  deletePost
};