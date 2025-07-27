 export const timeFormate=(minutes)=>{

    return `${Math.floor(minutes /60) }h ${minutes % 60}m`;
 }


export const dateFormate=(date)=>{

  const releaseDate = new Date(date);
const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString("default", {
  month: "short",
})}, ${releaseDate.getFullYear()}`;

return formattedDate;
 }


export const dateSelect = (date) => {
  const showDate = new Date(date);
  const weekday = showDate.toLocaleString("default", { weekday: "short" });
  const day = showDate.getDate(); 
  return `${weekday} ${day}`;
};






