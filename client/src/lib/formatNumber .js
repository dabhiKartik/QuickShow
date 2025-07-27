export const formatNumber = (num) => {
 if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }

  if (num >= 1000000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
 
  return num.toString();
};
