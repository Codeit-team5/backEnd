import express from 'express';
import commentService from '../services/commentService.js';

const commentController = express.Router();


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

    return res.json(fixedComment);
  }catch(error) {
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(404).json({message: "존재하지 않습니다"});
  }
})


//댓글 등록하기
commentController.post('/api/comments/:commentId', async(req,res)=>{
  const postComment = await commentService.post(commentId);
  try{
    return res.status(200).json({
      "id": json.params(commentId,10),
	    "nickname": postComment.nickname,
	    "content": postComment.content,
	    "createdAt": postComment.createdAt
    })
  }catch(error){
    console.error("error!",error);
    res.status(400).json({message : "잘못된 요청입니다"});
  }
})

//댓글 삭제
commentController.delete('/api/comments/:commentId', async(req,res)=>{
  const delCom = await commentService.deleteCtService(commentId);
  try{
    if(delCom=='badRequest'){
      return res.status(400).json({message : "잘못된 요청입니다"});
    }
    else if(delCom=='forbidden'){
      return res.status(403).json({message : "비밀번호가 틀렸습니다"});
    }
  }catch(error){
    console.error("error!",error);
    return res.status(404).json({message : "존재하지 않습니다"});
  }
})



export default commentController;