
export const isDateFormat = (value) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(value);
}

export const formatDateString = (value) => {
  const [ year, month, day ] = value.split('-');
  return `${day}-${month}-${year}`;
}