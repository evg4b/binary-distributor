#!/usr/bin/env node
import assert from 'assert';
import { throws } from './core/helpers';
import { install } from './core/install';
import { uninstall } from './core/uninstall';

const actions: Record<string, Action> = { install, uninstall };

(async () => {
  const [_node, _packageMng, command, ...params] = process.argv;
  const targetAction = actions[command] ?? throws(`Unknown command: ${ command }`);
  if (params.length !== 0) {
    throw new Error(`Unexpected parameters: ${ params.join(' ') }`);
  }

  try {
    const packageJsonPath = process.env['npm_package_json'];
    assert(!!packageJsonPath, 'Environment variable npm_package_json is not set');

    await targetAction(packageJsonPath);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();


