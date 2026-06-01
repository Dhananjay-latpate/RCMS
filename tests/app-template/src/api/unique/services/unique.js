'use strict';

/**
 * unique service
 */

const { createCoreService } = require('@resillix/strapi').factories;

module.exports = createCoreService('api::unique.unique');
