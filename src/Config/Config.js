

import FastClick from './fastclick.js';

((doc, win) => {
	
  	const docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = () => {
      let clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
    };
  	if (!doc.addEventListener) return;
  	win.addEventListener(resizeEvt, recalc, false);
  	doc.addEventListener('DOMContentLoaded', recalc, false);
  	//根据屏幕宽度计算字体大小
  	
})(document, window);


if ('addEventListener' in document) {
	
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
  
}
//DOMContentLoaded dom构建完成

const system = (() => {
	
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; 
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 			
  let system;
  if (isAndroid) {
    system = 'Android'
  } else if (isIOS) {
    system = 'IOS'
  }
  return system
  
})()

const target = process.env.NODE_ENV !== 'production' ? '' : 'http://dev.fe.ptdev.cn'; //目标网站

export {
  target,
  system
}