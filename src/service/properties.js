import { getPropertyPublisher } from './property';

export function groupByPublisher(list) {
  return list.reduce(
    (acc, item) => {
      const publisher = getPropertyPublisher(item) || 'other';

      acc[publisher].push(item);

      return acc;
    },
    { viva: [], zap: [], other: [] }
  );
}

export default {
  groupByPublisher,
};
