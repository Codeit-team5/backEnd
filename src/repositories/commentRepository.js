import prisma from '../config/prisma.js';

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
      commentId:parseInt(commentId,10)
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
      commentId:parseInt(commentId,10)
    },
    select:{
      password:true
    }
  })
}


export default {
  selectiveList,
  updateComment,
  findByPassword
}