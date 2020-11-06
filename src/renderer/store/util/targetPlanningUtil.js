import axios from "axios";
import { format, addDays, toDate } from 'date-fns'

/**
 * 检查 add period 方法参数
 * @param {*} periodObj 
 * @param {*} thisObj 
 */
export function checkAddPeriodMethodParam(periodObj, thisObj) {
    // TODO: 
    let flag = true;
    if (periodObj.targetId === 0) {
        flag = false;
        thisObj.$Message.error('目标主题不能为空');
    }
    return flag;
}

/**
 * 检查 update period 方法参数
 * @param {*} periodObj 
 * @param {*} thisObj 
 */
export function checkUpdatePeriodMethodParam(periodObj, thisObj) {
    // TODO: 
    let flag = true;
    if (periodObj.targetId === 0) {
        flag = false;
        thisObj.$Message.error('目标主题不能为空');
    }
    return flag;
}

export function handleDeadLine(obj, thisObj) {
    let dateTime = null;
    let periodObj = obj.periodObj;
    if (obj.updatePeriodBtnStatus) {
        dateTime = toDate(periodObj.createTime);
    } else {
        dateTime = new Date();
    }
    let availableTime = periodObj.availableTime;
    let totalTime = periodObj.totalTime;
    let deadlineType = periodObj.deadlineType;
    if (availableTime === "") {
        thisObj.$Message.warning("可用时间不能为空!");
    } else if (availableTime <= 0) {
        thisObj.$Message.warning("可用时间不能小于或等于零!");
    } else if (totalTime <= 0) {
        thisObj.$Message.warning("总耗时不能小于或等于零!");
    }
    // 获取完成这个目标需要的时间
    let days = 1;
    if (totalTime >= availableTime) {
        days = parseInt(totalTime / availableTime);
    }
    // 判断是否整除
    let isDivisible = totalTime % availableTime === 0;
    if (!isDivisible) {
        days = days + 1;
    }

    if (deadlineType === "1") {
        // 不区分节假日
        dateTime = addDays(dateTime, days);
        periodObj.deadline = new Date(dateTime);
    } else {
        // 1: 为每一天; 2: 工作日; 3: 节假日
        if (deadlineType === "2") {
            setDeadline(dateTime, days, periodObj, 0)
        } else {
            // 节假日
            setDeadline(dateTime, days, periodObj, 1);
        }
    }
}

/**
 * 设置截止日期
 * @param {*} dateObj 
 */
export async function setDeadline(dateTime, days, periodObj, type) {
    for (let i = 0; i < days; i++) {
        let flag = true;
        dateTime = addDays(dateTime, 1);
        while (flag) {
            // 调用接口, 判断当前日期是否为节假日
            let result = await isHoliday(dateTime);
            // result:0 是工作日; result:1 是节假日
            if (result !== "" && result == type) {
                flag = false;
            } else {
                dateTime = addDays(dateTime, 1);
            }
        }
    }
    periodObj.deadline = new Date(dateTime);
}



/**
 * 判断当前日期是否是节假日(0: 是工作日, 1: 是节假日)
 * @param {*} dateObj 
 */
export async function isHoliday(dateObj) {
    let result = "";
    let date = format(dateObj, 'yyyyMMdd');
    await axios({
        url: "http://www.easybots.cn/api/holiday.php",
        method: "get",
        params: {
            "d": date
        }
    }).then(resp => {
        result = resp.data[date];
    }).catch(error => {
        console.log(error.message);
        return;
    })
    return result;
}