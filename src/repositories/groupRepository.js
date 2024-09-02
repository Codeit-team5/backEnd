import prisma from '../config/prisma.js';

//정렬 기준
//sortingCriteria = [latest , mostPosted , mostLiked , mostBadge ];

//그룹 등록할 때 필요한 것들.
//왜 password가 들어가는지..
async function create(Group){
  const registerGroup = await prisma.group.create({
    data :{
      name : Group.name,
      password : Group.password,
      imageUrl : Group.imageUrl,
      isPublic : Group.isPublic,
      introduction : Group.introduction,
      postCount : (await prisma.post.count()) //post의 개수
    },
  })
  return registerGroup;
}
//그룹 등록하기에서 보여줘야 할 것들
async function registerList(group){
  const listGroup = await prisma.group.findMany({
    where :{
      id : group.id,
    },
    select:{
      "id": true,
      "name": true,
      "imageUrl": true,
      "isPublic": true,
      "likeCount": true,
      "badges": true,
      "postCount": true,
      "createdAt": true,
      "introduction": true
    }
  });
  return listGroup;
};




//그룹 목록 조회하기에서 보여줘야 할 것들(db에 있는 모든 것)
async function list(keyword,isPublic){
  return await prisma.group.findMany({
    where:{
      //contain으로 포함이 되어 확인함.
      OR: [
        { name: { contains: keyword } }, // title에 keyword가 포함된 경우
        { introduction: { contains: keyword } },  // tags 배열에 keyword가 포함된 경우
      ],
      isPublic : isPublic
    },
    select:{
      "id": true,
			"name": true,
			"imageUrl": true,
			"isPublic": true,
			"likeCount": true,
			"badgeCount": true,
			"postCount": true,
			"createdAt": true,
			"introduction": true
    }
  })
};

//GroupId를 통해서 해당 Group 반환
async function findByGroupId(groupId){
  return await prisma.group.findUnique({
    where : {
      id: parseInt(groupId, 10), // id를 10진수로 변환하여 사용
    }
  });
}

//비밀번호 찾기
async function findByPassword(group){   //해당하는 group를 전달받음.
  return await prisma.group.findFirst({
    where : {
      id : parseInt(group,10)         //where 절은 unique 아니면 default 등만 가능//
    },
    //select를 사용해서 password만 가져와야함.
    select:{
      password : true,
    }
  });
};

//id와 isPublic을 반환함
async function findByIsPublic(group){

  //groupId에 있는 id와 isPublic을 반환
  const {id} = group;   

  return await prisma.group.findFirst({
    where:{
      id : id,
    },
    select:{
      id : true,
      isPublic : true
    }
  })
}

//group 수정
async function fixByGroupId(groupId, newGroup){
  return await prisma.group.update({
    where:{
      id : parseInt(groupId,10)  //Id로 수정함//
    },
    data :{
      name : newGroup.name,
      password : newGroup.password,
      imageUrl : newGroup.imageUrl,
      isPublic : newGroup.isPublic,
      introduction : newGroup.introduction
    },
    select:{
      id : true,
      name : true,
      imageUrl : true,
      isPublic : true,
      likeCount : true,
      badges : true,
      postCount : true,
      createdAt : true,
      introduction : true
    }
  })
};


//그룹 삭제
async function deleteByGroupId(groupId){
    return await prisma.group.delete({
      where:{
        id : parseInt(groupId,10)
      },
    })

  };



  // group 상세정보조회
async function findDetailByGroupId(groupId){
  return await prisma.group.findMany({
    where : {
      id:parseInt(groupId,10)
    },
    select : {
      "id": true,
      "name" : true,
      "imageUrl": true,
      "isPublic": true,
      "likeCount": true,
      "badges" : true,
      "postCount": true,
      "createdAt": true,
      "introduction": true
    }
    })
  }

  //그룹 공감하기
  async function likeByGroupId(groupId){
    return await prisma.group.update({
      where : {
        id:parseInt(groupId,10)
      },
      data : {
          likeCount : {
            increment : 1
          }
        }
      })
    }


export default {
  create,
  registerList,
  list,
  findByPassword,
  findByGroupId,
  findByIsPublic,
  fixByGroupId,
  deleteByGroupId,
  findDetailByGroupId,
  likeByGroupId
}
