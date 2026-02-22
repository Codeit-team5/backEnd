import prisma from '../config/prisma.js';


async function createImage(image){
  const postImage = await prisma.image.create({
    data:{
      imageUrl: image.image 
    },
    select:{
      imageUrl: true
    }
  })
  return postImage;
}

export default {
    createImage
  }
  