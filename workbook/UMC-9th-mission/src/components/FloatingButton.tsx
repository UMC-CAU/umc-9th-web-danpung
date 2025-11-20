import { Plus } from 'lucide-react';
import { useState } from 'react';
import { XCircle } from 'lucide-react';
import { createLp } from '../api/LpApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const FloatingButton = () => {
  const qc = useQueryClient();
  const [LpName, setLpName] = useState('');
  const [LpContent, setLpContent] = useState('');
  const [LpTag, setLpTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const isAddLPEnabled = LpName.trim() !== '' && LpContent.trim() !== '';
  const isAddTagEnabled = LpTag.trim() !== '';

  const [isopen, setIsopen] = useState(false);
  const handleClick = () => {
    if (isopen) {
      setLpName('');
      setLpContent('');
      setLpTag('');
      setTags([]);
    }
    setIsopen(!isopen);
  };

  const handleAddTag = () => {
    const newTag = LpTag.trim();
    if (newTag === '' || tags.includes(newTag)) {
      setLpTag('');
      return;
    }
    setTags([...tags, newTag]);
    setLpTag('');
  };

  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };
  const create = useMutation({
    mutationKey: ['createLp'],
    mutationFn: createLp,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['lps'] });
      setIsopen(false);
      alert('Lp 추가 완료!');
    },
    onError: () => {
      alert('Lp 추가에 실패했습니다. 다시 시도해 주세요.');
      setIsopen(false);
    },
    onSettled: () => {
      setLpName('');
      setLpContent('');
      setLpTag('');
      setTags([]);
    },
  });
  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-8 right-8
    bg-yellow-400 hover:bg-yellow-500
    hover:scale-110
    text-white rounded-full shadow-lg
    w-14 h-14 flex items-center justify-center
    transition-all duration-200"
      >
        <Plus size={28} />
      </button>

      {isopen && (
        <div
          onClick={handleClick}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="flex relative w-110 h-140 bg-white flex flex-col items-center gap-y-4"
          >
            <button
              onClick={handleClick}
              className="absolute right-0 p-2 hover:text-yellow-500 cursor-pointer"
            >
              <XCircle size={24} />
            </button>
            <label className=" size-45 rounded-full bg-gray-500 mt-5 cursor-pointer">
              <input type="file" className="hidden" />
            </label>

            <input
              value={LpName}
              onChange={(e) => setLpName(e.target.value)}
              placeholder="LP Name"
              className="w-60 border rounded border-gray-400 box-border px-2 py-2 focus:border-green-500 outline-none pr-10"
            />
            <input
              value={LpContent}
              onChange={(e) => setLpContent(e.target.value)}
              placeholder="LP Content"
              className="w-60 border rounded border-gray-400 box-border px-2 py-2 focus:border-green-500 outline-none pr-10"
            />
            <div className="w-60 flex flex-row gap-2">
              <input
                value={LpTag}
                onChange={(e) => setLpTag(e.target.value)}
                placeholder="LP Tag"
                className="w-[calc(15rem-4rem-0.5rem)] border rounded border-gray-400 box-border px-2 py-2 focus:border-green-500 outline-none pr-10"
              />
              <button
                className={`w-16 rounded-sm p-2 text-white cursor-pointer ${
                  isAddTagEnabled
                    ? 'bg-yellow-500'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!isAddTagEnabled}
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-2 py-1 rounded"
                >
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className="ml-1 hover:text-red-500"
                  >
                    <XCircle size={16} />
                  </button>
                </div>
              ))}
            </div>

            <button
              className={`w-60 p-2 rounded text-white cursor-pointer ${
                isAddLPEnabled
                  ? 'bg-yellow-500'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              onClick={() => {
                if (!isAddLPEnabled) return;
                create.mutate({
                  title: LpName.trim(),
                  content: LpContent.trim(),
                  thumbnail: '',
                  tags,
                  published: true,
                });
              }}
            >
              Add LP
            </button>
          </section>
        </div>
      )}
    </>
  );
};
export default FloatingButton;
