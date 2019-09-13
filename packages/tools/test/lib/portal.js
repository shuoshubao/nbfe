import test from 'ava';
import { fetchPortal } from '../../lib/portal';

test('fetchPortal', async t => {
    const collaborators = await fetchPortal('vss')('collaborators');
    t.truthy(Array.isArray(collaborators));
});
