enum Periods {
  LAST_DAY = 'last-day',
  LAST_WEEK = 'last-week',
  LAST_MONTH = 'last-month',
  LAST_YEAR = 'last-year',
}

const periodNames = {
  [Periods.LAST_DAY]: 'Last day',
  [Periods.LAST_WEEK]: 'Last week',
  [Periods.LAST_MONTH]: 'Last month',
  [Periods.LAST_YEAR]: 'Last year',
};

interface IPeriodDownload {
  downloads: number;
  period: Periods;
}

const packageName = location.pathname.replace(/\/\w+\//, '');

const fetchPackageDownLoads = async (period: Periods): Promise<number> => {
  const response = await fetch(`https://api.npmjs.org/downloads/point/${period}/${packageName}`);
  const responseJson = await response.json();

  return responseJson.downloads || 0;
};

const getPeriodNameFromPeriod = (period: Periods) => periodNames[period];

const renderTotalDownloads = (periodDownloadList: IPeriodDownload[]) => {
  const $readMe = document.getElementById('readme');

  if (!$readMe) {
    return;
  }

  const $title = $readMe.querySelector('h1');

  if (!$title) {
    return;
  }

  const parser = new DOMParser();
  const $totalDownloadsBlock = parser.parseFromString(`
    <div class='total-downloads-block'>
        ${periodDownloadList.map(periodDownload => `
          <div class='row'>
            <span class='period'>
                ${getPeriodNameFromPeriod(periodDownload.period)}
            </span>
            <span class='value'>
                ${periodDownload.downloads.toLocaleString()}
            </span>  
          </div>  
        `).join(' ')}
    </div>
  `, 'text/html').body.firstChild;

  if (!$totalDownloadsBlock) {
    return;
  }

  $title.appendChild($totalDownloadsBlock);
};

(async () => {
  const downloadsFetchList = Object.values(Periods).map(fetchPackageDownLoads);
  const downloadsList = await Promise.all(downloadsFetchList);
  const totalDownloads = Object.values(Periods).map<IPeriodDownload>((period, idx) => ({
    downloads: downloadsList[idx],
    period,
  }));

  console.log(totalDownloads);

  renderTotalDownloads(totalDownloads);
})();