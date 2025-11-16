import { X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useToken } from "../Context/TokenContext";
interface DeleteUserProps {
  isDelete: boolean;
  setIsDelete: (value: boolean) => void;
}
const DeleteUser = ({ isDelete, setIsDelete }: DeleteUserProps) => {
  const qc = useQueryClient();
  const { logout } = useToken();
  const navigate = useNavigate();
  const handleClick = () => {
    setIsDelete(!isDelete);
  };
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert("회원탈퇴 완료!");
      logout();
      qc.invalidateQueries();
      navigate("/");
    },
    onError: () => {
      alert("회원탈퇴 중 에러가 발생하였습니다. 다시 시도해 주세요.");
    },
    onSettled: () => {
      setIsDelete(false);
    },
  });
  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 bg-black/50 z-100 flex justify-center items-center"
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-6">정말 탈퇴하시겠습니까?</h2>
        <button onClick={handleClick}>
          <X size={20} />
        </button>
        <div className="flex flex-row justify-center gap-5">
          <button
            onClick={() => deleteUserMutation.mutate()}
            className="w-15 h-10 bg-red-500 rounded-xl"
          >
            탈퇴
          </button>
          <button
            onClick={handleClick}
            className="w-15 h-10 bg-yellow-500 rounded-xl"
          >
            취소
          </button>
        </div>
      </section>
    </div>
  );
};
export default DeleteUser;
