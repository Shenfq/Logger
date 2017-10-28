import {global} from './utils.js';
import Logger from './logger.js';

const window = global.window;

(function (win) {
    const _Logger = win.Logger;

    win.Logger = Logger;

    Logger.conflict = function () {
        win.Logger = _Logger;
        return Logger;
    };
})(window);

export default Logger;