import config from './config.js';
import {time, notObj} from './utils.js';

function Logger (module) {
    if (!(this instanceof Logger)) {
        return new Logger(module);
    }
    this.module = module;
    Logger.getConfig('modules').push(module);
}

Logger = Object.assign(Logger, {
    config,
    setConfig (confName, conf) {
        this.config[confName] = conf;
        return true;
    },
    getConfig (confName) {
        return confName !== undefined 
            ? this.config[confName]
            : this.config;
    },
    conf (confName, conf) {
        return conf !== undefined
            ? this.setConfig(confName, conf)
            : this.getConfig(confName);
    },
    transLevel (level) {
        return {
            '0': 'LOG',
            '1': 'INF',
            '2': 'WRN',
            '3': 'ERR'
        }[level] || '???'
    },
    getStyle: {
        level: (level) => {
            let color = Logger.config.styles.level[level] || '#58B7FF';
            return `background: ${color}; color: #fff;`;
        },
        time: () => `background: #F9FAFC; color: ${Logger.config.styles.time};`,
        module: () => `background: #F9FAFC; color: ${Logger.config.styles.module};`,
        content: () => `color: ${Logger.config.styles.content};`,
    }
});

Logger.prototype = {
    _log (type, content) {
        type = type.toUpperCase() || 'LOG';
        const 
            CONFIG = Logger.getConfig(),
            action = CONFIG.action,
            level  = CONFIG.levelArray[type];
        if (!CONFIG.switch) {
            return false;
        }


        let logParams   = [], 
            styleParams = [],
            logStr      = '',
            len         = content.length,
            first       = content[0];
        
        if (CONFIG.level > level) { //当前日志级别已禁止
            return false;
        }

        if (action.indexOf('level') >= 0) {
            logParams.push('%c ' + Logger.transLevel(level));
            styleParams.push(Logger.getStyle.level(level));
        }

        if (action.indexOf('time') >= 0) {
            logParams.push(`%c [${time()}]`);
            styleParams.push(Logger.getStyle.time());
        }
        
        if (action.indexOf('module') >= 0) {
            action.indexOf('time') >= 0
                ? logParams.push(`%c${this.module} `)
                : logParams.push(`%c ${this.module} `);
            styleParams.push(Logger.getStyle.module());
        }

        logStr = logParams.join(' ');
        styleParams.push(Logger.getStyle.content());

        if (len === 1 && notObj(first)) {
            console.log(`${logStr}%c -> ${first}`, ...styleParams);
        } else {
            console.log(`${logStr}%c -> `, ...styleParams, ...content);
        }
        
    },
    log (...content) {
        this._log.call(this, 'log', content);
    },
    info (...content) {
        this._log.call(this, 'info', content);
    },
    warn (...content) {
        this._log.call(this, 'warn', content);
    },
    error (...content) {
        this._log.call(this, 'error', content);
    },
    
}



export default Logger;