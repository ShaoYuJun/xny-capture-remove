// ==UserScript==
// @name         新能源课程系统调用本地图片
// @namespace    http://github.com/ShaoYuJun
// @version      1.2
// @description  Remove the "capture" attribute from all input elements on xnykc, including dynamically loaded content and toggle capture mode on triple tap for mobile users
// @author       Shaoyu
// @match        *://bdfz.xnykcxt.com:5002/*
// @grant        none
// @license      GPL-3
// @downloadURL  https://raw.githubusercontent.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.user.js
// @updateURL    https://raw.githubusercontent.com/ShaoYuJun/xny-capture-remove/stable/RemoveCapture.meta.js
// ==/UserScript==

(function() {
    'use strict';

    var isCaptureMode = false;
    var timeout = 0;

    function getCaptureInput(){
	var inputs = document.querySelectorAll('input');
	
	inputs.forEach(function(input) {
	    input.setAttribute('hasCapture',1);
	});
    }


    // 移除 capture 属性的函数
    function removeCaptureAttribute() {
        // 获取所有 input 元素
        var inputs = document.querySelectorAll('input');

        // 遍历所有 input 元素
        inputs.forEach(function(input) {
            // 检查是否具有 "capture" 属性
            if (input.hasAttribute('hasCapture')) {
                // 移除 "capture" 属性
                input.removeAttribute('capture');
                input.setAttribute('accept', 'image/*');
            }
        });
    }

    function addCaptureAttribute() {
	var inputs = document.querySelectorAll('input');
	inputs.forEach(function(input) {
	    if (input.hasAttribute('hasCapture')) {
		input setAttribute('capture','camera')
	    }
	});
    }

    // 切换捕获模式的函数
    function toggleCaptureMode() {
        if (isCaptureMode) {
            // 当前是捕获模式，切换回普通模式
            isCaptureMode = false;
        } else {
            isCaptureMode = true;
        }
    }

    function loadCaptureAttribute() {
	if (isCaptureMode) {
	    addCaptureAttribute();
	} else {
	    removeCaptureAttribute();
	}
    }

    // 在页面加载和 DOM 变化时getCaptureInput
    document.addEventListener('DOMContentLoaded', function(){getCaptureInput();loadCaptureAttritube();});
    var observer = new MutationObserver(function(){getCaptureInput();loadCaptureAttritube();});
    observer.observe(document.body, { childList: true, subtree: true });


    // 监听三指单击事件
    document.addEventListener('touchend', function(event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            // 触发了三指单击事件
            touchCount++;
            clearTimeout(timeout);

            if (touchCount === 1) {
                timeout = setTimeout(function() {
                    touchCount = 0;
                    toggleCaptureMode();
		    loadCaptureAttritube();
                }, 500);
            } else if (touchCount === 2) {
                touchCount = 0;
                clearTimeout(timeout);
            }
        } else {
            touchCount = 1;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                touchCount = 0;
            }, 500);
        }
        lastTouchEnd = now;
    });

})();


