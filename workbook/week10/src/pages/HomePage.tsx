import MovieList from "../components/MovieList";
import SearchForm from "../components/SearchForm";

const HomePage = () => {
  return (
    <div>
      <SearchForm />
      <MovieList />
    </div>
  );
};

export default HomePage;
