import imageRepository from '../repositories/imageRepository.js';

async function post(image) {    
    return await imageRepository.createImage(image);
    
  }

export default {
post
}