import colors from 'colors';
import Table from 'cli-table';

export function format(days) {
  const formattedDays = [];

  for (let i = 0; i < days.length; i += 7) {
    const arr = days.slice(i, i + 7);

    const calendarDays = arr.map((day) => (day.isSameMonth ? day.date : ''));

    formattedDays.push(calendarDays);
  }

  return formattedDays;
}

export function display(days = []) {
  const table = new Table();

  const headers = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    .map(day => colors.green.bold(day));

  table.push(headers);

  const formattedDays = format(days);

  formattedDays.forEach((dayArray) => table.push(dayArray));

  console.log(table.toString());
}
