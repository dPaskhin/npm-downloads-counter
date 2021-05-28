import { IPeriodDownload } from '@src/interfaces/IPeriodDownload';
import { periodNames } from '@src/utils/periodNames';
import { SelectorClassName } from '@src/enums/SelectorClassName';

export const renderTotalDownloads = (periodDownloadList: IPeriodDownload[]): void => {
  const $body = document.querySelector('body');

  if (!$body) {
    return;
  }

  void $body.querySelector(`.${SelectorClassName.TOTAL_DOWNLOADS_BLOCK}`)?.remove();

  const $totalDownloadsBlockTemplate = document.createElement('template');

  $totalDownloadsBlockTemplate.innerHTML = `
    <div class='total-downloads-block ${SelectorClassName.TOTAL_DOWNLOADS_BLOCK}'>
      <div class='row'>
        <span class='reload ${SelectorClassName.RELOAD}'>
          Reload
        </span>
        <span class='minimize ${SelectorClassName.MINIMIZE}'>
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
      ${periodDownloadList.map((periodDownload) => `
        <div class='row'>
          <span class='period'>
            ${periodNames[periodDownload.period]}
          </span>
          <span class='value'>
            ${periodDownload.downloads.toLocaleString()}
          </span>  
        </div>  
      `).join('')}
    </div>
  `;

  $body.append($totalDownloadsBlockTemplate.content);
};
