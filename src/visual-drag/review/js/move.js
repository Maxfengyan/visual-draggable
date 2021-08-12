document.onkeydown = keyEvent;
function keyEvent(e) {
  var keyCode = e.keyCode;
  var active = document.activeElement;
  switch (keyCode) {
    case 37: // 左
      moveItem.moveLeft(active);
      break;
    case 38: // 上
      moveItem.moveTop(active);
      break;
    case 39: // 右
      moveItem.moveRight(active);
      break;
    case 40: // 下
      moveItem.moveDown(active);
      break;
    case 13: // enter
      break;
    default:
      break;
  }
}

function MoveFocus(data) {
  this.data = data;
}

MoveFocus.prototype.moveLeft = function (element) {
  var newArr = this.filterArr(element.id);
  var obj = newArr.obj;
  var locationArr = newArr.locationArr;
  var result;
  var smallStarty;
  for (var i = 0; i < locationArr.length; i++) {
    if (locationArr[i].startx < obj.startx) {
      if (
        (abs(locationArr[i].starty, obj.starty, 5) &&
          abs(obj.starty, locationArr[i].endy, 5)) ||
        (locationArr[i].starty <= obj.starty &&
          obj.starty <= locationArr[i].endy)
      ) {
        if (smallStarty) {
          if (locationArr[i].startx > smallStarty) {
            result = locationArr[i];
            smallStarty = locationArr[i].startx;
          }
        } else {
          result = locationArr[i];
          smallStarty = locationArr[i].startx;
        }
      }
    }
  }
  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (locationArr[i].startx < obj.startx) {
        if (
          (abs(locationArr[i].starty, obj.endy, 5) &&
            abs(obj.endy, locationArr[i].endy, 5)) ||
          (locationArr[i].starty <= obj.endy &&
            obj.endy <= locationArr[i].endy)
        ) {
          if (smallStarty) {
            if (locationArr[i].startx > smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].startx;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].startx;
          }
        }
      }
    }
  }
  /* 加入容错焦点 */
  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (locationArr[i].startx < obj.startx) {
        if (
          (abs(locationArr[i].starty, obj.starty, 5) &&
            abs(obj.endy, locationArr[i].endy, 5)) ||
          (locationArr[i].starty <= obj.starty &&
            obj.endy >= locationArr[i].endy)
        ) {
          if (smallStarty) {
            if (locationArr[i].startx > smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].startx;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].startx;
          }
        }
      }
    }
  }
  this.focus(result);
};
MoveFocus.prototype.moveRight = function (element) {
  var newArr = this.filterArr(element.id);
  var obj = newArr.obj;
  var locationArr = newArr.locationArr;
  var result;
  var smallStarty;
  for (var i = 0; i < locationArr.length; i++) {
    if (
      locationArr[i].startx > obj.startx &&
      locationArr[i].startx != 0
    ) {
      if (
        (abs(locationArr[i].starty, obj.starty, 5) &&
          abs(obj.starty, locationArr[i].endy, 5)) ||
        (locationArr[i].starty <= obj.starty &&
          obj.starty <= locationArr[i].endy)
      ) {
        if (smallStarty) {
          if (locationArr[i].startx < smallStarty) {
            result = locationArr[i];
            smallStarty = locationArr[i].startx;
          }
        } else {
          result = locationArr[i];
          smallStarty = locationArr[i].startx;
        }
      }
    }
  }
  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (
        locationArr[i].startx > obj.startx &&
        locationArr[i].startx != 0
      ) {
        if (
          (abs(locationArr[i].starty, obj.endy, 5) &&
            abs(obj.endy, locationArr[i].endy, 5)) ||
          (locationArr[i].starty <= obj.endy &&
            obj.endy <= locationArr[i].endy)
        ) {
          if (smallStarty) {
            if (locationArr[i].startx < smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].startx;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].startx;
          }
        }
      }
    }
  }
  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (
        locationArr[i].startx > obj.startx &&
        locationArr[i].startx != 0
      ) {
        if (
          (abs(locationArr[i].starty, obj.starty, 5) &&
            abs(obj.endy, locationArr[i].endy, 5)) ||
          (locationArr[i].starty <= obj.starty &&
            obj.endy >= locationArr[i].endy)
        ) {
          if (smallStarty) {
            if (locationArr[i].startx < smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].startx;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].startx;
          }
        }
      }
    }
  }

  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (
        locationArr[i].startx > obj.startx &&
        locationArr[i].startx != 0
      ) {
        if (
          locationArr[i].startx >= obj.startx &&
          obj.endx <= locationArr[i].endx
        ) {
          if (smallStarty) {
            if (locationArr[i].startx < smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].startx;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].startx;
          }
        }
      }
    }
  }
  this.focus(result);
};
MoveFocus.prototype.moveTop = function (element) {
  var newArr = this.filterArr(element.id);
  var obj = newArr.obj;
  var locationArr = newArr.locationArr;
  var result;
  var smallStarty;
  for (var i = 0; i < locationArr.length; i++) {
    if (locationArr[i].endy < obj.endy) {
      if (
        (abs(locationArr[i].startx, obj.startx, 5) &&
          abs(obj.startx, locationArr[i].endx, 5)) ||
        (locationArr[i].startx <= obj.startx &&
          obj.startx <= locationArr[i].endx)
      ) {
        if (smallStarty) {
          if (locationArr[i].endy > smallStarty) {
            result = locationArr[i];
            smallStarty = locationArr[i].endy;
          }
        } else {
          result = locationArr[i];
          smallStarty = locationArr[i].endy;
        }
      }
    }
  }

  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (locationArr[i].endy < obj.endy) {
        if (
          (abs(locationArr[i].startx, obj.endx, 5) &&
            abs(obj.endx, locationArr[i].endx, 5)) ||
          (locationArr[i].startx <= obj.endx &&
            obj.endx <= locationArr[i].endx)
        ) {
          if (smallStarty) {
            if (locationArr[i].endy > smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].endy;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].endy;
          }
        }
      }
    }
  }

  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (locationArr[i].endy < obj.endy) {
        if (
          (abs(locationArr[i].startx, obj.startx, 5) &&
            abs(obj.endx, locationArr[i].endx, 5)) ||
          (locationArr[i].startx <= obj.startx &&
            obj.endx >= locationArr[i].endx)
        ) {
          if (smallStarty) {
            if (locationArr[i].endy > smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].endy;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].endy;
          }
        }
      }
    }
  }
  this.focus(result);
};
MoveFocus.prototype.moveDown = function (element) {
  var newArr = this.filterArr(element.id);
  var obj = newArr.obj;
  var locationArr = newArr.locationArr;
  var result;
  var smallStarty;
  for (var i = 0; i < locationArr.length; i++) {
    if (
      locationArr[i].starty > obj.starty &&
      locationArr[i].starty != 0
    ) {
      if (
        (abs(locationArr[i].startx, obj.startx, 5) &&
          abs(obj.startx, locationArr[i].endx, 5)) ||
        (locationArr[i].startx <= obj.startx &&
          obj.startx <= locationArr[i].endx)
      ) {
        if (smallStarty) {
          if (locationArr[i].starty < smallStarty) {
            result = locationArr[i];
            smallStarty = locationArr[i].starty;
          }
        } else {
          result = locationArr[i];
          smallStarty = locationArr[i].starty;
        }
      }
    }
  }
  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (
        locationArr[i].starty > obj.starty &&
        locationArr[i].starty != 0
      ) {
        if (
          (abs(locationArr[i].startx, obj.endx, 5) &&
            abs(obj.endx, locationArr[i].endx, 5)) ||
          (locationArr[i].startx <= obj.endx &&
            obj.endx <= locationArr[i].endx)
        ) {
          if (smallStarty) {
            if (locationArr[i].starty < smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].starty;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].starty;
          }
        }
      }
    }
  }
  if (!result) {
    for (var i = 0; i < locationArr.length; i++) {
      if (
        locationArr[i].starty > obj.starty &&
        locationArr[i].starty != 0
      ) {
        if (
          (abs(locationArr[i].startx, obj.startx, 5) &&
            abs(obj.endx, locationArr[i].endx, 5)) ||
          (locationArr[i].startx <= obj.startx &&
            obj.endx >= locationArr[i].endx)
        ) {
          if (smallStarty) {
            if (locationArr[i].starty < smallStarty) {
              result = locationArr[i];
              smallStarty = locationArr[i].starty;
            }
          } else {
            result = locationArr[i];
            smallStarty = locationArr[i].starty;
          }
        }
      }
    }
  }
  this.focus(result);
};

MoveFocus.prototype.focus = function (element) {
  if (element) {
    $.one("#" + element.id).focus();
  }
};
MoveFocus.prototype.filterArr = function (id) {
  if (!isArray(this.data)) {
    return false;
  }
  var newArr = [];
  var obj = {};
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i].id !== id) {
      newArr.push(this.data[i]);
    } else {
      obj = this.data[i];
    }
  }
  return {
    locationArr: newArr,
    obj: obj,
  };
};
