import groupRepository from '../repositories/groupRepository.js';

async function register(Group) {    //model의 Group 자체임.
  const createGroup = await groupRepository.create(Group);
  return groupRepository.registerList(createGroup);
}

async function show(){       //목록을 보여줌.
  return groupRepository.list();
}

//비밀번호를 비교해서 return을 설정해야 함.
async function compare(groupId,sendPassword){  //GroupId와 req로 보낸 password를 비교
  //grouId로 group를 찾음
  const findGroup = await groupRepository.findByGroupId(groupId);
  const publicOrPrivate = await groupRepository.findByPassword(findGroup);
 
  //둘 다 객체이기 때문에 아래와 같이 비교해야함.
  if (publicOrPrivate.password===sendPassword.password){
    return true;
  }
  else{return false;};
}


//id와 isPublic을 받아와서 보냄.
async function open(groupId){
  const findGroup = await groupRepository.findByGroupId(groupId);
  return await groupRepository.findByIsPublic(findGroup); 
}


export default {
  register,
  show,
  compare,
  open
};
