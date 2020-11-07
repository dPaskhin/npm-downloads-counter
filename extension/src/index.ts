import { Periods } from '@src/enums/Periods';
import { IPeriodDownload } from '@src/interfaces/IPeriodDownload';
import { fetchPackageDownloads } from '@src/utils/fetchPackageDownloads';
import { renderTotalDownloads } from '@src/utils/renderTotalDownloads';

const execute = async () => {
  const downloadsFetchList = Object.values(Periods).map(fetchPackageDownloads);
  const downloadsList = await Promise.all(downloadsFetchList);
  const totalDownloads = Object
    .values(Periods)
    .map<IPeriodDownload>((period, idx) => ({
      downloads: downloadsList[idx],
      period,
    }));

  renderTotalDownloads(totalDownloads, execute);
};

execute();
