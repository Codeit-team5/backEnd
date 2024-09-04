/*
  Warnings:

  - A unique constraint covering the columns `[groupId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_groupId_key" ON "Post"("groupId");
