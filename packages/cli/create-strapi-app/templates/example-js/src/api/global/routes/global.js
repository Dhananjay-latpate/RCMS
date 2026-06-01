'use strict';

/**
 * global router.
 */

const { createCoreRouter } = require('@resillix/strapi').factories;

module.exports = createCoreRouter('api::global.global');
