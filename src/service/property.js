export const rules = {
  zap: [
    ({ pricingInfos: { price, businessType } }) =>
      isRental({ businessType }) && price >= 3500,
    ({ pricingInfos: { price, businessType } }) =>
      isSale({ businessType }) && price >= 600000,
  ],
  viva: [
    ({ pricingInfos: { price, businessType } }) =>
      isRental({ businessType }) && price <= 4000,
    ({ pricingInfos: { price, businessType } }) =>
      isSale({ businessType }) && price <= 700000,
  ],
};

export function getPropertyPublisher(property) {
  return Object.keys(rules).reduce((acc, publisher) => {
    const isFromPublisher = rules[publisher].some(rule => rule(property));

    if (isFromPublisher) return publisher;

    return acc;
  }, '');
}

export function isRental({ businessType }) {
  return businessType === 'RENTAL';
}

export function isSale({ businessType }) {
  return businessType === 'SALE';
}

export default { getPropertyPublisher, rules, isRental, isSale };
