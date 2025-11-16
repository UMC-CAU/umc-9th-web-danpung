import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLikes, deleteLikes } from "../api/LpApi";
import { useToken } from "../Context/TokenContext";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  lpid: number;
  likes: { userId: number }[];
}

const LikeButton = ({ lpid, likes }: LikeButtonProps) => {
  const { userMe } = useToken();
  const qc = useQueryClient();

  const isUserLiked = likes.some((like) => like.userId === userMe?.id);

  const mutation = useMutation({
    mutationFn: (willLike: boolean) =>
      willLike ? updateLikes(lpid) : deleteLikes(lpid),

    onMutate: async (willLike) => {
      await qc.cancelQueries({ queryKey: ["lp", String(lpid)] });

      const previous = qc.getQueryData(["lp", String(lpid)]);

      qc.setQueryData(["lp", String(lpid)], (old: any) => {
        if (!old) return old;
        const data = old.data;
        const currentLikes = data.likes || [];

        let newLikes;
        if (willLike) {
          newLikes = [
            ...currentLikes,
            { id: Date.now(), userId: userMe?.id, lpid },
          ];
        } else {
          newLikes = currentLikes.filter(
            (like: any) => like.userId !== userMe?.id
          );
        }

        return {
          ...old,
          data: {
            ...data,
            likes: newLikes,
          },
        };
      });

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        qc.setQueryData(["lp", String(lpid)], context.previous);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["lp", String(lpid)] });
    },
  });

  return (
    <button onClick={() => mutation.mutate(!isUserLiked)}>
      <Heart
        className={`w-6 h-6 cursor-pointer transition-all ${
          isUserLiked ? "fill-red-500 text-red-500 scale-110" : "fill-none"
        }`}
      />
    </button>
  );
};

export default LikeButton;
