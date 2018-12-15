import { getZapProperty } from './zap/selectors';
import { getVivaProperty } from './viva/selectors';

export const getProperty = (state, { id }) => {
  return getZapProperty(state, { id }) || getVivaProperty(state, { id });
};

export default {
  getProperty,
};
