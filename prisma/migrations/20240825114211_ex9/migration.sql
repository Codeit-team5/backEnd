/*
  Warnings:

  - You are about to drop the column `commentsId` on the `Comment` table. All the data in the column will be lost.
  - Added the required column `commentId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `page` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageSize` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_commentsId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "commentsId",
ADD COLUMN     "commentId" INTEGER NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL DEFAULT 'abcdef',
ADD COLUMN     "nickname" TEXT NOT NULL DEFAULT 'nick',
ADD COLUMN     "page" INTEGER NOT NULL,
ADD COLUMN     "pageSize" INTEGER NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'password1234',
ADD COLUMN     "postId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
