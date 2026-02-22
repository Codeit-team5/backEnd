-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "relatedImageId" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RelatedImage" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL DEFAULT '',
    "relatedImageId" INTEGER,

    CONSTRAINT "RelatedImage_pkey" PRIMARY KEY ("id")
);
