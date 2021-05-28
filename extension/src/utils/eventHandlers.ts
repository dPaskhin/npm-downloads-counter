import { SelectorClassName } from '@src/enums/SelectorClassName';

export const eventHandlers = (onReload: () => void): void => {
  const MINIMIZED_MODIFIER = '_minimized';

  const $reload = document.querySelector(`.${SelectorClassName.RELOAD}`);
  const $minimize = document.querySelector(`.${SelectorClassName.MINIMIZE}`);
  const $totalDownloadsBlock = document.querySelector(`.${SelectorClassName.TOTAL_DOWNLOADS_BLOCK}`);

  if (!$reload || !$minimize || !$totalDownloadsBlock) {
    return;
  }

  $reload.addEventListener('click', onReload);

  $minimize.addEventListener('click', () => {
    if ($totalDownloadsBlock.classList.contains(MINIMIZED_MODIFIER)) {
      $totalDownloadsBlock.classList.remove(MINIMIZED_MODIFIER);
      $minimize.textContent = 'Minimize';

      return;
    }

    $totalDownloadsBlock.classList.add(MINIMIZED_MODIFIER);
    $minimize.textContent = 'Maximize';
  });
};
