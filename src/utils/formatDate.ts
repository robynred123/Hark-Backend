export const formatDate = (date: string) => {
  return new Date(date).toISOString();
};

export const formatUKDate = (date: string) => {
  const dateTime = date.split(" ");
  // extract month to swap with day
  const splitDate = dateTime[0].split("/");
  const month = splitDate[1];
  // ensure time is parsed as expected
  const hours = dateTime[1].split(":")[0];
  const minutes = dateTime[1].split(":")[1];
  // return new date format as iso string
  return new Date(
    parseInt(splitDate[2]),
    parseInt(month) - 1,
    parseInt(splitDate[0]),
    parseInt(hours),
    parseInt(minutes)
  ).toISOString();
};
