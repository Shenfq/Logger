export const global = (0, eval)('this');  //获取全局对象

function timeAdd0 (time) {
    return time > 9 ? time : `0${time}`;
}
export const time = function () {
    const now   = new Date(),
          hour  = timeAdd0(now.getHours()),
          min   = timeAdd0(now.getMinutes()),
          sec   = timeAdd0(now.getSeconds());

    return `${hour}:${min}:${sec}`;
}

export const notObj = function (parame) {
    if (parame === null || parame === undefined) {
        return true;
    }

    const value = parame.valueOf();

    if (typeof value != 'object' && typeof value != 'function') {
        return true;
    } else {
        return false;
    }
}