export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const calculateRemainingYears = (finishDate: string) => {
  const currentDate = new Date();
  const finish = new Date(finishDate);
  const remainingTime = finish.getTime() - currentDate.getTime();
  const remainingYears = Math.ceil(remainingTime / (1000 * 60 * 60 * 24 * 365));
  return remainingYears;
};
