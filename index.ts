import { ITotalDownloads } from './interfaces/ITotalDownloads';
import { Periods } from './enums/Periods';

const packageName = location.pathname.replace(/\/\w+\//, '');

const fetchPackageTotalDownLoads = async (period: Periods = Periods.LAST_YEAR): Promise<ITotalDownloads> => {
  const response = await fetch(`https://api.npmjs.org/downloads/point/${period}/${packageName}`);
  const data = await response.json();
  const downloads = data?.downloads || 0;

  console.log({ downloads, period });

  return { downloads, period };
}

const renderTotalDownloads = (totalDownloads: ITotalDownloads) => {
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
    <span class='total-downloads-block'>
        <span class='total-downloads-block__period'>
            ${totalDownloads.period}
        </span>
        <span class='total-downloads-block__value'>
            ${totalDownloads.downloads}
        </span>
    </span>
  `, 'text/html').body.firstChild;

  if (!$totalDownloadsBlock) {
    return;
  }

  $title.appendChild($totalDownloadsBlock);
}


fetchPackageTotalDownLoads().then(renderTotalDownloads);
