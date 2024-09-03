import express from 'express';
import imageService from '../services/imageService.js';

const imageController = express.Router();


//그룹 등록
imageController.post('/api/image',async(req,res)=>{
  
  try{
    const newImage = await imageService.post(req.body);    //req의 내용을 받음
    return res.json(newImage);
  }
  catch (error) {
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(401).json({message : "잘못된 요청입니다"});
  }
});

export default imageController;