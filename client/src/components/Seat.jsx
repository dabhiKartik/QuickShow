/** @format */

import React from "react";
import { assets } from "../assets/assets";

const Seat = () => {
  const row = ["A", "B", "C", "D", "E", "F", "G"];
  const col = 9;
  return (
    <div className='flex-1 my-10'>
      <div className='flex flex-col justify-center items-center'>
        <p className='font-semibold text-2xl my-4 mb-10'>Select Your Seat</p>
        <img src={assets.screenImage} alt='' />
        <p className='font-semibold text-xs'>SCREEN SIDE</p>
      </div>

      <div className='grid grid-cols-2 gap-4 items-center '>
        <div className='w-full   col-span-2'>
          <ol>
            {row.map((curRow) => (
              <li>
                <p> {curRow}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className='w-5 h-5 bg-primary-dull'></div>
        <div className='w-5 h-5 bg-primary-dull'></div>
        <div className='w-5 h-5 bg-primary-dull'></div>
        <div className='w-5 h-5 bg-primary-dull'></div>
      </div>
    </div>
  );
};

export default Seat;
