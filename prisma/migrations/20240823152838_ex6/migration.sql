/*
  Warnings:

  - You are about to drop the column `commentsCount` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "commentsCount",
ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;
