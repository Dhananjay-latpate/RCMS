'use strict';

/**
 * config service
 */

const { createCoreService } = require('@resillix/strapi').factories;

module.exports = createCoreService('api::config.config');
