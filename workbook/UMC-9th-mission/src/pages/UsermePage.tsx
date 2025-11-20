import { editUserMe, fetchUserMe } from '../api/LpApi';
import type { IUserMe } from '../types/LP';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Error from '../components/Error';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Check, Edit2 } from 'lucide-react';
import { useToken } from '../Context/TokenContext';

const UsermePage = () => {
  const { setUserMe } = useToken();
  const [isEdit, setIsEdit] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [editingBio, setEditingBio] = useState('');
  const [editingAvatar, setEditingAvatar] = useState('');
  const qc = useQueryClient();

  const updateUserMe = useMutation({
    mutationFn: async (newUser: any) => {
      return await editUserMe(newUser);
    },

    onMutate: async (newUser: any) => {
      await qc.cancelQueries({ queryKey: ['MyInfo'] });
      const cached = qc.getQueryData<IUserMe>(['MyInfo']);
      const previousUser =
        cached ?? (typeof data !== 'undefined' ? data : null);

      const optimisticUser = {
        ...((previousUser as IUserMe) ?? {}),
        ...newUser,
      } as IUserMe;

      qc.setQueryData<IUserMe>(['MyInfo'], optimisticUser);

      try {
        setUserMe(optimisticUser);
      } catch {
        /* ignore */
      }

      setIsEdit(false);

      return { previousUser };
    },

    onError: (_error, _variables, context) => {
      setIsEdit(false);
      if (context?.previousUser) {
        qc.setQueryData(['MyInfo'], context.previousUser);
        try {
          setUserMe(context.previousUser as IUserMe);
        } catch {
          //무시
        }
      } else {
        qc.invalidateQueries({ queryKey: ['MyInfo'] });
      }

      alert('정보 수정 오류');
    },

    onSuccess: (updatedUserMe: IUserMe) => {
      qc.invalidateQueries({ queryKey: ['MyInfo'] });
      setUserMe(updatedUserMe);

      setEditingName('');
      setEditingBio('');
      setIsEdit(false);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['MyInfo'] });
    },
  });

  const { data, isLoading, isError } = useQuery<IUserMe>({
    queryKey: ['MyInfo'],
    queryFn: fetchUserMe,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <Error />;

  return (
    <div className="flex flex-col gap-y-5 items-center mt-20 relative">
      <button
        onClick={() => {
          if (isEdit) {
            if (!editingName.trim()) {
              alert('이름을 작성해주세요!');
              return;
            }

            const payload = {
              name: editingName.trim(),
              bio: editingBio.trim(),
              avatar: editingAvatar.trim(),
            };

            updateUserMe.mutate(payload);
          } else {
            setEditingName(data?.name ?? '');
            setEditingBio(data?.bio ?? '');
            setEditingAvatar(data?.avatar ?? '');
            setIsEdit(true);
          }
        }}
        className="cursor-pointer hover:text-yellow-500 absolute top-0 right-100"
      >
        {isEdit ? <Check size={24} /> : <Edit2 size={24} />}
      </button>

      {isEdit ? (
        <label className="size-10 rounded-full bg-gray-500 block cursor-pointer">
          <input type="file" className="hidden" />
        </label>
      ) : (
        <img
          src={data?.avatar || 'https://placehold.co/40x40?text=No+Img'}
          alt={data?.name}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}

      <div className="flex gap-x-2">
        <label>이름 :</label>
        {isEdit ? (
          <input
            value={editingName}
            onChange={(e) => setEditingName(e.target.value)}
            className="w-40 border rounded border-gray-400 box-border px-2 py-1 focus:border-yellow-500 outline-none pr-10"
          />
        ) : (
          <p>{data?.name}</p>
        )}
      </div>

      <div className="flex gap-x-2">
        <label>자기소개:</label>
        {isEdit ? (
          <input
            value={editingBio}
            onChange={(e) => setEditingBio(e.target.value)}
            className="w-40 border rounded border-gray-400 box-border px-2 py-1 focus:border-yellow-500 outline-none pr-10"
          />
        ) : (
          <p>{data?.bio === '' ? '자기소개 없음' : data?.bio}</p>
        )}
      </div>

      <p>이메일 : {data?.email}</p>
      <p>
        계정 생성일 :{' '}
        {data?.createdAt
          ? dayjs(data.createdAt).format('YYYY년 MM월 DD일')
          : '-'}
      </p>
    </div>
  );
};

export default UsermePage;
