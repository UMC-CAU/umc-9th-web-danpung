import { useReducer } from "react";
interface StateType {
  count: number;
}
type ActionType =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };
const initalState: StateType = { count: 0 };

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initalState;
    default:
      throw new Error();
  }
}
const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <div className="h-screen flex flex-col justify-center items-center align-center">
      <h1 className="flex size-20 rounded-sm bg-green-500 justify-center items-center">
        {state.count}
      </h1>
      <div className="flex flex-row gap-4">
        <button
          onClick={() => dispatch({ type: "increment" })}
          className="size-10 rounded-xl bg-yellow-500"
        >
          +1
        </button>
        <button
          onClick={() => dispatch({ type: "decrement" })}
          className="size-10 rounded-xl bg-yellow-500"
        >
          -1
        </button>
        <button
          onClick={() => dispatch({ type: "reset" })}
          className="size-10 rounded-xl bg-yellow-500"
        >
          reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
