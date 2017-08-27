const modern = require('server/src/modern');

module.exports = {
  name: 'static',
  options: {
    __root: 'public',
    public: {
      type: String,
      inherit: 'public'
    }
  },
  before: ctx => modern(ctx.express.static(ctx.options.static.public))(ctx)
};