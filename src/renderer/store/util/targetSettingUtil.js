/**
 * 校验 add target 方法参数
 * @param {*} target 
 * @param {*} thisObj 
 */
export function checkAddTargetMethodParam(target, thisObj) {
    let flag = true;
    if (target.theme === "") {
        flag = false;
        thisObj.$Message.error('目标主题不能为空');
    } else if (target.target === "") {
        flag = false;
        thisObj.$Message.error('目标名称不能为空');
    } else if (target.childTargets === "") {
        flag = false;
        thisObj.$Message.error('子目标不能为空');
    } else if (target.plan === "") {
        flag = false;
        thisObj.$Message.error('目标规划不能为空');
    } else if (target.icon === "") {
        flag = false;
        thisObj.$Message.error('目标图标不能为空');
    }
    return flag;
}

/**
 * 校验 update target 方法参数
 * @param {*} target 
 * @param {*} thisObj 
 */
export function checkUpdateTargetMethodParam(target, thisObj) {
    // TODO: 参数校验
    let flag = true;
    if (target.theme === "") {
        flag = false;
        thisObj.$Message.error('目标主题不能为空');
    } else if (target.target === "") {
        flag = false;
        thisObj.$Message.error('目标名称不能为空');
    } else if (target.childTargets === "") {
        flag = false;
        thisObj.$Message.error('子目标不能为空');
    } else if (target.plan === "") {
        flag = false;
        thisObj.$Message.error('目标规划不能为空');
    } else if (target.icon === "") {
        flag = false;
        thisObj.$Message.error('目标图标不能为空');
    }
    return flag;
}