;(function (){
    // callback ： 回调函数，当运动到达终点之后要执行的函数
    function animate(ele,target,duration,animateEffect,callback){
        // 如果把所有的形参全部封装到一个对象里，然后使用的时候直接通过对象的属性来获取。那么这样就不会有参数的顺序问题。那么在调用函数传实参的时候所有的属性名字必须写对。为了防止写错。那么在代码需要用或者 || 写一个默认值
        var interval = 10;
        var time = 0;
        var begin = {};
        var change = {};
        var zhufengEffect = {
            //匀速
            Linear: function (t, b, c, d) {
                return c * t / d + b;
            },
            //指数衰减的反弹缓动
            Bounce: {
                easeIn: function (t, b, c, d) {
                    return c - zhufengEffect.Bounce.easeOut(d - t, 0, c, d) + b;
                },
                easeOut: function (t, b, c, d) {
                    if ((t /= d) < (1 / 2.75)) {
                        return c * (7.5625 * t * t) + b;
                    } else if (t < (2 / 2.75)) {
                        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                    } else if (t < (2.5 / 2.75)) {
                        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                    } else {
                        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                    }
                },
                easeInOut: function (t, b, c, d) {
                    if (t < d / 2) {
                        return zhufengEffect.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                    }
                    return zhufengEffect.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            },
            //二次方的缓动
            Quad: {
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t + b;
                },
                easeOut: function (t, b, c, d) {
                    return -c * (t /= d) * (t - 2) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t + b;
                    }
                    return -c / 2 * ((--t) * (t - 2) - 1) + b;
                }
            },
            //三次方的缓动
            Cubic: {
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t * t + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t + 1) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t + b;
                    }
                    return c / 2 * ((t -= 2) * t * t + 2) + b;
                }
            },
            //四次方的缓动
            Quart: {
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t * t * t + b;
                },
                easeOut: function (t, b, c, d) {
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t * t + b;
                    }
                    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
                }
            },
            //五次方的缓动
            Quint: {
                easeIn: function (t, b, c, d) {
                    return c * (t /= d) * t * t * t * t + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return c / 2 * t * t * t * t * t + b;
                    }
                    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
                }
            },
            //正弦曲线的缓动
            Sine: {
                easeIn: function (t, b, c, d) {
                    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * Math.sin(t / d * (Math.PI / 2)) + b;
                },
                easeInOut: function (t, b, c, d) {
                    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
                }
            },
            //指数曲线的缓动
            Expo: {
                easeIn: function (t, b, c, d) {
                    return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
                },
                easeOut: function (t, b, c, d) {
                    return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if (t == 0) return b;
                    if (t == d) return b + c;
                    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
                }
            },
            //圆形曲线的缓动
            Circ: {
                easeIn: function (t, b, c, d) {
                    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
                },
                easeOut: function (t, b, c, d) {
                    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
                },
                easeInOut: function (t, b, c, d) {
                    if ((t /= d / 2) < 1) {
                        return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                    }
                    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
                }
            },
            //超过范围的三次方缓动
            Back: {
                easeIn: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c * (t /= d) * t * ((s + 1) * t - s) + b;
                },
                easeOut: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
                },
                easeInOut: function (t, b, c, d, s) {
                    if (s == undefined) s = 1.70158;
                    if ((t /= d / 2) < 1) {
                        return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                    }
                    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
                }
            },
            //指数衰减的正弦曲线缓动
            Elastic: {
                easeIn: function (t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    if (!p) p = d * .3;
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                },
                easeOut: function (t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d) == 1) return b + c;
                    if (!p) p = d * .3;
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
                },
                easeInOut: function (t, b, c, d, a, p) {
                    if (t == 0) return b;
                    if ((t /= d / 2) == 2) return b + c;
                    if (!p) p = d * (.3 * 1.5);
                    var s;
                    !a || a < Math.abs(c) ? (a = c, s = p / 4) : s = p / (2 * Math.PI) * Math.asin(c / a);
                    if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
                }
            }
        }; // 这个对象里面就是动画效果
        var defaultEffect = zhufengEffect.Linear; //默认是一个匀速运动的效果
        if(typeof animateEffect == 'number'){
            switch (animateEffect){
                case 1 :
                    defaultEffect = zhufengEffect.Back.easeInOut;
                    break;
                case 2:
                    defaultEffect = zhufengEffect.Bounce.easeInOut;
                    break
                case 3:
                    defaultEffect = zhufengEffect.Elastic.easeInOut;
                    break;
            }
        }else if(animateEffect instanceof Array){
            defaultEffect = zhufengEffect[animateEffect[0]][animateEffect[1]];
        }else if(typeof animateEffect == 'function'){
            callback = animateEffect;
        }

        for(var key in target){
            begin[key] = utils.css(ele,key);
            change[key] = target[key] - begin[key];
        }
        if(ele.timer){
            window.clearInterval(ele.timer);
        }
        ele.timer = window.setInterval(function (){
            time += interval;
            if(time >= duration){
                window.clearInterval(ele.timer);

                utils.css(ele,target);

                //ele.style.backgroundColor = 'green';
                if(typeof callback == 'function'){
                    callback.call(ele); // callback函数在这里执行函数中的this是window
                    // 把回调函数中的this修改成运动的那个元素(ele)
                }
                return;
            }
            for(var key in change){
                if(change[key]){
                    var val = defaultEffect(time,begin[key],change[key],duration);
                    utils.css(ele,key,val);
                }
            }
        },interval);
    }
    window.animate = animate; //把这个私有函数animate添加到window的animate属性上，这是主动暴露接口
})();


