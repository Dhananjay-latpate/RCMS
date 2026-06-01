'use strict';

/**
 * testing service
 */

const { createCoreService } = require('@resillix/strapi').factories;

module.exports = createCoreService('api::testing.testing');
