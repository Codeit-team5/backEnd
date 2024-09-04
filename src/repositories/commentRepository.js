import prisma from '../config/prisma.js';


//postId로 commentId 가장 최근 값 찾기
async function findCommentIdByPostId(postId){
  return await prisma.comment.findFirst({
    where: {
      postId: parseInt(postId, 10)
    },
    orderBy: {
      commentId: 'desc', // 내림차순으로 정렬하여 가장 큰 값을 가져옴
    },
    select: {
      commentId: true,
    },
  });
}

//comment 등록하기
async function getComment(postId,newComment,newCommentId){
  return prisma.comment.create({
    data:{
      "commentId":newCommentId,
      "postId":parseInt(postId,10),
      "nickname":newComment.nickname,
      "content":newComment.content,
      "password":newComment.password
    }
  })
}

//comment 등록하기에서 보여주기
async function list(postId){
  return prisma.comment.findFirst({
    where:{
      postId:parseInt(postId,10)
    },
    orderBy: {
      id: 'desc',  // id를 내림차순으로 정렬하여 최신의 post를 선택
    },
    select:{
      "id": true,
	    "nickname": true,
	    "content": true,
	    "createdAt": true
    }
  })
}

//조회하기에서 보여주기
async function selectiveList(postId){
  return await prisma.comment.findMany({
    where:{
      postId : parseInt(postId,10),
    },
    select:{
      commentId:true,
      nickname:true,
      content:true,
      createdAt:true
    }
  })
}



//내용을 update함
async function updateComment(commentId,newComment) {
  return await prisma.comment.update({
    where:{
      id:parseInt(commentId,10)
    },
    data:{
      nickname:newComment.nickname,
      content:newComment.content,
    },
    select:{
      commentId:true,
      nickname:true,
      content:true,
      createdAt:true
    }
  })
}

//commentId의 password를 return함.
async function findByPassword(commentId){
  return prisma.comment.findFirst({
    where:{
      id:parseInt(commentId,10)
    },
    select:{
      password:true
    }
  })
}


//comment 삭제하기
async function deleteComment(commentId){
  return prisma.comment.delete({
    where : {
      id : parseInt(commentId,10)
    }
  })
}

export default {
  findCommentIdByPostId,
  list,
  selectiveList,
  updateComment,
  findByPassword,
  getComment,
  deleteComment
}