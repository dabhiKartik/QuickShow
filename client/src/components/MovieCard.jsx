/** @format */

import React from "react";
import { StarIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { timeFormate } from "../lib/TimeFormate";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-between p-3 bg-gray-800 rounded-xl hover:-translate-y-1 transition duration-300'>
      <img
        className='w-full h-48 sm:h-52 rounded-lg object-cover object-right-bottom cursor-pointer'
        src={movie.poster_path}
        alt={movie.title}
      />
      <h3 className='truncate font-semibold mt-2 text-sm'>{movie.title}</h3>
      <p className='text-xs text-gray-400 mt-1 leading-tight'>
        {new Date(movie.release_date).getFullYear()}
        {" - "}
        {movie.genres
          .slice(0, 2)
          .map((curName) => curName.name)
          .join(",")}
        {" - "} {timeFormate(movie.runtime)}
      </p>

      <div className='flex items-center justify-between mt-3 pb-2'>
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className='px-3 py-1.5 text-xs bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer'
        >
          Buy Ticket
        </button>
        <p className='flex items-center gap-1 text-[#797B7D] text-xs pr-1'>
          <StarIcon className='text-primary fill-primary w-3.5 h-3.5' />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
