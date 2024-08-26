import express from 'express';
import groupService from '../services/groupService.js';

const groupController = express.Router();


//그룹 등록
groupController.post('/api/groups',async(req,res)=>{
  
  try{
    const newGroup = await groupService.register(req.body);    //req의 내용을 받음
    return res.json(newGroup);
  }
  catch (error) {
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(401).json({message : "잘못된 요청입니다"});
  }
});


//그룹 조회
groupController.get('/api/groups',async(req,res)=>{
  try{
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
    
    const entireGroup = await groupService.show(keyword,isPublic);
    return res.json(entireGroup);
  }catch(error){
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(401).json({message : "잘못된 요청입니다"});
  }
})


//그룹 조회 권한 확인
groupController.post('/api/groups/:groupId/verify-password',async(req,res)=>{
  try{
    const Id = req.params.groupId; // URL 경로에서 groupId를 가져옴
     //URL의 id와 req.body(password)를 가져와서 비교해야함.
    const verifyPassword = await groupService.compare(Id,req.body); 
    if(verifyPassword === true){
      return res.status(200).json({message : "비밀번호가 확인되었습니다"});
    }else{
      return res.status(401).json({message : "비밀번호가 틀렸습니다."});
    }
  }catch(error){
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(401).json({message : "잘못된 요청입니다"});

  }
})



//그룹 공개 여부 확인하기
groupController.get('/api/groups/:groupId/is-public',async(req,res)=>{
  try{
    const Id = req.params.groupId;
    const openIsPublic = await groupService.open(Id);    //id, isPublic을 받아옴.
    return res.json(openIsPublic);
  }catch(error){
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(401).json({message : "잘못된 요청입니다"});
  }
})


export default groupController;