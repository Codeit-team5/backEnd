import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  [...Array.from(Array(30).keys())].forEach(async (item) => {
    await prisma.comment.create({
      data:{
        nickname: `nick${item}`, // 각 코멘트마다 고유한 닉네임을 생성
        content: `This is comment content number ${item}`, // 각 코멘트마다 고유한 내용을 생성
        password: `password${item}`, // 각 코멘트마다 고유한 비밀번호를 생성
        createdAt: new Date(), // 생성일을 현재 시간으로 설정
        page: Math.floor(item / 10) + 1, // 페이지 번호를 1~3으로 설정 (코멘트 10개당 1페이지)
        pageSize: 10, // 페이지당 코멘트 개수를 10으로 설정

        postId: 1, // 연결할 Post의 ID를 1로 설정 (데모이므로 고정)
        commentId: item + 1, // Post 내에서의 commentId를 item에 따라 설정
      }
    });
    console.log(`${item}/30`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => prisma.$disconnect);