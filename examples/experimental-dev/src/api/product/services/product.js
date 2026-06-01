'use strict';

/**
 * product service
 */

const { createCoreService } = require('@resillix/strapi').factories;

module.exports = createCoreService('api::product.product');
