import { Periods } from '@src/enums/Periods';

const periodNames = {
  [Periods.LAST_DAY]: 'Last day',
  [Periods.LAST_WEEK]: 'Last week',
  [Periods.LAST_MONTH]: 'Last month',
  [Periods.LAST_YEAR]: 'Last year',
};

export const getPeriodNameByPeriod = (period: Periods): string => periodNames[period];
