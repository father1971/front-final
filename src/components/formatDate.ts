export function formatDate(date: string) {
  const dateObject = new Date(date);
  const offset = dateObject.getTimezoneOffset();

  const resultDate = new Date(dateObject.getTime());
  resultDate.setMinutes(resultDate.getMinutes() - offset);

  const resultDateString = resultDate.toISOString().slice(0, 19);

  return resultDateString;
}
