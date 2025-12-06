import { Edit2, Trash2, Check, Image } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteLp, editLp } from '../api/LpApi';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../Context/TokenContext';
import { useState } from 'react';
import LikeButton from './LikeButton';
dayjs.extend(relativeTime);
dayjs.locale('ko');
export default function LPMain({ lp }: { lp: any }) {
  const [isEdit, setIsEdit] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [editingTags, setEditingTags] = useState<string[]>([]);
  const { userMe } = useToken();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [LpTag, setLpTag] = useState('');

  const deletelp = useMutation({
    mutationKey: ['deleteLp'],
    mutationFn: () => deleteLp(lp.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['lp'] });
      alert('Lp가 삭제되었습니다.');
      navigate('/');
    },
    onError: () => alert('삭제 도중 오류가 발생했습니다.'),
  });
  const updateLp = useMutation({
    mutationFn: () =>
      editLp({
        id: lp.id,
        data: {
          title: editingTitle,
          content: editingContent,
          tags: editingTags,
          thumbnail: lp.thumbnail,
          published: true,
        },
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['lp'] });

      alert('LP가 성공적으로 수정되었습니다.');
      setIsEdit(false);
    },
    onError: () => {
      alert('수정 중 오류가 발생했습니다.');
    },
  });

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={lp.author.avatar || 'https://placehold.co/80x80?text=No+Img'}
            alt="작성자 프로필"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-gray-800">{lp.author.name}</p>
            <p className="text-sm text-gray-500">
              {dayjs(lp.updatedAt).fromNow()} 업데이트 됨
            </p>
          </div>
        </div>
        {userMe?.id === lp.author.id && (
          <div className="flex gap-3">
            {isEdit && (
              <>
                <label>
                  <Image
                    size={24}
                    className="cursor-pointer text-gray-500 hover:text-yellow-500"
                  />
                  <input type="file" className="hidden" />
                </label>
              </>
            )}

            <button
              onClick={() => {
                if (isEdit) {
                  updateLp.mutate();
                } else {
                  setEditingTitle(lp.title);
                  setEditingContent(lp.content);
                  setEditingTags(
                    lp.tags.map((t: { id: number; name: string }) => t.name)
                  );
                  setIsEdit(true);
                }
              }}
              className="text-gray-500 hover:text-yellow-500 transition cursor-pointer"
            >
              {isEdit ? <Check size={24} /> : <Edit2 size={20} />}
            </button>

            <button
              onClick={() => {
                if (confirm('정말 이 LP를 삭제하시겠습니까?')) {
                  deletelp.mutate();
                }
              }}
              className="text-gray-500 hover:text-red-500 transition cursor-pointer"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {isEdit ? (
        <input
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          className="border text-2xl font-bold mb-4"
        />
      ) : (
        <h2 className="text-2xl font-bold mb-4">{lp.title}</h2>
      )}
      <img
        src={
          lp.thumbnail
            ? lp.thumbnail
            : 'https://placehold.co/600x400?text=No+Img'
        }
        alt={lp.title}
        className="w-full h-80 object-contain rounded-lg mb-6"
      />
      {isEdit ? (
        <input
          value={editingContent}
          onChange={(e) => setEditingContent(e.target.value)}
          className="border text-2xl font-bold mb-4"
        />
      ) : (
        <p className="text-gray-800 leading-relaxed mb-6">{lp.content}</p>
      )}
      {isEdit ? (
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {editingTags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                #{tag}
                <button
                  className="text-red-500"
                  onClick={() =>
                    setEditingTags(editingTags.filter((_, i) => i !== index))
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="w-60 flex flex-row gap-2">
            <input
              value={LpTag}
              onChange={(e) => setLpTag(e.target.value)}
              placeholder="새 태그 입력"
              className="w-[calc(15rem-4rem-0.5rem)] border rounded border-gray-400 box-border px-2 py-2 focus:border-yellow-500 outline-none"
            />
            <button
              className={`w-16 rounded-sm p-2 text-white cursor-pointer ${
                LpTag.trim() !== ''
                  ? 'bg-yellow-500'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={LpTag.trim() === ''}
              onClick={() => {
                const newTag = LpTag.trim();
                if (newTag !== '' && !editingTags.includes(newTag)) {
                  setEditingTags([...editingTags, newTag]);
                }
                setLpTag('');
              }}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {lp.tags.map((tag: any) => (
            <span
              key={tag.id}
              className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}
      {!isEdit && <LikeButton lpid={lp.id} likes={lp.likes} />}
    </>
  );
}
