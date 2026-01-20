export function throttle(fn, wait = 100) {
  let lastTime = 0;
  let timeout = null;

  function throttled(...args) {
    const now = Date.now();
    const remaining = wait - (now - lastTime);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      lastTime = now;
      fn.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        lastTime = Date.now();
        timeout = null;
        fn.apply(this, args);
      }, remaining);
    }
  }

  throttled.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    lastTime = 0;
  };

  return throttled;
}
