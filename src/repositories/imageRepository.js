import prisma from '../config/prisma.js';


async function createImage(image){
  const postImage = await prisma.image.findMany({
    data :{
        image : image.image
    },
    select :{
        imageUrl : true
    }
  })
  return postImage;
}

export default {
    createImage
  }
  