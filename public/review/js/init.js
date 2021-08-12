/**
 * * * * * * * * * * * * * * *
 * author: 马丰彦
 * date: 2020-02-23
 * function: 初始化机顶盒配置
 * * * * * * * * * * * * * * *
 */
(function (factory) {
  try {
    // 关闭缺省的浏览方式。浏览器通过onkeypress事件，将方向键传递给页面，由页面决定如何移动焦点。
    Navigation.disableDefaultNavigation();
    // Navigation.disableHighlight();

    /**
     * 恢复缺省的浏览方式。浏览器根据方向键，决定如何移动焦点。
     */
    // enableDefaultNavigation();
  } catch (e) {}

  try {
    // 关闭浏览器缺省的高亮方式。
    // Navigation.disableHighlight();
    // 中兴关闭焦点高亮颜色
    // iPanel.focusWidth = "-10";
    // iPanel.EnableLoadingIcon = 1;
    // iPanel.EnableLoadingIconPermanent = 1;
    // iPanel.bgColor = '#000000';
    // iPanel.textColor = '#ffffff';
    // iPanel.alinkColor = '#ffffff';
    // iPanel.activeColor = '#ffffff';
    // iPanel.borderColor = '#ffffff';
    // iPanel.defaultFocusColor = '#ffffff';
    /**
     * 恢复浏览器缺省的高亮方式
     */
    // enableHighlight();
  } catch (e) {}

  // 扒浙江的
  try {
    var STB = navigator.appName;
    if (STB == "Ranger" || STB == "EIS iPanel") {
      //机顶盒浏览器区分 华为 创维
      iPanel.tmp_focus_width = 0;
      iPanel.focusWidth = "-10"; //焦点框宽度
    } else if (STB == "ztebw" || STB.indexOf("Fhbw") >= 0) {
      //中兴 烽火
      iPanel.focusWidth = "0"; //焦点框宽度
    } else {
      iPanel.focusWidth = "-1"; //焦点框宽度
    }
  } catch (e) {
    if (typeof iPanel !== "undefined") {
      iPanel.focusWidth = "-1"; //焦点框宽度
    }
  }

  /* iPanel.focusWidth = "2";
  iPanel.defaultFocusColor = "#FFFF00"; */

  try {
    // 输出下盒子型号防止搞混了
    if (Global.columnSwitch) {
      var stbType = Utils.getConfig("STBType") || "预览";
      var stbTypeDom = $.createDom(
        "span",
        {
          id: "stbtype",
        },
        $.createText(stbType)
      );
      $.show($.one("#header"));
      $.one("#header").appendChild(stbTypeDom);
    }
  } catch (e) {}

  Object.defineProperty(this, "Iptv", {
    configurable: false,
    enumerable: false,
    value: factory.call(window),
    writable: false,
  });
}.call(window, function () {
  var iptv = {};

  iptv.userId = function () {
    return Utils.getConfig("UserID");
  };

  iptv.userToken = function () {
    return Utils.getConfig("UserToken");
  };

  iptv.EPGDomain = function () {
    return Utils.getConfig("EPGDomain");
  };

  iptv.areaId = function () {
    return Utils.getConfig("AreaId");
  };

  iptv.userGroupNMB = function () {
    return Utils.getConfig("UserGroupNMB");
  };

  iptv.epgGroupNMB = function () {
    return Utils.getConfig("EPGGroupNMB");
  };

  iptv.stbType = function () {
    return Utils.getConfig("STBType");
  };

  iptv.mac = function () {
    return Utils.getConfig("MAC");
  };

  iptv.stbId = function () {
    return Utils.getConfig("STBID");
  };

  iptv.ip = function () {
    var ip;
    try {
      ip = Authentication.CTCGetLocalIpAddress();
    } catch (error) {
      ip = "";
    }
    return ip;
  };

  return iptv;
}));
