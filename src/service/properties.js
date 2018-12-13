import { getPropertyPublishers } from './property';

export function groupByPublisher(list) {
  return list.reduce(
    (acc, item) => {
      const publishers = getPropertyPublishers(item);

      publishers.forEach(publisher => acc[publisher].push(item));

      return acc;
    },
    { viva: [], zap: [], other: [] }
  );
}

export default {
  groupByPublisher,
};
