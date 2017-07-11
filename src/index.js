import throttle from 'raf-throttle'

const defaultOpts = {
    action: () => { },
    limit: null,
    throttle: false
}
const LIMITX = 'X';
const LIMITY = 'Y';

class advancedPageResize {
    constructor(opts) {
        const options = {
            ...defaultOpts,
            ...opts
        }

        this.options = options;
        this.lastWidth = window.innerWidth;
        this.lastHeight = window.innerHeight;

        let callback = this._getCallback();
        this._resize(callback);
    }

    _resize(callback) {
        window.addEventListener('resize', callback);
    }

    _getCallback() {
        if (this.options.limit === null || (this.options.limit !== LIMITX && this.options.limit !== LIMITY)) {
            return (this.options.throttle) ? throttle(this.options.action) : this.options.action;
        } else {
            let callback = (this.options.limit === LIMITX) ? this._resizeX() : this._resizeY();
            return (this.options.throttle) ? throttle(callback) : callback;
        }
    }

    _resizeY() {
        return () => {
            if (window.innerHeight !== this.lastHeight) {
                this.options.action();
            }
            this._setDimensions();
        };
    }

    _resizeX() {
        return () => {
            if (window.innerWidth !== this.lastWidth) {
                this.options.action();
            }
            this._setDimensions();
        };
    }

    _setDimensions() {
        this.lastWidth = window.innerWidth;
        this.lastHeight = window.innerHeight;
    }
}

module.exports = ((opts) => {
    function watch(opts = {}) {
        new advancedPageResize(opts);
    }

    var root = {
        watch: watch
    }

    return root;
})();