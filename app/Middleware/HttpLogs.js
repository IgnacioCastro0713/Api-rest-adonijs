'use strict';
const Logger = use('Logger');

class HttpLogs {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({request, response}, next) {
    const requestStart = process.hrtime();
    response.response.on('finish', () => {
      const [sec, nanosec] = process.hrtime(requestStart);
      const responseTime = (sec * 1e9 + nanosec) / 1000000;

      Logger.info('%s(%s) request on %s url -> %s',
        request.method(),
        response.response.statusCode,
        request.url(),
        `${responseTime} ms`
      )
    });
    await next()
  }
}

module.exports = HttpLogs;
