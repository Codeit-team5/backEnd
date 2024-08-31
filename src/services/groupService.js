import groupRepository from '../repositories/groupRepository.js';

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

//id와 객체를 받아서 그룹 수정
async function fixGroup(groupId, newGroup){
  const groupPassword = await groupRepository.findByPassword(groupId);

  //양식을 입력하기 않았을 때
  if(newGroup.name == null
    || newGroup.password ==null //comment에서는 nickname이 없거나
    || newGroup.imageUrl ==null
    || newGroup.isPublic ==null
    || newGroup.introduction ==null){//newComment의 content가 없거나 password가 없으면 잘못된 요청
      return "wrongResponse";
    }
    //비밀 번호가 같지 않을 때
  if(groupPassword.password !=newGroup.password){
    return "wrongPassword";
  }

  return await groupRepository.fixByGroupId(groupId,newGroup);

}


//id를 받아서 입력과 같은 id라면 삭제.
async function deleteGroup(groupId, groupPassword){
    /*const deletedGroup = await groupRepository.deleteByGroupId(groupId, groupPassword);
  
    //어떤의미로 만들었는지
    if (!deletedGroup){
      return 'nonError';
    }*/

    //id가 맞는지 비교하려면 비밀 번호를 db에서 접근을 먼저 해야함.
    const findPassword = await groupRepository.findByPassword(groupId);

    console.log(findPassword.password);
    //비밀 번호 맞는지 확인
    if(findPassword.password!==groupPassword){   //controller에서 이미 password를 빼놨음
      return 'wrongError';
    }

  return await groupRepository.deleteByGroupId(groupId);
  }


export default {
  register,
  show,
  compare,
  open,
  fixGroup,
  deleteGroup
};
