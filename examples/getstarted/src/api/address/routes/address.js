'use strict';

const { createCoreRouter } = require('@resillix/strapi').factories;

module.exports = createCoreRouter('api::address.address', {
  config: {
    find: {
      // auth: false,
    },
  },
  only: ['find', 'findOne'],
});
