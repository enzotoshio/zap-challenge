import { getPropertyPublishers } from '../property';
import { groupByPublisher } from '../properties';

jest.mock('../property');

describe('properties service', () => {
  describe('groupByPublisher', () => {
    it('return the property list grpuped by publisher', () => {
      getPropertyPublishers.mockReturnValue(['viva', 'zap', 'other']);

      const groupedProperties = groupByPublisher([{ id: 1 }]);

      expect(groupedProperties).toEqual({
        viva: [{ id: 1 }],
        zap: [{ id: 1 }],
        other: [{ id: 1 }],
      });
    });
  });
});
