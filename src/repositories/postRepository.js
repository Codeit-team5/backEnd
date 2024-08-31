import prisma from '../config/prisma.js';


async function findPostIdByGroupId(groupById){
  const maxPostIdByGroup = await prisma.post.findFirst({
    where: {
      groupId: parseInt(groupById, 10),
    },
    orderBy: {
      postId: 'desc', // 내림차순으로 정렬하여 가장 큰 값을 가져옴
    },
    select: {
      postId: true,
    },
  });
  return maxPostIdByGroup;
}

//req에서 받은 데이터를 생성, api 형식에 맞는 res 양식으로 돌려주는 것 까지
async function create(Post,groupById,newPostId) {

  const registerPost = await prisma.post.create({
    data:{
      "groupId": parseInt(groupById, 10),
      "nickname": Post.nickname,
      "title": Post.title,
      "content": Post.content,
      "imageUrl": Post.imageUrl,
      "tags": JSON.stringify(Post.tags), // tags 배열을 JSON 문자열로 변환
      "location": Post.location,
      "moment": new Date(Post.moment), // moment를 Date 객체로 변환
      "isPublic": Post.isPublic,
      "likeCount": 0,
      "commentCount": (await prisma.comment.count()), //comment의 개수
      "postPassword":Post.postPassword,
      "groupPassword" : Post.groupPassword,
      "postId" : newPostId
    },
    
  })
  
  return registerPost;
}

//게사글 등록하기 에서 보여줘야 할 것들(db에 있는 모든 것)
async function list(groupById){
  

  //나중에 삭제할 수도 있는 코드
  //group password가 post 등록하기에서 입력하는 groupPassword와
  //일치 하지 않을 때
  /*if(prisma.group.password != prisma.post.groupPassword){
    throw new console.error("비밀 번호가 일치하지 않습니다.");
  }*/

  const listPost = await prisma.post.findFirst({
    where:{
      groupId : parseInt(groupById, 10),
    },
    orderBy: {
      id: 'desc',  // id를 내림차순으로 정렬하여 최신의 post를 선택
    },
    select:{
      "id": true,
      "groupId": true,
	    "nickname": true,
	    "title": true,
	    "content": true,
	    "imageUrl": true,
	    "tags": true,
	    "location": true,
	    "moment": true,
	    "isPublic": true,
	    "likeCount": true,
	    "commentCount": true,
	    "createdAt": true
    }
  });
  return listPost;
};

//목록 조회에서 보여주는 list들
async function selectiveList(groupById,keyword,groupByIsPublic){

  const selectiveListPost = await prisma.post.findMany({
    where:{
      groupId : parseInt(groupById,10),
      //contain으로 포함이 되어 확인함.
      OR: [
        { title: { contains: keyword } }, // title에 keyword가 포함된 경우
        { tags: { contains: keyword } },  // tags 배열에 keyword가 포함된 경우
      ],
      isPublic : groupByIsPublic
    },
    select:{
      "id": true,
      "postId" : true,
      "nickname": true,
      "title": true,
      "imageUrl": true,
      "tags": true,
      "location": true,
      "moment": true,
      "isPublic": true,
      "likeCount": true,
      "commentCount": true,
      "createdAt": true
    }
  })
  return selectiveListPost;
}

//postId를 전달 받아서 postPassword를 반환함.
async function findByPassword(postId){
  return await prisma.post.findFirst({
    where:{
      id : parseInt(postId,10)
    },
    select:{
      "postPassword" : true
    }
  })
}


//공개 여부 확인
async function findByIsPublic(postId){
  return await prisma.post.findFirst({
    where:{
      id : parseInt(postId,10)
    },
    select:{
      isPublic : true
    }
  })
}

/////////////////////////////////////////////////////////////////////////////////
//post 수정
async function fixByPostId(postId, newPost){
  return await prisma.post.update({
    where:{
      postId:parseInt(postId,10)
    },
    data :{
      nickname : newPost.nickname,
      title : newPost.title,
      content : newPost.imageUrl,
      postPassword : newPost.postPassword,
      imageUrl : newPost.imageUrl,
      tags :newPost.tags,
      location :newPost.location,
      moment :newPost.moment,
      isPublic :newPost.isPublic
    },
    select:{
      id : true,
      groupId : true,
      nickname : true,
      title : true,
      content : true,
      imageUrl : true,
      tags : true,
      location : true,
      moment : true,
      isPublic : true,
      likeCount : true,
      badges : true,
      commentCount : true,
      createdAt : true
    }
  })
};

//post 삭제
async function deleteByPostId(postId,postPassword){
  const {id} = postId;
  const { password } = postPassword;
  try{
    deletedPost = await prisma.post.delete({
      where: {
        id : id,
        password : password
      }
    });
      return deletedPost; //삭제된 정보 반환 (없으면 null)
  } catch (error){
    throw error;
  }};


export default {
  findPostIdByGroupId,
  create,
  list,
  selectiveList,
  findByPassword,
  findByIsPublic,
  fixByPostId,
  deleteByPostId
}