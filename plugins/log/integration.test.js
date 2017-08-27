const server = require('../../server');
const { status } = server.reply;

// Test runner:
const run = require('server/test/run');

describe('log()', () => {
  it('is defined', () => {
    server(parseInt(1000 + Math.random() * 10000)).then(ctx => {
      expect(ctx.log).toBeDefined();
      ctx.close();
    });
  });

  it('is inside the middleware', async () => {
    const res = await run(ctx => status(ctx.log ? 200 : 500)).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('has the right methods', async () => {
    const res = await run(ctx => {
      expect(ctx.log.emergency).toBeDefined();
      expect(ctx.log.alert).toBeDefined();
      expect(ctx.log.critical).toBeDefined();
      expect(ctx.log.error).toBeDefined();
      expect(ctx.log.warning).toBeDefined();
      expect(ctx.log.notice).toBeDefined();
      expect(ctx.log.info).toBeDefined();
      expect(ctx.log.debug).toBeDefined();
      return status(200);
    }).get('/');
    expect(res.statusCode).toBe(200);
  });

  it('rejects invalid log levels', async () => {
    const res = run({ log: 'abc' }).get('/');
    expect(res).rejects.toMatchObject({ code: '/server/options/enum' });
  });
});