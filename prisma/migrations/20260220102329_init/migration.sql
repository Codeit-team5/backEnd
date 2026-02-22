-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "salt" TEXT;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "salt" TEXT;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "postSalt" TEXT;
