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
    const entireGroup = await groupService.show();
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
/////////////////
///////////group 수정
const {wrongError, nonError} = require('./customerError'); //나만의 오류 단어


groupController.put('/api/groups/:groupId',async(req,res)=>{
  try{
    const Id = req.params.groupId;
    const openIsPublic = await groupService.open(Id);    //id, isPublic을 받아옴.
    return res.json(openIsPublic);
  }catch(error){
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(401).json({message : "잘못된 요청입니다"});
  }
})


//group 삭제

groupController.delete('/api/groups/:groupId',async(req,res)=>{
  try{
    const Id = req.params.groupId;
    const password = req.body.password;
    
    await groupService.deleteGroup(groupId, groupPassword);

    return res.status(200).json({message : "그룹 삭제 성공"});
    }
    catch(error){
    if(error instanceof wrongError){
      return res.status(401).json({message : "비밀번호가 틀렸습니다"});
    }else if (error instanceof nonError){
      return res.status(404).json({message : '존재하지 않습니다'});
    }else{
      console.error('error!',error);
      return res.status(400).json({message : '잘못된 요청입니다'});
    }
  }
});




//group 상세 정보 조회
groupController.get('/api/groups/:groupId',async(req,res)=>{
  try{
    const Id = req.params.groupId;
    const openIsPublic = await groupService.open(Id);    //id, isPublic을 받아옴.
    return res.json(openIsPublic);
  }catch(error){
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(401).json({message : "잘못된 요청입니다"});
  }
})



//group 공감하기
groupController.post('/api/groups/:groupId/like',async(req,res)=>{
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