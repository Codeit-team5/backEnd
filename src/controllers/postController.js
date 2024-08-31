import express from 'express';
import postService from '../services/postService.js';

const postController = express.Router();

//게시글 등록하기
postController.post('/api/groups/:groupId/posts',async(req,res)=>{
  try{
    const Id = req.params.groupId; // URL 경로에서 groupId를 가져옴
    const newPost = await postService.register(Id,req.body);    //Id를 외래키와 연결시켜야함.
    return res.json(newPost);
  }
  catch(error) {
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(400).json({message : "잘못된 요청입니다"});
  }
})


//게시글 목록 조회하기
postController.get('/api/groups/:groupId/posts', async(req,res)=>{
  try{
    const Id = req.params.groupId;
    const keyword = req.query.keyword;         //제목과 태그에 포함 된 것을 검색하는 것임.
    const isPublicString = req.query.isPublic;

    
    //isPublicString을 stirng => boolean
    let isPublic = true;
    if(isPublicString == "true"){
      isPublic = true;
    }else if(isPublicString == 'false'){
      isPublic = false;
    }
    else{
      console.log("잘못된 입력");
    }
    
    //아래는 나중에 구현
    /*const pageNumber = await req.params.parseInt(page,10);
    const pageSize = await req.params.parseInt(pageSize, 10);
    const sortBy = await req.params.sortBy;*/

    const entirePost = await postService.show(Id,keyword,isPublic);
    

    return res.json(entirePost);
  }
  catch(error) {
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(400).json({message : "잘못된 요청입니다"});
  }
})


//게시글 조회 권한 확인
postController.post('/api/posts/:postId/verify-password', async (req,res)=>{
  try{
    const id = req.params.postId;
    const verifyPassword = await postService.compare(id,req.body);
    if(verifyPassword === true){
      return res.status(200).json({message : "비밀번호가 확인되었습니다"});
    }else{
      return res.status(401).json({message : "비밀번호가 틀렸습니다."});
    }
  }catch(error) {
    console.error("error!", error); 
    res.status(401).json({message : "잘못된 요청입니다"});
  }  
})

//게시글 공개 여부 확인하기
postController.get('/api/posts/:postId/is-public', async(req,res)=>{
  try{
    const id = req.params.postId;
    const openIsPublic = await postService.open(id);
    return res.json(openIsPublic);
  }
  catch(error) {
    console.error("error!", error); 
    res.status(401).json({message : "잘못된 요청입니다"});
  } 
})



///////////////////////////////////////////////////////////////////////////////////////////////////
//group 수정
postController.patch('/api/posts/:postId', async(req,res)=>{
  try{
    const id = req.params.postId;                         //id(로컬변수)와 수정된 그룹을 가져옴.

    //newPost라는 변수 없음
    //const fixedPost = await postService.fixPost(id,newPost);

    const fixedPost = await postService.fixPost(id,req.body);

    if(fixedPost == "wrongFixPostResponse"){  //fixedGroup이 string wrongFixPostResponse라면 400
      return res.status(400).json({message: "잘못된 요청입니다"})
    }
    else if(fixedPost == "wrongFixPostPassword"){   //fixedGroup이 string wrongFixPostPassword라면 403
      return res.status(403).json({message: "비밀번호가 틀렸습니다"})
    }

    //status 추가
    return res.status(200).json(fixedPost);
  }catch(error) {
    console.error("error!", error); // 나머지 에러는 error를 출력하며
    res.status(404).json({message: "존재하지 않습니다"});//404 상태 출력
  }
})

//post 삭제
postController.delete('/api/posts/:postId',async(req,res)=>{
  try{
    const id = req.params.postId;
    const password = req.body.password;
    
    await postService.deletePost(id, password);

    return res.status(200).json({message : "그룹 삭제 성공"});
    }
    catch(error){
    if(deletePost=="wrongPostPassError"){
      return res.status(401).json({message : "비밀번호가 틀렸습니다"});
    }else if (deleteGroup=="nonPostError"){
      return res.status(400).json({message :'잘못된 요청입니다' });
    }else{
      console.error('error!',error);
      return res.status(404).json({message :'존재하지 않습니다' });
    }
  }
});

export default postController;