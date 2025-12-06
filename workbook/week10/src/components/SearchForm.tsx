import { useEffect, useState } from "react";
import useStore from "../features/useMovieStore";
import { useDebounce } from "../hooks/useDebounce";
import { BiSolidCameraMovie } from "react-icons/bi";
import { GrSettingsOption } from "react-icons/gr";
import { GrLanguage } from "react-icons/gr";
const SearchForm = () => {
  const {
    searchQuery,
    setSearchQuery,
    includeAdult,
    toggleIncludeAdult,
    language,
    setLanguage,
  } = useStore();
  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedValue = useDebounce(inputValue, 300);
  useEffect(() => {
    setSearchQuery(debouncedValue);
  }, [debouncedValue, setSearchQuery]);
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-center gap-x-20">
        <form className="flex flex-col items-center">
          <span className="flex flex-row items-center gap-2 mb-2 text-xl font-bold  ">
            {" "}
            <BiSolidCameraMovie />
            영화제목
          </span>
          <input
            type="text"
            placeholder="영화 제목을 입력하세요"
            className="border px-2"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <div className="flex flex-col items-center">
          <span className="flex flex-row items-center gap-2 mb-2 text-xl font-bold  ">
            {" "}
            <GrSettingsOption />
            옵션
          </span>
          <label className="flex flex-row gap-4 border px-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeAdult}
              onChange={toggleIncludeAdult}
            />
            성인 콘텐츠 표시
          </label>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4 px-2 w-fit mx-auto">
        <span className="flex flex-row gap-3 items-center">
          <GrLanguage className="text-blue-500" />
          언어
        </span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-3"
        >
          <option value="en-US">English</option>
          <option value="ko-KR">한국어</option>
          <option value="ja-JP">日本語</option>
        </select>
      </div>
    </div>
  );
};

export default SearchForm;
