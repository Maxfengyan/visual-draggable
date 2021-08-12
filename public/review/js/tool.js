function isNumber(value) {
  return Object.prototype.toString.call(value) == "[object Number]";
}

function isString(value) {
  return Object.prototype.toString.call(value) == "[object String]";
}

function isArray(value) {
  return Object.prototype.toString.call(value) == "[object Array]";
}

function isBoolean(value) {
  return Object.prototype.toString.call(value) == "[object Boolean]";
}

function isUndefined(value) {
  return value === undefined;
}

function isNull(value) {
  return value === null;
}

function isSymbol(value) {
  return Object.prototype.toString.call(value) == "[object Symbol]";
}

function isObject(value) {
  return (
    Object.prototype.toString.call(value) == "[object Object]" ||
    (!isNumber(value) &&
      !isString(value) &&
      !isBoolean(value) &&
      !isArray(value) &&
      !isNull(value) &&
      !isFunction(value) &&
      !isUndefined(value) &&
      !isSymbol(value))
  );
}

function isFunction(value) {
  return Object.prototype.toString.call(value) == "[object Function]";
}

function isElement(value) {
  return typeof HTMLElement === "object"
    ? value instanceof HTMLElement
    : value && typeof value === "object" && value !== null && value.nodeType === 1 && typeof value.nodeName === "string";
}

function isWindow(value) {
  var toString = Object.prototype.toString.call(value);
  return toString == "[object global]" || toString == "[object Window]" || toString == "[object DOMWindow]";
}

function getObjName(obj) {
  return Object.prototype.toString.call(obj).replace("[object ", "").replace("]", "");
}

/**
 * @param {uri} 解析url参数
 */
