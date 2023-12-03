#!/usr/bin/env node
import actions from "./actions";

(async () => {
  const [_node, _packageMng, command, ...params] = process.argv;
  const targetAction = actions[command] ?? actions['run'];

  try {
    await targetAction(__dirname);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();


