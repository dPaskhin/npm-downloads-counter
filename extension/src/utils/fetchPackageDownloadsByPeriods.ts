import { getPackageName } from '@src/utils/getPackageName';
import { Period } from '@src/enums/Period';
import { IPeriodDownload } from '@src/interfaces/IPeriodDownload';

export const fetchPackageDownloadsByPeriods = (): Array<Promise<IPeriodDownload>> => {
  const packageName = getPackageName();

  return Object.values(Period).map(async (period) => {
    const response = await fetch(`https://api.npmjs.org/downloadss/point/${period}/${packageName}`);
    const responseJson = await response.json() as { downloads?: number };

    return {
      period,
      downloads: responseJson.downloads || 0,
    };
  });
};
