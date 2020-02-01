'use strict';

const flag = true;

const whiteList = ['/user/login'];
module.exports = () => {
    return async function authorization(ctx, next) {
        if (!whiteList.includes(ctx.request.url) && flag) {
            if (!ctx.session.userToken === undefined) {
                ctx.body = {
                    code: 0,
                    message: '登录超时',
                };
            } else if (!ctx.request.headers.authorization) {
                ctx.body = {
                    code: 0,
                    message: '请登录!',
                };
            } else if (ctx.request.headers.authorization && ctx.session.userToken) {
                const clientToken = ctx.request.headers.authorization;
                const serverToken = ctx.session.userToken;
                if (clientToken === serverToken) {
                    await next();
                } else {
                    ctx.body = {
                        code: 0,
                        message: '请登录!',
                    };
                }
            }
        } else {
            await next();
        }
    };
};
