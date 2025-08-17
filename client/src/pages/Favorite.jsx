/** @format */

import MovieCard from "../components/MovieCard";
import BlurCircle from "../components/BlurCircle";
import { useAppContext } from "../context/AppContext";

const Favorite = () => {
  const { favoriteMovies } = useAppContext();

  return favoriteMovies.length > 0 ? (
    <div className='relative md:px-16 lg:px-24 xl:px-44 my-40 mb-20 overflow-hidden  min-h-[80vh]'>
      <BlurCircle top='150px' left='0px' />
      <BlurCircle bottom='100px' right='50px' />
      <h1 className='text-lg font-medium py-4'>Your Favorite Movies</h1>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
        {favoriteMovies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-3xl font-bold text-center'>NO MOVIES AVAILABLE</h1>
    </div>
  );
};

export default Favorite;
