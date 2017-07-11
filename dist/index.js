'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rafThrottle = require('raf-throttle');

var _rafThrottle2 = _interopRequireDefault(_rafThrottle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOpts = {
    action: function action() {},
    limit: null,
    throttle: false
};
var LIMITX = 'X';
var LIMITY = 'Y';

var advancedPageResize = function () {
    function advancedPageResize(opts) {
        _classCallCheck(this, advancedPageResize);

        var options = _extends({}, defaultOpts, opts);

        this.options = options;
        this.lastWidth = window.innerWidth;
        this.lastHeight = window.innerHeight;

        var callback = this._getCallback();
        resize(callback);
    }

    _createClass(advancedPageResize, [{
        key: 'resize',
        value: function resize(callback) {
            window.addEventListener('resize', callback);
        }
    }, {
        key: '_getCallback',
        value: function _getCallback() {
            if (this.options.limit === null || this.options.limit !== LIMITX && this.options.limit !== LIMITY) {
                return this.options.throttle ? (0, _rafThrottle2.default)(this.options.action) : this.options.action;
            } else {
                var callback = this.options.limit === LIMITX ? this._resizeX() : this._resizeY();
                return this.options.throttle ? (0, _rafThrottle2.default)(callback) : callback;
            }
        }
    }, {
        key: '_resizeY',
        value: function _resizeY() {
            var _this = this;

            return function () {
                if (window.innerHeight !== _this.lastHeight) {
                    _this.options.action();
                }
                _this._setDimensions();
            };
        }
    }, {
        key: '_resizeX',
        value: function _resizeX() {
            var _this2 = this;

            return function () {
                if (window.innerWidth !== _this2.lastWidth) {
                    _this2.options.action();
                }
                _this2._setDimensions();
            };
        }
    }, {
        key: '_setDimensions',
        value: function _setDimensions() {
            this.lastWidth = window.innerWidth;
            this.lastHeight = window.height;
        }
    }]);

    return advancedPageResize;
}();

module.exports = function (opts) {
    function watch() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        new advancedPageResize(opts);
    }

    var root = {
        watch: watch
    };

    return root;
}();