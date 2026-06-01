const { createCoreRouter } = require('@resillix/strapi').factories;

module.exports = {
  test: createCoreRouter('plugin::myplugin.test', {
    type: 'content-api',
    only: ['find', 'findOne'],
  }),
};
