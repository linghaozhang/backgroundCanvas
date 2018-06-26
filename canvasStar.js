!function (undefined) {
    "use strict"; //使用严格的标准
    var _global;
    /**
     * 2017-08-18
     * @var star_r:star半径系数，值越大，半径越大；
     * @var star_alpha:star透明度，值越大，越透明；
     * @var initStarNum:初始化star个数；
     * @var move_distance:位移距离，即star向上跑的距离，数值越大，相同时间内，速度越快。
     * @var dot_r:dot半径系数，值越大，半径越大；
     * @var dot_alpha:dot透明度；
     * @var dot_speed:dot运动速度；
     * @var dot_vanish:dot消失条件，透明度小于vanish时消失；
     * @var dot_mindis:dot最小距离；
     * @var dot_maxdis:dot最大距离；
     */
    var config = {
        star_r: 7,
        star_alpha: 1,
        initStarNum: 200,
        move_distance: 0.25
    };
    var canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        W = document.documentElement.clientWidth,
        H = document.documentElement.clientHeight,
        mouseMoving = false,
        mouseX, mouseY, stars = [];

    function CanvasStar() { };
    canvas.width = W;
    canvas.height = H;
    function initConfig(conf) {
        if (conf instanceof Object) {
            for (var key in conf) {
                config[key] = conf[key];
            }
        }
    }
    CanvasStar.prototype.init = function (conf) {
        initConfig(conf);
        ctx.fillstyle = "white";
        ctx.shadowColor = "white";
        ctx.shadowBlur = 0;
        for (var i = 0; i < config.initStarNum; i++) {
            stars[i] = new Star(Math.floor(Math.random() * W), Math.floor(Math.random() * H), true);
        }
        animate();
    };
    /**
     * [Star 设置单个star]
     * @param {[type]} id       [id]
     * @param {[type]} x        [x坐标]
     * @param {[type]} y        [y坐标]
     * @param {[type]} useCache [是否使用缓存]
     */

    function Star(x, y, useCache) {
        this.x = x;
        this.y = y;
        this.useCache = useCache;
        this.cacheCns = document.createElement("canvas");
        this.cacheCtx = this.cacheCns.getContext("2d");
        this.r = Math.floor(Math.random() * config.star_r + 1);
        this.cacheCns.width = 7 * this.r;
        this.cacheCns.height = 7 * this.r;
        this.alpha = Math.floor(Math.random() * 10 + 1) / config.star_alpha;
        this.color = "rgba(255,255,255," + this.alpha + ")";
        if (useCache) {
            this.cache();
        }
    }
    var colorNum = 0;
    Star.prototype = {
        draw: function () {
            if (!this.useCache) {
                colorNum++;
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.shadowColor = "white";
                ctx.shadowBlur = 1;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            } else {
                ctx.drawImage(this.cacheCns, this.x - this.r, this.y - this.r);
            }
        },

        cache: function () {
            colorNum++;
            this.cacheCtx.save();
            this.cacheCtx.fillStyle = this.color;
            this.cacheCtx.shadowColor = "white";
            this.cacheCtx.shadowBlur = 0;
            this.cacheCtx.beginPath();
            this.cacheCtx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI, true);
            this.cacheCtx.closePath();
            this.cacheCtx.fill();
            this.cacheCtx.restore();
        },
        move: function () {
            this.y += config.move_distance;
            if (this.y >= H+10) {
                this.y = -10;
            }
            this.draw();
        }
    };
    function animate() {
        ctx.clearRect(0, 0, W, H);
        for (var i in stars) {
            stars[i].move();
        }
        requestAnimationFrame(animate);
    }
    _global = (function () {
        return this || (0, eval)("this");
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = CanvasStar;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return CanvasStar;
        });
    } else {
        !("CanvasStar" in _global) && (_global.CanvasStar = CanvasStar);
    }
}();