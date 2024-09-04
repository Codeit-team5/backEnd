import express from 'express';
import commentService from '../services/commentService.js';

const commentController = express.Router();

//댓글 등록하기
commentController.post('/api/posts/:postId/comments', async(req,res)=>{
  try{
    const postId = req.params.postId;
    const registerComment = await commentService.register(postId,req.body);
    return res.status(200).json(registerComment);
  }catch(error){
    console.error("error!",error);
    res.status(400).json({message : "잘못된 요청입니다"});
  }
})

//댓글 조회하기
//일단 commentId로만
commentController.get('/api/posts/:postId/comments', async(req,res)=>{
  try{
    const postId = req.params.postId;
    //일단 commentId를 parameter로 받지 않음
   //const commentId = req.query.commentId;
    const entireComment = await commentService.show(postId)
    return res.json(entireComment);
  }catch(error) {
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(400).json({message : "잘못된 요청입니다"});
  }
})

//댓글 수정하기
commentController.patch('/api/comments/:commentId', async(req,res)=>{
  try{
    const id = req.params.commentId;
    const fixedComment = await commentService.fix(id,req.body);

    if(fixedComment == "wrongResponse"){
      return res.status(400).json({message: "잘못된 요청입니다"})
    }
    else if(fixedComment == "wrongPassword"){
      return res.status(403).json({message: "비밀번호가 틀렸습니다"})
    }

    return res.status(200).json(fixedComment);
  }catch(error) {
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(404).json({message: "존재하지 않습니다"});
  }
})


//댓글 삭제
commentController.delete('/api/comments/:commentId', async(req,res)=>{
  try{
  const commentId = req.params.commentId;
  const deleteCommnet = await commentService.deletetService(commentId,req.body);
  if(deleteCommnet=='badRequest'){
    return res.status(400).json({message : "잘못된 요청입니다"});
  }
  else if(deleteCommnet=='forbidden'){
    return res.status(403).json({message : "비밀번호가 틀렸습니다"});
  }

  return res.status(200).json({message : "답글 삭제 성공"});

  }catch(error){
    console.error("error!",error);
    return res.status(404).json({message : "존재하지 않습니다"});
  }
})

export default commentController;