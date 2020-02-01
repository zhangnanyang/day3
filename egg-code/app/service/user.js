'use strict';

const Controller = require('egg').Controller;

class ServiceController extends Controller {
  async login({ username }) {
    return await this.app.mysql.select('userlist', { where: { username } });
  }
  async register({ username, password, indent = '访客' }) {
    return await this.app.mysql.insert('userlist', { username, password, indent });
  }
}

module.exports = ServiceController;
