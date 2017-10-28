var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var global = (0, eval)('this'); //获取全局对象

function timeAdd0(time) {
    return time > 9 ? time : '0' + time;
}
var time = function time() {
    var now = new Date(),
        hour = timeAdd0(now.getHours()),
        min = timeAdd0(now.getMinutes()),
        sec = timeAdd0(now.getSeconds());

    return hour + ':' + min + ':' + sec;
};

var notObj = function notObj(parame) {
    if (parame === null || parame === undefined) {
        return true;
    }

    var value = parame.valueOf();

    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) != 'object' && typeof value != 'function') {
        return true;
    } else {
        return false;
    }
};

var name = "logger";
var version = "1.0.0";

var config = {
    version: version,
    name: name,
    "switch": true,
    "level": 0,
    "action": ['time', 'level', 'module'],
    "styles": {
        level: {
            '0': '#58B7FF',
            '1': '#2a75ed',
            '2': '#F7BA2A',
            '3': '#f06d6b'
        },
        time: '#324057',
        module: '#324057',
        content: '#1F2D3D'
    },
    "levelArray": {
        'LOG': 0,
        'INFO': 1,
        'WARN': 2,
        'ERROR': 3
    },
    "modules": [],
    "filteModules": []
};

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Logger$1(module) {
    if (!(this instanceof Logger$1)) {
        return new Logger$1(module);
    }
    this.module = module;
    Logger$1.getConfig('modules').push(module);
}

Logger$1 = Object.assign(Logger$1, {
    config: config,
    setConfig: function setConfig(confName, conf) {
        this.config[confName] = conf;
        return true;
    },
    getConfig: function getConfig(confName) {
        return confName !== undefined ? this.config[confName] : this.config;
    },
    conf: function conf(confName, _conf) {
        return _conf !== undefined ? this.setConfig(confName, _conf) : this.getConfig(confName);
    },
    transLevel: function transLevel(level) {
        return {
            '0': 'LOG',
            '1': 'INF',
            '2': 'WRN',
            '3': 'ERR'
        }[level] || '???';
    },

    getStyle: {
        level: function level(_level) {
            var color = Logger$1.config.styles.level[_level] || '#58B7FF';
            return 'background: ' + color + '; color: #fff;';
        },
        time: function time$$1() {
            return 'background: #F9FAFC; color: ' + Logger$1.config.styles.time + ';';
        },
        module: function module() {
            return 'background: #F9FAFC; color: ' + Logger$1.config.styles.module + ';';
        },
        content: function content() {
            return 'color: ' + Logger$1.config.styles.content + ';';
        }
    }
});

Logger$1.prototype = {
    _log: function _log(type, content) {
        type = type.toUpperCase() || 'LOG';
        var CONFIG = Logger$1.getConfig(),
            action = CONFIG.action,
            level = CONFIG.levelArray[type];
        if (!CONFIG.switch) {
            return false;
        }

        var logParams = [],
            styleParams = [],
            logStr = '',
            len = content.length,
            first = content[0];

        if (CONFIG.level > level) {
            //当前日志级别已禁止
            return false;
        }

        if (action.indexOf('level') >= 0) {
            logParams.push('%c ' + Logger$1.transLevel(level));
            styleParams.push(Logger$1.getStyle.level(level));
        }

        if (action.indexOf('time') >= 0) {
            logParams.push('%c [' + time() + ']');
            styleParams.push(Logger$1.getStyle.time());
        }

        if (action.indexOf('module') >= 0) {
            logParams.push('%c' + this.module);
            styleParams.push(Logger$1.getStyle.module());
        }

        logStr = logParams.join(' ');
        styleParams.push(Logger$1.getStyle.content());

        if (len === 1 && notObj(first)) {
            var _console;

            (_console = console).log.apply(_console, [logStr + '%c -> ' + first].concat(styleParams));
        } else {
            var _console2;

            (_console2 = console).log.apply(_console2, [logStr + '%c -> '].concat(styleParams, _toConsumableArray(content)));
        }
    },
    log: function log() {
        for (var _len = arguments.length, content = Array(_len), _key = 0; _key < _len; _key++) {
            content[_key] = arguments[_key];
        }

        this._log.call(this, 'log', content);
    },
    info: function info() {
        for (var _len2 = arguments.length, content = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            content[_key2] = arguments[_key2];
        }

        this._log.call(this, 'info', content);
    },
    warn: function warn() {
        for (var _len3 = arguments.length, content = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            content[_key3] = arguments[_key3];
        }

        this._log.call(this, 'warn', content);
    },
    error: function error() {
        for (var _len4 = arguments.length, content = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            content[_key4] = arguments[_key4];
        }

        this._log.call(this, 'error', content);
    }
};

var Logger$2 = Logger$1;

var window = global.window;

(function (win) {
    var _Logger = win.Logger;

    win.Logger = Logger$2;

    Logger$2.conflict = function () {
        win.Logger = _Logger;
        return Logger$2;
    };
})(window);

export default Logger$2;
