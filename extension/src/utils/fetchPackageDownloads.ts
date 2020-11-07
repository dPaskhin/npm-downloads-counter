import { getPackageName } from '@src/utils/getPackageName';
import { Periods } from '@src/enums/Periods';

export const fetchPackageDownloads = async (period: Periods): Promise<number> => {
  const packageName = getPackageName();
  const response = await fetch(`https://api.npmjs.org/downloads/point/${period}/${packageName}`);
  const responseJson = await response.json();

  return responseJson.downloads || 0;
};