function getQuery(uri) {
  var arr;
  if (typeof uri === "string") {
    arr = uri.substr(1).split(/[?=&#]/gi);
  } else if (typeof uri === "object" && typeof uri.search === "string") {
    arr = uri.search.substr(1).split(/[?=&#]/gi);
  } else {
    arr = location.search.substr(1).split(/[?=&#]/gi);
  }
  var query = {};
  for (var i = 0, l = arr.length; i < l; i++) {
    if (arr[i]) {
      query[arr[i]] = arr[++i];
    }
  }
  return query;
}

function loadJs(url, success, fail) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  // script.async = "async";
  script.onload = script.onreadystatechange = function () {
    success();
    this.parentNode.removeChild(this);
    script.onload = script.onreadystatechange = null;
  };
  script.onerror = function () {
    fail();
  };
  document.getElementsByTagName("head")[0].appendChild(script);
}

// 渲染jsp文件方法
function loadJSP(url, success) {
  var callbackName = "_callback" + new Date().getTime();
  var script = document.createElement("script");
  script.src = url + "&callbackName=" + callbackName;
  script.id = callbackName;
  window[callbackName] = function (o) {
    success(o);
    document.body.removeChild(document.getElementById(callbackName));
    delete window[callbackName];
  };

  script.onerror = function (error) {};
  document.body.appendChild(script);
}

// canvas 抠图
function bg2canvas(bg, left, top, width, height) {
  $.imgLoad(bg.src, function () {
    b2c();
  });
  function b2c() {
    var canvas = document.createElement("canvas");
    canvas.width = 1280;
    canvas.height = 720;
    var content = canvas.getContext("2d");
    content.drawImage(bg, 0, 0);
    var imgData = content.getImageData(left, top, width, height);
    for (var i = 0, len = imgData.data.length; i < len; i += 4) {
      // 改变每个像素的透明度
      imgData.data[i + 3] = 0;
    }
    content.putImageData(imgData, left, top);
    bg.src = canvas.toDataURL();
    bg.onload = undefined;
  }
}

/**
 *
 * @param {时间} idle
 * @param {传入函数} action
 */
/* function debounce(idle, action) {
  var last;
  return function () {
    var ctx = this;
    var args = arguments;
    clearTimeout(last);
    last = setTimeout(function () {
      action.apply(ctx, args);
    }, idle);
  };
} */

function debounce(delay, callback) {
  var timeout = 0;
  return function (e) {
    // console.log("清除", timeout, new Date());
    Global.keyEvent = false;
    clearTimeout(timeout); //input 一直触发，就清除上一次的定时器，防止执行目标函数，直到事件不触发事件，最后一个定时器没有清除，delay 时间后就会执定时器，就确保了目标函数只执行一次。
    timeout = setTimeout(function () {
      Global.keyEvent = true;
      callback(e);
    }, delay);
    // console.log("新的", timeout, e, new Date());
  };
}

// 节流封装
/**
 * @param delay  {number}    延迟时间，单位毫秒
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 */

function throttle(delay, action) {
  var last = 0;
  return function () {
    var curr = +new Date();
    if (curr - last > delay) {
      action.apply(this, arguments);
      last = curr;
    }
  };
}

function bytueAjaxJspGet(_url, success) {
  var xmlhttp = null;
  if (xmlhttp == null) {
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      success(this.responseText);
    }
  };
  xmlhttp.onerror = function (err) {
    console.log(err);
  };
  xmlhttp.onabort = function () {};
  xmlhttp.onloadstart = function () {};
  xmlhttp.onload = function () {};
  xmlhttp.ontimeout = function () {};
  xmlhttp.open("GET", _url, true);
  xmlhttp.send(null);
}

function bytueAjaxJspPost(_url, obj, success, contentType) {
  var xmlhttp = null;
  if (xmlhttp == null) {
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      success(this.responseText);
    }
  };
  xmlhttp.onerror = function (err) {
    console.log(err);
  };
  xmlhttp.onabort = function () {};
  xmlhttp.onloadstart = function () {};
  xmlhttp.onload = function () {};
  xmlhttp.ontimeout = function () {};
  xmlhttp.open("POST", _url, true);
  // xmlhttp.withCredentials = true; //支持跨域发送cookies
  xmlhttp.setRequestHeader("Content-Type", contentType || "application/json");
  xmlhttp.send(obj);
}

// 找误差
function abs(value1, value2, threshold) {
  var absValue = Math.abs(value1 - value2);
  if (absValue <= threshold) {
    return true;
  } else {
    return false;
  }
}

// 随机数
function randomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

/**
 * 格式化数字为多位字符串，0补位
 */
function formatNum(value, n) {
  return (value + "")[n - 1] ? value : formatNum("0" + value, n);
}

// 图片错误处理
function imgerrorfun() {
  var img = event.srcElement;
  img.src = "./img/mask.png";
  img.onerror = null; // 控制不要一直跳动
}

// 导航加载错误处理
function loadError() {
  var dom =
    '<div class="wscn-http404-container"><div class="wscn-http404"><div class="pic-404"><img class="pic-404__parent" src="./img/404.png" alt="404"><img class="pic-404__child left" src="./img/404_cloud.png" alt="404"><img class="pic-404__child mid" src="./img/404_cloud.png" alt="404"><img class="pic-404__child right" src="./img/404_cloud.png" alt="404"></div><div class="bullshit"><div class="bullshit__oops">页面访问错误！</div></div></div></div>';
  // $.one("#app").innerHTML = "<img class='epgError' src='./img/404.png'>";
  $.one("#app").innerHTML = dom;
  $.one("body").style.background = "#fff";
}

// 对象合并
function extendObj(obj1, obj2) {
  if (!isObject(obj1) && !isObject(obj2)) {
    return false;
  }

  for (var i in obj1) {
    if (obj1.hasOwnProperty(i) && !obj2.hasOwnProperty(i)) {
      obj2[i] = obj1[i];
    }
  }
  return obj2;
}

// 返回当前时间
function bytueGetLogTime() {
  var myDate = new Date();
  return Math.floor(myDate.getTime() / 1000);
}

/**
 * * * * * * * * * * * * * * *
 * author: 马丰彦
 * date: 2021-07-21
 * function: 背景图改为canvas形式
 * * * * * * * * * * * * * * *
 */

function settingCanvasBackground(imgUrl) {
  var oimg = new Image();
  oimg.src = imgUrl;

  var cvs = $.one("#imgurl");
  var context = cvs.getContext("2d");
  Global.canvasContext = context;
  oimg.onload = function () {
    Global.canvasImg = this;
    cvs.width = 1280;
    cvs.height = 720;
    context.drawImage(this, 0, 0, 1280, 720);
  };
  oimg.onerror = function () {
    cvs.width = 1280;
    cvs.height = 720;
    oimg.src = "./img/mask.png";
    oimg.onerror = null;
  };
}

// 设置透明区域
function settingCanvasTransparent(left, top, width, height) {
  Global.canvasContext.clearRect(left, top, width, height);
}

// 还原透明区域
function reductionClearRect() {
  Global.canvasContext.drawImage(Global.canvasImg, 0, 0, 1280, 720);
}

// 全局视频背景图
function videoCanvasBackground(imgurl) {
  var oimg = new Image();
  oimg.src = imgurl;

  var cvs = $.one("#imgurl");
  var context = cvs.getContext("2d");
  Global.canvasContext = context;
  oimg.onload = function () {
    Global.canvasImg = this;
    cvs.width = 1280;
    cvs.height = 720;
    context.drawImage(this, 0, 0, 1280, 720);
  };
  oimg.onerror = function () {
    cvs.width = 1280;
    cvs.height = 720;
    oimg.src = "./img/mask.png";
    oimg.onerror = null;
  };
}
