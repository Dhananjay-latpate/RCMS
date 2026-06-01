import permissions from '@resillix/permissions';
import { providerFactory } from '@resillix/utils';

const DEFAULT_TRANSFER_ACTIONS = ['push', 'pull'];

const providers = {
  action: providerFactory(),
  condition: providerFactory(),
};

DEFAULT_TRANSFER_ACTIONS.forEach((action) => {
  providers.action.register(action, { action });
});

const engine = permissions.engine.new({ providers });

export { engine, providers };
