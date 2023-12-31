import { throws } from './helpers';

describe('helpers', () => {
  describe('throws', () => {
    test('should throw an error', () => {
      expect(() => throws('error')).toThrow('error');
    });
    test('should throw an error', () => {
      expect(() => throws(new Error('error'))).toThrow('error');
    });
  });
});
