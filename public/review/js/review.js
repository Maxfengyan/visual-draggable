function Reviewspecial(data) {
  this.data = data;
  this.dataLocation = [];
}

// 渲染dom
Reviewspecial.prototype.renderDom = function () {
  if (isArray(this.data)) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < this.data.length; i++) {
      // 图片
      if (this.data[i].type === 0) {
        fragment.appendChild(this.createImg(this.data[i], i));
      } else if (this.data[i].type === 1) {
        // 焦点热区
        fragment.appendChild(this.createArea(this.data[i], i));
      } else {
        // 文字
        fragment.appendChild(this.createWord(this.data[i], i));
      }
    }
  }
  document.body.appendChild(fragment);
  this.getDefaultFocus();
  return this.dataLocation;
};

// 落焦点
Reviewspecial.prototype.getDefaultFocus = function () {
  var defaultFocus;
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i].type === 1) {
      if (this.data[i].default) {
        defaultFocus = i;
        break;
      }
      defaultFocus = i;
    }
  }
  $.one("#area" + defaultFocus).focus();
};

// 图片组件渲染
Reviewspecial.prototype.createImg = function (item, index) {
  var imgDom = document.createElement("img");
  imgDom.src = item.propValue;
  imgDom.style.position = "absolute";
  imgDom.id = "img" + index;
  /* this.dataLocation.push({
    startx: item.style.left,
    starty: item.style.top,
    endx: item.style.left + item.style.width,
    endy: item.style.top + item.style.height,
    width: item.style.width,
    height: item.style.height,
  }); */
  for (var key in item.style) {
    if (key === "rotate") {
      imgDom.style.transform = "rotate(" + item.style[key] + "deg)";
    } else {
      imgDom.style[key] = item.style[key] + "px";
    }
  }
  imgDom.style.zIndex = index;
  return imgDom;
};

// 文字组件渲染
Reviewspecial.prototype.createWord = function (item, index) {
  var wordDom = document.createElement("span");
  wordDom.textContent = item.propValue;
  wordDom.id = "word" + index;
  /* this.dataLocation.push({
    startx: item.style.left,
    starty: item.style.top,
    endx: item.style.left + item.style.width,
    endy: item.style.top + item.style.height,
    width: item.style.width,
    height: item.style.height,
  }); */
  for (var key in item.style) {
    if (key === "rotate") {
      wordDom.style.transform = "rotate(" + item.style[key] + "deg)";
    } else {
      wordDom.style[key] =
        item.style[key] + (isNumber(item.style[key]) ? "px" : "");
    }
  }
  wordDom.style.zIndex = index;
  wordDom.style.position = "absolute";
  return wordDom;
};

// 热区焦点组件渲染
Reviewspecial.prototype.createArea = function (item, index) {
  var areaDom = document.createElement("a");
  areaDom.href = "javascript:void(0)";
  areaDom.tabIndex = "1";
  areaDom.style.position = "absolute";
  areaDom.style.background = "transparent";
  areaDom.id = "area" + index;
  this.dataLocation.push({
    startx: item.style.left,
    starty: item.style.top,
    endx: item.style.left + item.style.width,
    endy: item.style.top + item.style.height,
    width: item.style.width,
    height: item.style.height,
    id: "area" + index,
  });
  // areaDom.style.border = "5px solid #fff";
  for (var key in item.style) {
    if (key === "rotate") {
      areaDom.style.transform = "rotate(" + item.style[key] + "deg)";
    } else if (key === "color") {
      areaDom.style["border-color"] = item.style[key];
    } else {
      areaDom.style[key] = item.style[key] + "px";
    }
  }
  areaDom.style.zIndex = index;
  return areaDom;
};
