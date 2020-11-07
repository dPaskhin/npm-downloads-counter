import { IPeriodDownload } from '@src/interfaces/IPeriodDownload';
import { getPeriodNameByPeriod } from '@src/utils/getPeriodNameByPeriod';
import { minimizeHandler } from '@src/utils/minimizeHandler';

export const renderTotalDownloads = (periodDownloadList: IPeriodDownload[], reload: () => void): void => {
  const $body = document.querySelector('body');

  if (!$body) {
    return;
  }

  $body.querySelector('.js-total-downloads-block')?.remove();

  const parser = new DOMParser();

  const $totalDownloadsDocument = parser.parseFromString(`
    <div class='total-downloads-block js-total-downloads-block'>
        <div class='row'>
            <span class="reload js-reload">
                Reload
            </span>
            
            <span class='minimize js-minimize'>
                Minimize
            </span>
        </div>
        <div class='row'>
            <span class='period'>
                Period    
            </span>
            
            <span class='value'>
                Count of downloads
            </span>
        </div>
        ${periodDownloadList.map(periodDownload => `
          <div class='row'>
            <span class='period'>
                ${getPeriodNameByPeriod(periodDownload.period)}
            </span>
            <span class='value'>
                ${periodDownload.downloads.toLocaleString()}
            </span>  
          </div>  
        `).join(' ')}
    </div>
  `, 'text/html');

  const $totalDownloadsBlock = $totalDownloadsDocument.querySelector('.js-total-downloads-block');

  if (!$totalDownloadsBlock) {
    return;
  }

  const $reload = $totalDownloadsBlock.querySelector('.js-reload');

  $reload?.addEventListener('click', reload);

  minimizeHandler($totalDownloadsBlock);

  $body.appendChild($totalDownloadsBlock);
};