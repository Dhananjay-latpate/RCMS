'use strict';

/**
 * config router
 */

const { createCoreRouter } = require('@resillix/strapi').factories;

module.exports = createCoreRouter('api::config.config');
