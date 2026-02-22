import groupRepository from '../repositories/groupRepository.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your-secret-key';

// 비밀번호 해시 생성 함수
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
}

// 회원가입
async function register(Group) {
  // salt 값 생성
  const salt = crypto.randomBytes(16).toString('hex');
  // salt랑 password를 해싱
  const hashedPassword = hashPassword(Group.password, salt);
  
  // 기존 group에 password만 대체함. salt도 저장
  const hashAlternative = {
    ...Group,
    password: hashedPassword,
    salt: salt
  };
  
  const createGroup = await groupRepository.create(hashAlternative);
  return groupRepository.registerList(createGroup);
}

// 비밀번호 비교
async function compare(groupId, sendPassword) {
  const findGroup = await groupRepository.findByPasswordAndSalt(groupId);

  // sendPassword랑 db에 있는게 맞는지 비교함.
  const hashedInput = hashPassword(sendPassword.password, findGroup.salt);
  const isMatch = hashedInput === findGroup.password;
  
  // 참일때 한시간 만료인 토큰 생성함.
  if (isMatch) {
    const token = jwt.sign({ groupId: groupId }, JWT_SECRET, { expiresIn: '1h' });
    return { success: true, token };
  }
  return { success: false };
}

// 그룹 공개 여부
async function open(groupId) {
  const findGroup = await groupRepository.findByGroupId(groupId);
  return await groupRepository.findByIsPublic(findGroup);
}

// 그룹 수정
async function fixGroup(groupId, newGroup) {
  const groupData = await groupRepository.findByPasswordAndSalt(groupId);

  if (newGroup.name == null
    || newGroup.password == null
    || newGroup.imageUrl == null
    || newGroup.isPublic == null
    || newGroup.introduction == null) {
    return "wrongResponse";
  }

  // groupPassword가 db에 있는 것과 같은지 비교해보기
  const hashedInput = hashPassword(newGroup.password, groupData.salt);
  const isMatch = hashedInput === groupData.password;
  if (!isMatch) {
    return "wrongPassword";
  }

  // 새 비밀번호도 해시해서 저장
  const newSalt = crypto.randomBytes(16).toString('hex');
  const newHashedPassword = hashPassword(newGroup.password, newSalt);
  newGroup.password = newHashedPassword;
  newGroup.salt = newSalt;

  return await groupRepository.fixByGroupId(groupId, newGroup);
}

// 그룹 삭제
async function deleteGroup(groupId, groupPassword) {
  const groupData = await groupRepository.findByPasswordAndSalt(groupId);
  
  // 비밀번호 비교
  const hashedInput = hashPassword(groupPassword, groupData.salt);
  const isMatch = hashedInput === groupData.password;
  if (!isMatch) {
    return 'wrongError';
  }

  return await groupRepository.deleteByGroupId(groupId);
}

// 그룹 상세정보 조회
async function findDetailGroup(groupId) {
  const detailGroup = await groupRepository.findByGroupId(groupId);
  if (!detailGroup) {
    return 'thereIsNoGroupId';
  }
  return await groupRepository.findDetailByGroupId(groupId);
}

// 그룹 공감하기
async function likeGroupService(groupId) {
  const plusLike = await groupRepository.likeByGroupId(groupId);
}

// 그룹 목록 조회
async function show(keyword, isPublic) {
  return groupRepository.list(keyword, isPublic);
}


//비밀 번호랑 salt 찾기
async function findByPasswordAndSalt(groupId) {
  return await prisma.group.findFirst({
    where: { id: parseInt(groupId, 10) },
    select: { password: true, salt: true }
  });
}

export default {
  register,
  deleteGroup,
  fixGroup,
  show,
  compare,
  open,
  findDetailGroup,
  likeGroupService,
  findByPasswordAndSalt
};