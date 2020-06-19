// 防抖
export function debounce(func, wait, immediate = true) {
  let timer = null;
  const _debounce = function(...args) {
    const context = this;
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      if (!timer) { // null
        func.apply(this, args);
      }
      timer = setTimeout(() => {
        timer = null;
      }, wait)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait)
    }
  }
  _debounce.cancel = function() {
    clearTimeout(timer);
    timer = null;
  }
  return _debounce;
}

// 节流
export function throttle(func, wait, options = {}) {
  let timer = null;

  const _throttle = function(...args) {
    const context = this;
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(context, args);
        timer = null;
      }, wait)
    }
  }
  return _throttle;
}

export function saveStore(key, val) {
  window.localStorage.setItem(key, val)
  return JSON.parse(val)
}

export function getStore(key, val) {
  window.localStorage.getItem(key)
}

export function removeStore(key, val) {
  window.localStorage.removeItem(key, null)
}

export function NoToChinese(num) {
  if (!/^\d*(\.\d*)?$/.test(num)) {
    alert('Number is wrong!');
    return 'Number is wrong!';
  }
  var AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  var BB = ['', '十', '百', '千', '万', '亿', '点', '']
  var a = ('' + num).replace(/(^0*)/g, '').split('.')
  var k = 0
  var re = '';
  for (var i = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re;
        break;
      case 4:
        if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0])) {
          re = BB[4] + re;
        }
        break;
      case 8:
        re = BB[5] + re;
        BB[7] = BB[5];
        k = 0;
        break;
    }
    if (k % 4 === 2 && a[0].charAt(i + 2) !== 0 && a[0].charAt(i + 1) === 0) re = AA[0] + re;
    if (a[0].charAt(i) !== 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re;
    k++;
  }
  if (a.length > 1) {
    re += BB[6];
    for (var m = 0; m < a[1].length; m++) re += AA[a[1].charAt(m)];
  }
  return re;
}
