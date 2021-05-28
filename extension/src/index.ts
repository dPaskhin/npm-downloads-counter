import { fetchPackageDownloadsByPeriods } from '@src/utils/fetchPackageDownloadsByPeriods';
import { renderTotalDownloads } from '@src/utils/renderTotalDownloads';
import { eventHandlers } from '@src/utils/eventHandlers';

const execute = async () => {
  try {
    const packageDownloadsByPeriods = await Promise.all(fetchPackageDownloadsByPeriods());

    renderTotalDownloads(packageDownloadsByPeriods);

    eventHandlers(() => {
      void execute();
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

void execute();
