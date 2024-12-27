export function getDate(data: any) {
  const originalDate = new Date(data);

  const options: any = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("id", options).format(
    originalDate
  );

  return formattedDate;
}
