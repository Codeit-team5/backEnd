/*
  Warnings:

  - You are about to drop the column `postSalt` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "postSalt",
ADD COLUMN     "salt" TEXT;
