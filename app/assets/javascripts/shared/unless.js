function unless(condition, callback) {
  !condition && callback();
}