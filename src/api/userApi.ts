import axiosInstance from '../../axiosInstance';

// 내 기본 사용자 정보 조회
export const getMyInfo = (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axiosInstance.get('/user/me', { headers });
};

// 내 프로필 상세 정보 조회
export const getMyProfile = (token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axiosInstance.get('/user/me/profile', { headers });
};

// 내 프로필 정보 수정
export const updateMyProfile = (data: { nickname?: string; name?: string; phone?: string }, token?: string) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axiosInstance.patch('/user/me/profile', data, { headers });
};

// 비밀번호 변경
export const changePassword = (data: { oldPassword: string; newPassword: string }) =>
  axiosInstance.post('/user/change-password', data);

// 프로필 이미지 업로드
export const uploadProfileImage = (formData: FormData) =>
  axiosInstance.post('/user/me/profile-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// 프로필 이미지 삭제
export const deleteProfileImage = () =>
  axiosInstance.delete('/user/me/profile-image');
