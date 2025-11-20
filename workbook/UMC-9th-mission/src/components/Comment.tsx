import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import SortButtons from './SortButtons';
import dayjs from 'dayjs';
import { useToken } from '../Context/TokenContext';
import {
  fetchComments,
  postComment,
  deleteComment,
  editComment,
} from '../api/LpApi';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import { useThrottleFn } from '../hooks/useThrottingFn';
import CommentSkeletonGrid from './CommentSkeleton';
export default function InfiniteComments({ lpId }: { lpId: number }) {
  const { userMe } = useToken();
  const [showmenu, setShowmenu] = useState<number | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const qc = useQueryClient();
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [commentInput, setCommentInput] = useState('');
  const handleScrollFn = useThrottleFn(() => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  }, 2000);

  const toggleMenu = (commentid: number) => {
    if (showmenu === commentid) {
      setShowmenu(null);
      setEditingCommentId(null);
    } else {
      setShowmenu(commentid);
    }
  };

  const handleDeleteComment = useMutation({
    mutationKey: ['deleteComment'],
    mutationFn: deleteComment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments', lpId, order] });
    },
    onError: () => {
      alert('댓글 삭제 실패');
    },
  });

  const handleEditComment = useMutation({
    mutationKey: ['editComment'],
    mutationFn: editComment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments', lpId, order] });
      setEditingCommentId(null);
      setShowmenu(null);
    },
    onError: () => {
      alert('댓글 수정 실패');
    },
  });

  const createComment = useMutation({
    mutationKey: ['createComment'],
    mutationFn: postComment,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['comments', lpId, order] });
      setCommentInput('');
    },
    onError: () => {
      alert('댓글 작성 실패');
      setCommentInput('');
    },
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['comments', lpId, order],
    queryFn: ({ pageParam = 0 }) => fetchComments({ lpId, pageParam, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId,
    staleTime: 1000 * 30, // 30초 동안 캐시 유지
    gcTime: 1000 * 60 * 5, // 5분 동안 캐시 보관
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        handleScrollFn();
        observer.unobserve(sentinelRef.current!);
        setTimeout(() => {
          if (sentinelRef.current) {
            observer.observe(sentinelRef.current);
          }
        }, 1000);
      }
    });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [handleScrollFn]);

  if (isLoading) return <CommentSkeletonGrid count={6} />;
  if (isError)
    return (
      <div className="text-center text-red-500">
        댓글 로드 실패
        <button
          onClick={() => refetch()}
          className="mt-2 px-3 py-1 bg-yellow-400 text-white rounded"
        >
          재시도
        </button>
      </div>
    );

  const allComments = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div className="mt-6">
      <SortButtons sort={order} setSort={setOrder} />

      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="댓글을 입력하세요."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && commentInput.trim()) {
              createComment.mutate({
                lpid: lpId,
                content: commentInput.trim(),
              });
            }
          }}
        />
        <button
          disabled={createComment.isPending}
          className={`px-4 py-2 rounded-lg text-white transition ${
            createComment.isPending
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-yellow-400 hover:bg-yellow-500'
          }`}
          onClick={() => {
            if (!commentInput.trim()) return;
            createComment.mutate({ lpid: lpId, content: commentInput.trim() });
          }}
        >
          {createComment.isPending ? '등록 중...' : '등록'}
        </button>
      </div>

      <div className="space-y-4">
        {allComments.map((c) => (
          <div key={c.id} className="border-b pb-3">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <img
                  src={
                    c.author.avatar || 'https://placehold.co/40x40?text=No+Img'
                  }
                  alt={c.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="font-medium">{c.author.name}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {dayjs(c.createdAt).fromNow()}
                  </span>
                  {userMe?.id === c.author.id && (
                    <button
                      onClick={() => toggleMenu(c.id)}
                      className="p-1 text-yellow-500 hover:text-gray-700 cursor-pointer"
                    >
                      <MoreVertical size={20} />
                    </button>
                  )}
                </div>
                {showmenu === c.id && (
                  <div className="mt-1 flex gap-2">
                    <button
                      className="text-sm text-yellow-500 cursor-pointer"
                      onClick={() => {
                        setEditingCommentId(c.id);
                        setEditingContent(c.content);
                      }}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-sm text-red-500 cursor-pointer"
                      onClick={() => {
                        if (confirm('댓글을 삭제하시겠습니까?'))
                          handleDeleteComment.mutate({
                            lpid: lpId,
                            commentid: c.id,
                          });
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {editingCommentId === c.id && showmenu ? (
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && editingContent.trim()) {
                      handleEditComment.mutate({
                        lpid: lpId,
                        commentid: c.id,
                        content: editingContent.trim(),
                      });
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (editingContent.trim()) {
                      handleEditComment.mutate({
                        lpid: lpId,
                        commentid: c.id,
                        content: editingContent.trim(),
                      });
                    }
                  }}
                  className="text-sm text-yellow-500 cursor-pointer"
                >
                  저장
                </button>
                <button
                  onClick={() => setEditingCommentId(null)}
                  className="text-sm text-red-500 cursor-pointer"
                >
                  취소
                </button>
              </div>
            ) : (
              <p className="text-gray-700 mt-2">{c.content}</p>
            )}
          </div>
        ))}
      </div>

      <div ref={sentinelRef} className="h-4" />
      <div className="py-2 text-center text-gray-500">
        {isFetchingNextPage ? (
          <CommentSkeletonGrid count={3} />
        ) : hasNextPage ? (
          '스크롤하면 더 불러와요'
        ) : (
          '모든 댓글을 불러왔습니다'
        )}
      </div>
    </div>
  );
}
