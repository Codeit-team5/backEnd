import groupRepository from '../repositories/groupRepository.js';
import prisma from '../config/prisma.js';

async function register(Group) {    //model의 Group 자체임.
  const createGroup = await groupRepository.create(Group);
  return groupRepository.registerList(createGroup);
}

async function show(keyword,isPublic){       //목록을 보여줌.
  return groupRepository.list(keyword,isPublic);
}

//비밀번호를 비교해서 return을 설정해야 함.
async function compare(groupId,sendPassword){  //GroupId와 req로 보낸 password를 비교
  //grouId로 group를 찾음
  const findGroup = await groupRepository.findByGroupId(groupId);
  const restorePassword = await groupRepository.findByPassword(findGroup);
 
  //둘 다 객체이기 때문에 아래와 같이 비교해야함.
  if (restorePassword.password===sendPassword.password){
    return true;
  }
  else{return false;};
}


//id와 isPublic을 받아와서 보냄.
async function open(groupId){
  const findGroup = await groupRepository.findByGroupId(groupId);
  return await groupRepository.findByIsPublic(findGroup); 
}
/*
async function register(Group) {    //model의 Group 자체임.
  const createGroup = await groupRepository.create(Group);
  return groupRepository.registerList(createGroup);
}

async function show(){       //목록을 보여줌.
  return groupRepository.list();
}
  */
//id와 객체를 받아서 그룹 수정
async function putGroup(groupId, putByGroupId){
  try{
    const puttedGroup = await groupRepository.putByGroupId(Group);
  
    if (!puttedGroup){
      throw new nonError('nonError');
    }
    if(puttedGroup.password!==putByGroupId.password){
      throw new wrongError('wrongError');
    }
    return groupRepository.putByGroupId(puttedGroup);
  } catch (error){
  throw error;
  }
}


//id를 받아서 입력과 같은 id라면 삭제.
async function deleteGroup(groupId, groupPassword){
  try{
    const deletedGroup = await groupRepository.deleteByGroupId(groupId, groupPassword);
  
    if (!deletedGroup){
      throw new nonError('nonError');
    }
    return '그룹 삭제 성공';
  } catch (error){
    if(deleteGroup.password!==groupPassword){
      throw new worngError('worngError');
    }

  }
  throw error;
}



async function register(Group) {    //model의 Group 자체임.
  const createGroup = await groupRepository.create(Group);
  return groupRepository.registerList(createGroup);
}

async function show(keyword,isPublic){       //목록을 보여줌.
  return groupRepository.list(keyword,isPublic);
}

//비밀번호를 비교해서 return을 설정해야 함.
async function compare(groupId,sendPassword){  //GroupId와 req로 보낸 password를 비교
  //grouId로 group를 찾음
  const findGroup = await groupRepository.findByGroupId(groupId);
  const restorePassword = await groupRepository.findByPassword(findGroup);
 
  //둘 다 객체이기 때문에 아래와 같이 비교해야함.
  if (restorePassword.password===sendPassword.password){
    return true;
  }
  else{return false;};
}


//id와 isPublic을 받아와서 보냄.
async function open(groupId){
  const findGroup = await groupRepository.findByGroupId(groupId);
  return await groupRepository.findByIsPublic(findGroup); 
}
/*
async function register(Group) {    //model의 Group 자체임.
  const createGroup = await groupRepository.create(Group);
  return groupRepository.registerList(createGroup);
}

async function show(){       //목록을 보여줌.
  return groupRepository.list();
}
  */
//id와 객체를 받아서 그룹 수정
async function putGroup(groupId, putByGroupId){
  try{
    const puttedGroup = await groupRepository.putByGroupId(Group);
  
    if (!puttedGroup){
      throw new nonError('nonError');
    }
    if(puttedGroup.password!==putByGroupId.password){
      throw new wrongError('wrongError');
    }
    return groupRepository.putByGroupId(puttedGroup);
  } catch (error){
  throw error;
  }
}


//id를 받아서 입력과 같은 id라면 삭제.
async function deleteGroup(groupId, groupPassword){
  try{
    const deletedGroup = await groupRepository.deleteByGroupId(groupId, groupPassword);
  
    if (!deletedGroup){
      throw new nonError('nonError');
    }
    return '그룹 삭제 성공';
  } catch (error){
    if(deleteGroup.password!==groupPassword){
      throw new worngError('worngError');
    }

  }
  throw error;
}

export default {
  register,
  deleteGroup,
  putGroup,
  show,
  compare,
  open
};

