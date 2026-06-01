'use strict';

/**
 * global service.
 */

const { createCoreService } = require('@resillix/strapi').factories;

module.exports = createCoreService('api::global.global');
