import { Edit2, Trash2, Heart } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.extend(relativeTime);
dayjs.locale("ko");
export default function LPMain({ lp }: { lp: any }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={lp.author.avatar || "https://placehold.co/80x80?text=No+Img"}
            alt="작성자 프로필"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <p className="font-bold text-gray-800">{lp.author.name}</p>
            <p className="text-sm text-gray-500">
              {dayjs(lp.updatedAt).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="text-gray-500 hover:text-yellow-500 transition">
            <Edit2 size={20} />
          </button>
          <button className="text-gray-500 hover:text-red-500 transition">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">{lp.title}</h2>
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-80 object-contain rounded-lg mb-6"
      />
      <p className="text-gray-800 leading-relaxed mb-6">{lp.content}</p>

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

      <div className="flex items-center gap-2">
        <Heart size={22} className="text-red-500" />
        <span className="text-gray-700 font-medium">
          {lp.likes.length}개 좋아요
        </span>
      </div>
    </>
  );
}
