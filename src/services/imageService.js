import imageRepository from '../repositories/imageRepository.js';

async function post(Image) {    
    const postedImage = await imageRepository.createImage(image);
    return imageRepository.registerList(createGroup);
  }

export default {
post
}