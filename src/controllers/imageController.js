import express from 'express';
import multer from 'multer';

const imageController = express.Router();

//따로 uploads 파일을 저장을 해 놓아야 함.
//multer를 통해서 로컬에 uploads 파일에 이미지가 저장됨
//db에 직접적으로 저장을 하려면 bytea로 속성 변경
const upload = multer({ dest: 'public/'});


imageController.post('/image', upload.single('image'), (req, res) => {
  try{
    const filename = req.file.filename;
    //경로를 서버에 전달
    const path = `${filename}`;
    res.status(200).json({ path });
  }
  catch (error) {
    console.error("error!", error); // 에러 로그에 실제 오류를 출력하도록 수정
    res.status(401).json({message : "잘못된 요청입니다"});
  }
});

//app.use('/profile', express.static('uploads/'));

export default imageController;


/*
const formData = new FormData();
formData.append('image', fileInput.files[0]);

fetch('http://localhost:3000/image', {
  method: 'POST',
  body: formData
});
*/
