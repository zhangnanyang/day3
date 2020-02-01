'use strict';

const Controller = require('egg').Controller;
const sendRes = require('../utils');
const jwt = require('jsonwebtoken');

class UserController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { password } = ctx.request.body;
    const result = await ctx.service.user.login(ctx.request.body);
    if (result.length === 0) {
      ctx.body = sendRes(0, '账号未注册');
      return;
    }

    if (result.length > 0) {
      if (result[0].password !== password) {
        ctx.body = sendRes(0, '密码错误');
        return;
      }
    }
    const token = jwt.sign({ ...result[0] }, app.config.keys);
    ctx.body = sendRes(1, '登陆成功', { token });
  }
  async register() {
    const { ctx } = this;
    const result = await ctx.service.user.login(ctx.request.body);
    if (result.length > 0) {
      ctx.body = sendRes(0, '账号已注册');
      return;
    }

    const $sql = await ctx.service.user.register(ctx.request.body);
    if ($sql.affectedRows === 1) {
      ctx.body = sendRes(2, '注册成功');
      return;
    }
  }
}

module.exports = UserController;
