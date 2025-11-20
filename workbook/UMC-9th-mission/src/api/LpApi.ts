import type { ILpRequest, ILpResponse, IComment, LP } from '../types/LP';
import api from './axiosInstance';
const PAGE_SIZE = 5;
export const fetchUserMe = async () => {
  const response = await api.get(`/v1/users/me`);
  if (!response.data.status) throw new Error('유저 정보 불러오기 실패');
  return response.data.data;
}; //유저 정보 불러오기
export const editUserMe = async ({
  name,
  bio,
  avatar,
}: {
  name: string;
  bio?: string;
  avatar?: string;
}) => {
  const response = await api.patch(`v1/users`, { name, bio, avatar });
  if (!response.status) throw new Error('유저 정보 수정 실패');
  return response.data.data;
};

/////////////////////////////////////////LP//////////////////////////////
export const fetchLP = async ({
  pageParam = 0,
  search,
  order = 'desc',
}: {
  pageParam?: number;
  search?: string;
  order?: 'asc' | 'desc';
}) => {
  const PAGE_SIZE = 10;
  const res = await api.get('/v1/lps', {
    params: {
      cursor: pageParam,
      limit: PAGE_SIZE,
      order,
      ...(search ? { search } : {}),
    },
  });

  if (!res.data.status) throw new Error('데이터 가져오기 실패');

  return {
    data: res.data.data.data as LP[],
    nextCursor: res.data.data.nextCursor,
    hasNext: res.data.data.hasNext,
  };
}; //LP 불러오기
export const createLp = async (Lp: ILpRequest): Promise<ILpResponse> => {
  const response = await api.post<ILpResponse>('/v1/lps', Lp);
  return response.data;
}; //LP 생성
export const deleteLp = async (Lpid: number) => {
  const response = await api.delete(`/v1/lps/${Lpid}`);
  return response.data.data;
}; //LP 제거
export const editLp = async ({
  id,
  data,
}: {
  id: number;
  data: ILpRequest;
}): Promise<ILpResponse> => {
  const res = await api.patch(`/v1/lps/${id}`, data);
  return res.data;
}; //LP 수정

//////////////////////////////////////////댓글////////////////////////////////
export const fetchComments = async ({
  lpId,
  pageParam = 0,
  order = 'desc',
}: {
  lpId: number;
  pageParam?: number;
  order?: 'asc' | 'desc';
}) => {
  const res = await api.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor: pageParam, limit: PAGE_SIZE, order },
  });
  if (!res.data.status) throw new Error('댓글 가져오기 실패');

  return {
    data: res.data.data.data as IComment[],
    nextCursor: res.data.data.nextCursor,
    hasNext: res.data.data.hasNext,
  };
}; //댓글 불러오기
export const postComment = async ({
  lpid,
  content,
}: {
  lpid: number;
  content: string;
}) => {
  const res = await api.post(`/v1/lps/${lpid}/comments`, { content });
  if (!res.data.status) throw new Error('댓글 작성 실패');
  return res.data.data;
}; //댓글 생성하기

export const deleteComment = async ({
  lpid,
  commentid,
}: {
  lpid: number;
  commentid: number;
}) => {
  const res = await api.delete(`/v1/lps/${lpid}/comments/${commentid}`);
  if (!res.data.status) throw new Error('댓글 삭제 실패');
}; //댓글 제거하기
export const editComment = async ({
  lpid,
  commentid,
  content,
}: {
  lpid: number;
  commentid: number;
  content: string;
}) => {
  const res = await api.patch(`/v1/lps/${lpid}/comments/${commentid}`, {
    content,
  });
  if (!res.data.status) throw new Error('댓글 수정 실패');
  return res.data.data;
}; //댓글 수정하기
////////////////////////////////////////////////좋아요//////////////////////
export const updateLikes = async (lpid: number) => {
  const res = await api.post(`/v1/lps/${lpid}/likes`);
  if (!res.data.status) throw new Error('좋아요 추가 실패');
  return res.data.data;
};
export const deleteLikes = async (lpid: number) => {
  const res = await api.delete(`/v1/lps/${lpid}/likes`);
  if (!res.data.status) throw new Error('종아요 취소 실패');
  return res.data.data;
};
