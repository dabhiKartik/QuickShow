/** @format */

import { ArrowRight } from "lucide-react";

import BlurCircle from "./BlurCircle";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useAppContext } from "../context/AppContext";
const FeaturedSection = () => {
  const { shows } = useAppContext();
  const navigate = useNavigate();

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-44 overflow-hidden'>
      <div className='relative flex item-center justify-between pt-20 pb-10 '>
        <BlurCircle top='0' right='-80px' />
        <p className='text-gray-300 font-medium text-lg'>Now Showing</p>
        <button
          className='text-[#99A1AF] group  text-sm flex items-center gap-2 hover:text-[rgba(255,255,255,0.8)] '
          onClick={() => navigate("/movies")}
        >
          View All
          <ArrowRight className='group-hover:translate-x-0.5  transition w-4.5 h-4.5' />
        </button>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
        {shows.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>

      <div className='flex justify-center mt-20'>
        <button
          onClick={() => {
            navigate("/movies");
            scrollTo(0, 0);
          }}
          className='px-10 py-3 text-sm  bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer'
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
