/*
 *   用惰性函数把utils封装起来
 * */
var utils = (function () {
    var isStanderBrowser = !!window.getComputedStyle;
    function listToArray(likeAry) {
        try {
            return Array.prototype.slice.call(likeAry);
        } catch (e) {
            var ary = [];
            for (var i = 0; i < ary.length; i++) {
                ary.push(likeAry[i]);
            }
            return ary;
        }
    }
    function jsonParse(jsonStr) {
        return 'JSON' in window ? JSON.parse(jsonStr) : eval('(' + jsonStr + ')');
    }
    function getRandom(n, m) {
        n = Number(n);
        m = Number(m);
        if (isNaN(n) || isNaN(m)) {
            return Math.random();
        }
        if (n > m) {
            var temp = m;
            m = n;
            n = temp;
        }
        return Math.round(Math.random(m - n) + n);
    }
    function offset(ele) {
        var l = null;
        var t = null;
        l += ele.offsetLeft;
        t += ele.offsetTop;
        var par = ele.offsetParent;
        while (par) {
            if (window.navigator.userAgent.indexOf('MSIE 8') === -1) {
                l += par.clientLeft;
                t += par.clientTop;
            }
            l += par.offsetLeft;
            t += par.offsetTop;
            par = par.offsetParent;
        }
        return {left: l, top: t};
    }
    function win(attr, val) {
        if (typeof val !== 'undefined') {
            document.documentElement[attr] = val;
            document.body[attr] = val;
        }
        return document.documentElement[attr] || document.body[attr];
    }
    function children(ele, tagName) {
        var ary = [];
        if (isStanderBrowser) {
            ary = this.listToArray(ele.children);
        } else {
            var nodeList = ele.childNodes;
            for (var i = 0; i < nodeList.length; i++) {
                if (nodeList[i].nodeType === 1) {
                    ary.push(nodeList[i]);
                }
            }
        }
        if (typeof tagName == "string") {
            for (var i = 0; i < ary.length; i++) {
                if (ary[i].nodeName !== tagName.toUpperCase()) {
                    ary.splice(i, 1);
                    i--;
                }
            }
        }
        return ary;
    }
    function prev(ele) {
        if (isStanderBrowser) {
            return ele.previousElementSibling;
        }
        var pre = ele.previousSibling;
        while (pre && pre.nodeType != 1) {
            pre = pre.previousSibling;
        }
        return pre;
    }
    function next(ele) {
        if (isStanderBrowser) {
            return ele.nextElementSibling;
        }
        var next = ele.nextSibling;
        while (next && next.nodeType != 1) {
            next = next.nextSibling;
        }
        return next;
    }
    function prevAll(ele) {
        var ary = [];
        var pre = ele.previousSibling;
        while (pre) {
            if (pre.nodeType == 1) {
                ary.unshift(pre);
            }
            pre = pre.previousSibling;
        }
        return ary;
    }
    function nextAll(ele) {
        var ary = [];
        var next = this.next(ele);
        while (next) {
            ary.push(next);
            next = this.next(next);

        }
        return ary;
    }
    function firstEleChild(ele) {
        if (isStanderBrowser) {
            return ele.firstElementChild;
        }
        var allEleChilds = this.children(ele);
        return allEleChilds.length > 0 ? allEleChilds[0] : null;
    }
    function lastEleChild(ele) {
        if (isStanderBrowser) {
            return ele.lastElementChild;
        }
        var allEleChilds = this.children(ele);
        return allEleChilds.length > 0 ? allEleChilds[allEleChilds.length - 1] : null;
    }
    function siblings(ele) {
        return this.prevAll(ele).concat(this.nextAll(ele));
    }
    function sibling(ele) {
        var ary = [];
        var prev = this.prev(ele);
        var next = this.next(ele);
        prev ? ary.push(prev) : void 0;
        next ? ary.push(next) : void 0;
        return ary;
    }
    function index(ele) {
        return this.prevAll(ele).length;
    }
    function append(ele, container) {
        container.appendChild(ele);
    }
    function prepend(ele, container) {
        var first = this.firstEleChild(container);
        first ? container.insertBefore(ele, first) : container.appendChild(ele);
    }
    function insertBefore(oldEle, newEle) {
        oldEle.parentNode.insertBefore(newEle, oldEle);
    }
    function insertAfter(oldEle, newEle) {
        var next = this.next(oldEle);
        next ? oldEle.parentNode.insertBefore(newEle, next) : oldEle.parentNode.appendChild(newEle);
    }
    function hasClass(ele, strClass) {
        var reg = new RegExp('(^| +)' + strClass + '( +|$)');
        return reg.test(ele.className); // true/false
    }
    function addClass(ele, strClass) {
        var strClassAry = strClass.replace(/^ +| +$/g, '').split(/ +/);

        for (var i = 0; i < strClassAry.length; i++) {
            var curClass = strClassAry[i];
            if (!this.hasClass(ele, curClass)) {
                ele.className += ' ' + curClass;
            }
        }
    }
    function removeClass(ele, strClass) {
        var strClassAry = strClass.replace(/^ +| +$/g, '').split(/ +/);
        for (var i = 0; i < strClassAry.length; i++) {
            var curClass = strClassAry[i];
            while (this.hasClass(ele, curClass)) {
                var reg = new RegExp('(^| +?)' + curClass + '( +?|$)', 'g');
                ele.className = ele.className.replace(reg, '  ');
            }
        }
    }
    function getElesByClass(strClass, context) { //通过类名获取元素
        context = context || document;
        if (isStanderBrowser) {
            return this.listToArray(context.getElementsByClassName(strClass));
        }
        var strClassAry = str.replace(/^ +| +$/g, '').split(/ +/);
        var tags = context.getElementsByTagName('*');
        var ary = [];
        for (var i = 0; i < tags.length; i++) {
            var curTag = tags[i];
            var curTagIsOk = true;
            for (var j = 0; j < strClassAry.length; j++) {
                var curClass = strClassAry[j];
                var reg = new RegExp('(^| +)' + curClass + ('( +|$)'));
                if (!reg.test(curTag.className)) {
                    curTagIsOk = false;
                    break;
                }
            }
            if (curTagIsOk) {
                ary.push(curTag);
            }
        }
        return ary;
    }

    function getCss(attr) {
        var val = null;
        if (isStanderBrowser) {
            val = window.getComputedStyle(this, null)[attr];
        } else {
            if (attr == 'opacity') {
                var reg = /alpha\(opacity=(\d+(\.\d+)?)\)/;
                val = this.currentStyle.filter;
                val = reg.test(val) ? reg.exec(val)[1] / 100 : 1;
            } else {
                val = this.currentStyle[attr];
            }
        }
        var reg = /-?\d+(\.\d+)?(px|pt|em|rem|deg)?/;
        if (reg.test(val)) {
            val = parseFloat(val);
        }
        return val;
    }
    function setCss(attr, val) {
        if (attr == 'opacity') {
            this.style.opacity = val;
            this.style.filter = 'alpha(opacity=' + val * 100 + ')';
            return;
        }
        if (attr == 'float') {
            this.style.cssFloat = val;
            this.style.styleFloat = val;
            return;
        }
        var reg = /width|height|left|right|top|bottom|(margin|padding)(Left|Right|Top|Bottom)?/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += 'px';
            }
        }
        this.style[attr] = val;
    }
    function setGroupCss(obj){ //设置一组样式
        // obj没有传参数，obj就是一个undefined。
        obj = obj || [];
        if((obj).toString() == '[object Object]'){
            // 如果这个条件符合那么obj必然是{a:1}的对象
            // {width : 100,height : 200}
            for(var key in obj){
                if(obj.hasOwnProperty(key)){ //保证是私有属性
                    setCss.call(this,key,obj[key]);
                    //setCss(ele,'width',100);
                    //setCss(ele,'height',200);
                }
            }
        }
    }

    function css(ele){
        // 如果第二个参数是字符串，那么需要判断第三个参数有没有。如果有那么就是设置样式。如果没有就是获取样式
        // 如果第二个参数是一个对象，那么是来设置批量样式的
        var secondParam = arguments[1];
        var thirdParam = arguments[2]; //undefined
        if(typeof secondParam == 'string'){
            if(typeof thirdParam !== 'undefined'){
                setCss(ele,secondParam,thirdParam);
                return;
            }
            return getCss(ele,secondParam);
        }
        // 必须保证toString不能报错
        secondParam = secondParam || [];
        if((secondParam).toString() == '[object Object]'){
            setGroupCss(ele,secondParam);
        }
    }
    
    function css(ele){
        var secondParam = arguments[1];
        var thirdParam = arguments[2]; //undefined
        var paramAry = listToArray(arguments).slice(1);
        if(typeof secondParam == 'string'){
            if(typeof thirdParam !== 'undefined'){
                //setCss.apply(ele,[secondParam,thirdParam]);
                setCss.apply(ele,paramAry);
                return;
            }
            //return getCss.apply(ele,[secondParam]);
            return getCss.apply(ele,paramAry);
        }
        secondParam = secondParam || [];
        if((secondParam).toString() == '[object Object]'){
            //setGroupCss.apply(ele,[secondParam]);
            setGroupCss.apply(ele,paramAry);
        }
    }

    return {
        listToArray : listToArray,
        jsonParse : jsonParse,
        getRandom : getRandom,
        win : win,
        offset : offset,
        children : children,
        prev : prev,
        next : next,
        prevAll : prevAll,
        nextAll : nextAll,
        siblings : siblings,
        sibling : sibling,
        index : index,
        append : append,
        prepend : prepend,
        insertBefore : insertBefore,
        insertAfter : insertAfter,
        firstEleChild : firstEleChild,
        lastEleChild : lastEleChild,
        addClass : addClass,
        removeClass : removeClass,
        hasClass : hasClass,
        //getCss : getCss,
        //setCss : setCss,
        //setGroupCss : setGroupCss,
        css : css,
        getElesByClass : getElesByClass
    }
})();






