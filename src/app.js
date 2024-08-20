import 'dotenv/config';
import express from 'express';
/*dotenv 라이브러리를 사용하여 env 파일의 환경 변수들을 로드.
express 웹 프레임워크를 불러와서 애플리케이션 서버를 구축할 준비.*/

import groupController from './controllers/groupController.js';

const api = express();
api.use(express.json()); //client에게 JSON 데이터를 받을 때 JavaScript 객체로 변환
api.use('',groupController); //나중에 /api 없애도 되는지 확인하기

const port = process.env.PORT ?? 3000;
api.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});