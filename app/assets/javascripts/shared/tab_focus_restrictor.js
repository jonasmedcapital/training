function tabFocusRestrictor(lastItem, firstItem) {
  lastItem.blur(function () {
    firstItem.focus();
  });
}