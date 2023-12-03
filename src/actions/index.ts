import { uninstall } from './uninstall';
import { install } from './install';
import { run } from './run';

export default { uninstall, install, run } as Record<string, Action>;
