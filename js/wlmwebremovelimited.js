// ==UserScript==
// @namespace         https://raw.githubusercontent.com/williamyaps/williamyaps.github.io/master/js/wlmwebremovelimited.js

// @name              网页限制解除
// @name:en           Remove web limits
// @name:id           Menghapus batasan web

// @description       通杀大部分网站，可以解除禁止复制、剪切、选择文本、右键菜单的限制。
// @description:en    Pass to kill most of the site, you can lift the restrictions prohibited to copy, cut, select the text, right-click menu.
// @description:id    Menghapus batasan web untuk copy, potong, dan memilih text dengan mengklik tombol kanan mouse.

// @author            William Yap
// @version           1.3
// @license           LGPLv3

// @compatible        chrome Chrome_46.0.2490.86 + TamperMonkey 
// @compatible        firefox Firefox_42.0 + GreaseMonkey 
// @compatible        opera Opera_33.0.1990.115 + TamperMonkey 
// @compatible        safari 

// @match             *://*/*
// @grant             none
// @run-at            document-start
// ==/UserScript==
'use strict';

// Daftar peraturan domain
var rules = {
  black_rule: {
    name: "black",
    hook_eventNames: "",
    unhook_eventNames: ""
  },
  default_rule: {
    name: "default",
    hook_eventNames: "contextmenu|select|selectstart|copy|cut|dragstart",
    unhook_eventNames: "mousedown|mouseup|keydown|keyup",
    dom0: true,
    hook_addEventListener: true,
    hook_preventDefault: true,
    hook_set_returnValue: true,
    add_css: true
  }
};
// Daftar domain
var lists = {
  // Blacklist
  black_list: [
    /.*\.wikipedia\.org.*/,
    /mail\.qq\.com.*/,
    /translate\.google\..*/
  ]
};

// Daftar yang harus diproses
var hook_eventNames, unhook_eventNames, eventNames;
// Save As
var storageName = getRandStr('qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', parseInt(Math.random() * 12 + 8));
// Simpan fungsi hubungan
var EventTarget_addEventListener = EventTarget.prototype.addEventListener;
var document_addEventListener = document.addEventListener;
var Event_preventDefault = Event.prototype.preventDefault;

// Menambahkan addEventListener pada prosedur
function addEventListener(type, func, useCapture) {
  var _addEventListener = this === document ? document_addEventListener : EventTarget_addEventListener;
  if(hook_eventNames.indexOf(type) >= 0) {
    _addEventListener.apply(this, [type, returnTrue, useCapture]);
  } else if(unhook_eventNames.indexOf(type) >= 0) {
    var funcsName = storageName + type + (useCapture ? 't' : 'f');

    if(this[funcsName] === undefined) {
      this[funcsName] = [];
      _addEventListener.apply(this, [type, useCapture ? unhook_t : unhook_f, useCapture]);
    }

    this[funcsName].push(func)
  } else {
    _addEventListener.apply(this, arguments);
  }
}

// Bersihkan lingkaran
function clearLoop() {
  var elements = getElements();

  for(var i in elements) {
    for(var j in eventNames) {
      var name = 'on' + eventNames[j];
      if(elements[i][name] != null && elements[i][name] != onxxx) {
        if(unhook_eventNames.indexOf(eventNames[j]) >= 0) {
          elements[i][storageName + name] = elements[i][name];
          elements[i][name] = onxxx;
        } else {
          elements[i][name] = null;
        }
      }
    }
  }
}

// Jika fungsi benar
function returnTrue(e) {
  return true;
}
function unhook_t(e) {
  return unhook(e, this, storageName + e.type + 't');
}
function unhook_f(e) {
  return unhook(e, this, storageName + e.type + 'f');
}
function unhook(e, self, funcsName) {
  var list = self[funcsName];
  for(var i in list) {
    list[i](e);
  }

  e.returnValue = true;
  return true;
}
function onxxx(e) {
  var name = storageName + 'on' + e.type;
  this[name](e);

  e.returnValue = true;
  return true;
}

// Dapatkan string secara acak
function getRandStr(chs, len) {
  var str = '';

  while(len--) {
    str += chs[parseInt(Math.random() * chs.length)];
  }

  return str;
}

// Dapatkan semua elements termasuk dokument
function getElements() {
  var elements = Array.prototype.slice.call(document.getElementsByTagName('*'));
  elements.push(document);

  return elements;
}

// Baca file Style css
function addStyle(css) {
  var style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);
}

// Dapatkan target nama domain yang digunakan
function getRule(url) {
  function testUrl(list, url) {
    for(var i in list) {
      if(list[i].test(url)) {
        return true;
      }
    }

    return false;
  }

  if(testUrl(lists.black_list, url)) {
    return rules.black_rule;
  }

  return rules.default_rule;
}

// inisialisasi
function init() {
  // Baca aturan domain saat ini
  var url = window.location.host + window.location.pathname;
  var rule = getRule(url);

  // Set the event list
  hook_eventNames = rule.hook_eventNames.split("|");
  // TODO Allowed to return value
  unhook_eventNames = rule.unhook_eventNames.split("|");
  eventNames = hook_eventNames.concat(unhook_eventNames);

  // Call the loop to clean up the DOM0 event method
  if(rule.dom0) {
    setInterval(clearLoop, 30 * 1000);
    setTimeout(clearLoop, 2500);
    window.addEventListener('load', clearLoop, true);
    clearLoop();
  }

  // hook addEventListener
  if(rule.hook_addEventListener) {
    EventTarget.prototype.addEventListener = addEventListener;
    document.addEventListener = addEventListener;
  }

  // hook preventDefault
  if(rule.hook_preventDefault) {
    Event.prototype.preventDefault = function() {
      if(eventNames.indexOf(this.type) < 0) {
        Event_preventDefault.apply(this, arguments);
      }
    };
  }

  // Hook set returnValue
  if(rule.hook_set_returnValue) {
    Event.prototype.__defineSetter__('returnValue', function() {
      if(this.returnValue != true && eventNames.indexOf(this.type) >= 0) {
        this.returnValue = true;
      }
    });
  }

  console.debug('url: ' + url, 'storageName：' + storageName, 'rule: ' + rule.name);

  // membaca file style CSS
  if(rule.add_css) {
    addStyle('html, * {-webkit-user-select:text!important; -moz-user-select:text!important;}');
  }
}

init();
