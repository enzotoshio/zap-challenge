import { isEmpty, inRange, defaultsDeep } from 'lodash';

export const rules = {
  zap: [
    ({
      address: {
        geoLocation: { location },
      },
      pricingInfos: { price, businessType },
    }) =>
      isValidLocation(location) && isRental({ businessType }) && price >= 3500,
    ({
      address: {
        geoLocation: { location },
      },
      usableAreas,
      pricingInfos: { price, businessType },
    }) =>
      isValidLocation(location) &&
      isSale({ businessType }) &&
      hasValidZapUsableAreas({
        usableAreas,
        price,
      }) &&
      hasMinimumZapSalePrice({
        location,
        price,
      }),
  ],
  viva: [
    ({
      address: {
        geoLocation: { location },
      },
      pricingInfos: { price, businessType, monthlyCondoFee },
    }) =>
      isValidLocation(location) &&
      isRental({ businessType }) &&
      hasMaximumVivaRentalPrice({ price, location }) &&
      hasValidVivaMonthlyCondoFee({ price, monthlyCondoFee }),
    ({
      address: {
        geoLocation: { location },
      },
      pricingInfos: { price, businessType },
    }) =>
      isValidLocation(location) && isSale({ businessType }) && price <= 700000,
  ],
};

export function hasValidVivaMonthlyCondoFee({ monthlyCondoFee, price }) {
  const parsedMonthlyCondoFee = parseFloat(monthlyCondoFee);

  if (isNaN(parsedMonthlyCondoFee) || parsedMonthlyCondoFee <= 0) return true;

  const parsedPrice = parseFloat(price);

  return monthlyCondoFee < parsedPrice * 0.3;
}

export function hasMinimumZapSalePrice({ location, price }) {
  const parsedPrice = parseFloat(price);
  const adjustedPrice = isInBoundBox(location)
    ? parsedPrice * 0.9
    : parsedPrice;

  return adjustedPrice >= 600000;
}

export function hasMaximumVivaRentalPrice({ location, price }) {
  const parsedPrice = parseFloat(price);
  const adjustedPrice = isInBoundBox(location)
    ? parsedPrice * 1.5
    : parsedPrice;

  return adjustedPrice <= 4000;
}

export function isValidLocation({ lat, lon }) {
  return lat !== 0 && lon !== 0;
}

export function calculateUsableAreasPrice({ usableAreas, price }) {
  return parseFloat(price) / usableAreas || 0;
}

export function hasValidZapUsableAreas({ usableAreas, price }) {
  return (
    usableAreas === 0 ||
    calculateUsableAreasPrice({ usableAreas, price }) > 3500
  );
}

export function isInBoundBox({ lat, lon }) {
  return (
    inRange(lat, -23.546685, -23.568704) && inRange(lon, -46.641145, -46.693419)
  );
}

export function getPropertyPublishers(property) {
  const publishers = Object.keys(rules).reduce((acc, publisher) => {
    const isFromPublisher = rules[publisher].some(rule =>
      rule(
        defaultsDeep(property, {
          address: {
            geoLocation: { location: {} },
          },
          pricingInfos: {},
        })
      )
    );

    if (isFromPublisher) acc.push(publisher);

    return acc;
  }, []);

  if (isEmpty(publishers)) publishers.push('other');

  return publishers;
}

export function isRental({ businessType }) {
  return businessType === 'RENTAL';
}

export function isSale({ businessType }) {
  return businessType === 'SALE';
}

export default { getPropertyPublishers, rules, isRental, isSale };
