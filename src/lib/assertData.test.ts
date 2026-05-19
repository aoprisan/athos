import { describe, it, expect } from 'vitest';
import { assertData } from './assertData';

describe('assertData on the live dataset', () => {
  it('reports no issues against the current data', () => {
    const issues = assertData();
    if (issues.length > 0) {
      // Surface the messages in the test output so editorial drift is
      // immediately visible.
      console.error('assertData issues:', issues);
    }
    expect(issues).toEqual([]);
  });
});
