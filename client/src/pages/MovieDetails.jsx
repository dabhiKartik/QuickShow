/** @format */

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import BlurCircle from "../components/BlurCircle";
import { Heart, PlayCircle, StarIcon } from "lucide-react";
import { dateFormate, timeFormate } from "../lib/TimeFormate";
import DateSelect from "../components/DateSelect";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const navigate = useNavigate();
  const {
    axios,
    getToken,
    shows,
    image_url,
    favoriteMovies,
    fetchFavoriteMovies,
  } = useAppContext();
  const getShow = async () => {
    const { data } = await axios.get(`/api/show/${id}`);

    if (data.status.code === 200) {
      setShow(data);
    }
  };

  const updateFavorite = async () => {
    const { data } = await axios.post(
      "/api/user/update-favorite",
      { movieId: id },
      {
        headers: { Authorization: `Bearer ${await getToken()}` },
      }
    );

    if (data.status.code === 200) {
      await fetchFavoriteMovies();
      toast.success("Favorite added successfully.");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className=' px-6 md:px-16 lg:px-40  pt-30 md:pt-50'>
      <div className='flex flex-col md:flex-row gap-8 max-w-6xl '>
        <img
          src={image_url + show.movie.poster_path}
          alt={show.movie.title}
          className='max-md:mx-auto rounded-xl h-104 max-w-70 object-cover'
        />
        <div className='relative flex flex-col gap-3'>
          <BlurCircle top='-100px' left='-100px' />

          <p className=' text-primary'>{show.movie.original_language}</p>
          <h1 className='font-semibold text-4xl leading-normal  max-w-96 text-balance'>
            {show.movie.title}
          </h1>

          <div className='flex gap-2 text-[#D1D5DC] text-sm items-center'>
            <StarIcon className='w-5 h-5 fill-primary text-primary' />
            {show.movie.vote_average.toFixed(1)} IMDb Rating
          </div>
          <p className='mt-2 text-[#99A1AF] text-sm  max-w-xl leading-tight'>
            {show.movie.overview}
          </p>
          <p className='text-[#D1D5DC] font-normal'>
            {timeFormate(show.movie.runtime)} -{" "}
            {show.movie.genres.map((genre) => genre.name).join(" | ")} -{" "}
            {dateFormate(show.movie.release_date)}
          </p>

          <div className='mt-4 flex  items-center flex-wrap gap-4'>
            <button className='flex items-center gap-2 px-7 py-3 text-sm bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95'>
              <PlayCircle className='w-5 h-5' />
              Watch Trailer
            </button>
            <a
              href='#dateSelect'
              className='  px-10 py-3 text-sm bg-primary hover:bg-primary-dull transition rounded-md font-medium cursor-pointer active:scale-95'
            >
              Buy Tickets
            </a>
            <button
              onClick={updateFavorite}
              className='bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95'
            >
              <Heart
                className={`w-5 h-5 ${
                  favoriteMovies.find((movie) => movie._id == id)
                    ? "fill-primary text-primary"
                    : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <h1 className='text-lg font-medium mt-20  '>Your Favorite Cast</h1>
      <div className=' overflow-x-auto no-scrollbar mt-8 pb-4'>
        <div className='w-max flex items-center gap-4 px-4'>
          {show.movie.casts.map((cast, index) => (
            <div key={index} className='flex flex-col items-center text-center'>
              <img
                src={
                  cast.profile_path == null
                    ? assets.profile
                    : image_url + cast.profile_path
                }
                alt=''
                className='rounded-full h-20 md:h-20 aspect-square object-cover'
              />
              <p className='font-medium text-xs mt-3'>{cast.name}</p>
              <p className='font-medium text-gray-500 text-xs '>
                {cast.character}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div
        className='
      mt-10'
      >
        <DateSelect dateTime={show.dateTime} id={id} />
      </div>
      <p
        className='text-gray-300
       font-bold text-xl mt-30'
      >
        You May Also Like
      </p>
      <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
        {shows.slice(0, 4).map((movie) => (
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
  ) : (
    <div>
      <Loading />
    </div>
  );
};

export default MovieDetails;
