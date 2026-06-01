/**
 * single-type-non-local service
 */

const { createCoreService } = require('@resillix/strapi').factories;

module.exports = createCoreService('api::single-type-non-local.single-type-non-local');
