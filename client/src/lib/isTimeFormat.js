export const  isTimeFormat=(DateTime)=>{
return new Date(DateTime).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                   }

                   