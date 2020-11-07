const MINIMIZED_MODIFIER = '_minimized';

export const minimizeHandler = ($totalDownloadsBlock: Element) => {
  const $minimize = $totalDownloadsBlock.querySelector('.js-minimize');

  $minimize?.addEventListener('click', () => {
    if ($totalDownloadsBlock.classList.contains(MINIMIZED_MODIFIER)) {
      $totalDownloadsBlock.classList.remove(MINIMIZED_MODIFIER);
      $minimize.textContent = 'Minimize';

      return;
    }

    $totalDownloadsBlock.classList.add(MINIMIZED_MODIFIER);
    $minimize.textContent = 'Maximize';
  });
};
