'use strict';

/**
 * unique router
 */

const { createCoreRouter } = require('@resillix/strapi').factories;

module.exports = createCoreRouter('api::unique.unique');
