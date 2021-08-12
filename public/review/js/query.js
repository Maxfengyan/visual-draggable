/**
 * * * * * * * * * * * * * * *
 * author: ma
 * date: 2021-02-20
 * function: query dom
 * * * * * * * * * * * * * * *
 */

var $ = {};

/**
 * 选取单个dom
 */

$.one = function (selector, contentElement) {
  try {
    return (contentElement || document).querySelector(selector) || undefined;
  } catch (e) {
    return undefined;
  }
};

/**
 * 获取dom集合
 */

$.all = function (selector, contextElement) {
  try {
    var nodeList = (contextElement || document).querySelectorAll(selector);
    return [].slice.call(nodeList);
  } catch (e) {
    return [];
  }
};

/**
 * 单个dom元素加入class
 */

$.addClass = function ($el, className) {
  if (!$el) {
    return;
  }

  var name = $el.className || "";
  var arr = name.split(" ");
  if (arr.indexOf(className) == -1) {
    arr.push(className);
  }
  $el.className = arr.join(" ");
};

/**
 * 多个dom元素加入class
 */

$.addMultClass = function ($els, className) {
  if (!isArray($els)) {
    return;
  }

  for (var i = 0; i < els.length; i++) {
    var name = $els[i].className || "";
    var arr = name.split(" ");
    if (arr.indexOf(className) > -1) {
      continue;
    }
    arr.push(className);
    $el[i].className = arr.join(" ");
  }
};

/**
 * 移除class
 */

$.removeClass = function ($el, className) {
  if (!$el) {
    return;
  }
  var arr = $el.className.split(" ");
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == className) {
      arr[i] = "";
    }
  }
  $el.className = arr.join(" ").trim();
};

/**
 * 查看dom是否包含classname
 */

$.hasClass = function ($el, className) {
  var status = false;
  if (!$el || !$el.className) {
    status = false;
  } else {
    var arr = $el.className.split(" ");
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == className) {
        status = true;
      }
    }
  }
  return status;
};

/**
 * 显示dom
 */

$.show = function ($el) {
  if (!$el) {
    return false;
  }
  $el.style.display = "block";
};

/**
 * 隐藏dom
 */

$.hide = function ($el) {
  if (!$el) {
    return false;
  }
  $el.style.display = "none";
};

/**
 * 绑定方法到指定监听事件
 * @param $el dom元素
 * @param eventType 绑定事件名
 * @param fn fn
 */

$.bind = function ($el, eventType, fn, capture) {
  if (!$el || !eventType || !fn) {
    return;
  }
  $el.addEventListener(eventType, fn, capture || false);
};

/**
 * 简单到令人发指的dom渲染引擎
 * @param elType string dom类型
 * @param elProperty string dom属性
 * @param childrenDom domelement dom结构
 */

$.createDom = function (elType, elProperty, childrenDom, childrenDom1) {
  var attStr = "";
  if (!elType || !elProperty) {
    return;
  }
  var newEl = document.createElement(elType);

  for (var key in elProperty) {
    var elPropertyItem = elProperty[key];
    /* newEl.onerror= function() {
      delete newEl.onerror;
      newEl.onerror=undefined;
      newEl.src='';
    } */

    if (isObject(elPropertyItem)) {
      var attStr = "";
      for (var item in elPropertyItem) {
        if (elPropertyItem[item] || elPropertyItem[item] == 0) {
          attStr = attStr + item + ":" + elPropertyItem[item] + ";";
        }
      }
      newEl.setAttribute(key, attStr);
    } else {
      // 中兴盒子二呼呼的不支持class直接不执行了
      if (key == "className") {
        newEl.setAttribute("class", elPropertyItem);
      } else {
        newEl.setAttribute(key, elPropertyItem);
      }
    }
  }
  childrenDom && newEl.appendChild(childrenDom);
  childrenDom1 && newEl.appendChild(childrenDom1);
  return newEl;
};

/**
 * 创建文本节点
 */
$.createText = function (text) {
  return document.createTextNode(text);
};

/**
 * 轮播等待dom加载完成执行 && 区域块渲染在页面上的时候
 */

$.onload = function (selector, obj, success) {
  var timer;
  function load() {
    if (Global[Global._key]) {
      if (Global[Global._key][obj.areablockNum].render) {
        var target = document.querySelector(selector) || undefined;
        if (target) {
          if (timer) {
            clearTimeout(timer);
          }
          success(target);
        } else {
          timer = setTimeout(load, 100);
        }
      } else {
        clearTimeout(timer);
      }
    } else {
      timer = setTimeout(load, 100);
    }
  }
  load();
};

$.load = function (selector, success, times) {
  var timer;
  var num = 0;
  timer = setInterval(function () {
    var target = document.querySelector(selector) || undefined;
    if (target) {
      if (timer) {
        clearInterval(timer);
      }
      success(target);
    }
    num = num + 1;
    // 超过阈值不要再循环了
    if (num > (times || 200)) {
      clearInterval(timer);
      success(false);
    }
  }, 10);
};

$.contentLoad = function (selector, contentElement, success, times) {
  var timer;
  var num = 0;
  timer = setInterval(function () {
    var target = (contentElement || document).querySelector(selector) || undefined;

    if (target) {
      if (timer) {
        clearInterval(timer);
      }
      success(target);
    }
    num = num + 1;
    // 超过阈值不要再循环了
    if (num > (times || 200)) {
      clearInterval(timer);
      success(false);
    }
  }, 10);
};

$.contentAllLoad = function (selector, contentElement, unlimited, len, success, times) {
  var timer;
  var num = 0;
  timer = setInterval(function () {
    var allDom = $.all(selector, contentElement);
    if (allDom && (allDom.length == len || unlimited)) {
      if (timer) {
        clearInterval(timer);
      }
      success(allDom);
    }
    num = num + 1;
    // 超过阈值不要再循环了
    if (num > (times || 200)) {
      clearInterval(timer);
      success(false);
    }
  }, 10);
};

$.imgLoad = function (src, success) {
  var img = new Image();
  img.src = src;
  img.width = 1280;
  img.height = 720;
  img.onload = function () {
    success();
  };
};

$.saveFragment = function (childNodes) {
  var fragment = document.createDocumentFragment();
  if (!isArray(childNodes)) {
    return;
  }

  for (var i = 0; i < childNodes.length; i++) {
    fragment.appendChild(childNodes[i]);
  }
  return fragment;
};

$.loadImg = function (childNodes) {
  if (!isArray(childNodes)) {
    return;
  }
  for (var i = 0; i < childNodes.length; i++) {
    childNodes[i].setAttribute("src", childNodes[i].getAttribute("data-img"));
  }
};

$.judgeLocation = function () {
  if (!parent.Global || window.location.href == parent.location.href || Global.epgArea == "LN") {
    return true;
  } else {
    return false;
  }
};
