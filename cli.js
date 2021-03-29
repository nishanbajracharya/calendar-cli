import { Command } from 'commander';

import { display } from './format';
import { getCalendar } from './index';

const program = new Command()
  .arguments('[date]')
  .action(date => {
    const dateObj = date ? new Date(date) : new Date();
    console.log(dateObj.toDateString());

    const calendar = getCalendar(dateObj);

    display(calendar.daysWithPadding);
  }).parse();