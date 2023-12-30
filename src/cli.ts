#!/usr/bin/env node
import assert from 'assert';
import { install } from './install';
import { uninstall } from './uninstall';

const actions: Record<string, Action> = { install, uninstall };

(async () => {
  const [_node, _packageMng, command, ...params] = process.argv;
  const targetAction = actions[command] ?? actions['run'];

  try {
    const packageJsonPath = process.env['npm_package_json'];
    assert(!!packageJsonPath, 'Environment variable npm_package_json is not set');

    await targetAction(packageJsonPath);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();


