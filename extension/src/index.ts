import { fetchPackageDownloadsByPeriods } from '@src/utils/fetchPackageDownloadsByPeriods';
import { renderTotalDownloads } from '@src/utils/renderTotalDownloads';
import { eventHandlers } from '@src/utils/eventHandlers';

const execute = async () => {
  const packageDownloadsByPeriods = await Promise.all(fetchPackageDownloadsByPeriods());

  renderTotalDownloads(packageDownloadsByPeriods);

  eventHandlers(() => {
    void execute();
  });
};

void execute();
