import { useReducer, useState } from "react";
interface IState {
  department: string;
  error: string | null;
}
interface IAction {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload?: string;
}
function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_DEPARTMENT": {
      const newDepartment = payload;
      const hasError = newDepartment !== "카드메이커";
      return {
        ...state,
        department: hasError ? state.department : payload,
        error: hasError
          ? "거부권 행사가능, 카드메이커로만 변경 가능합니다."
          : null,
      };
    }

    default:
      return state;
  }
}

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, {
    department: "software engineer",
    error: null,
  });
  const [department, setDepartment] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen ">
        <h1 className="text-3xl font-bold">{state.department}</h1>
        {state.error && <p className="text-red-500 font-2xl">{state.error}</p>}
        <input
          type="text"
          value={department}
          onChange={handleChange}
          placeholder="변경하시고 싶은 직무를 입력해주세요. 단 거부권 행사 가능"
          className="w-120 border-2 border-black rounded-md p-4 mt-4"
        />
        <button
          onClick={() =>
            dispatch({ type: "CHANGE_DEPARTMENT", payload: department })
          }
          className="text-black"
        >
          직무 변경하기
        </button>
      </div>
    </>
  );
}
