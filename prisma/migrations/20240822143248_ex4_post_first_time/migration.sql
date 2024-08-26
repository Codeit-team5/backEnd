/*
  Warnings:

  - You are about to drop the column `postsId` on the `Post` table. All the data in the column will be lost.
  - Added the required column `groupId` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupPassword` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postPassword` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_postsId_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "commentsId" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postsId",
ADD COLUMN     "content" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "groupId" INTEGER NOT NULL,
ADD COLUMN     "groupPassword" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "likeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "location" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "moment" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "nickname" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "postPassword" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "name" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentsId_fkey" FOREIGN KEY ("commentsId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
