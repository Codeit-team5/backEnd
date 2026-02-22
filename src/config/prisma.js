import { PrismaClient } from '@prisma/client';
//@prisma/client는 Prisma의 클라이언트 라이브러리로, 
//이 라이브러리를 통해 JavaScript/TypeScript 코드에서 데이터베이스와 상호작용

const prisma = new PrismaClient();

export default prisma;