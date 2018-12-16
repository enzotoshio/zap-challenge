import {
  getPropertyPublishers,
  isRental,
  isSale,
  hasValidVivaMonthlyCondoFee,
  hasMinimumZapSalePrice,
  isValidLocation,
  calculateUsableAreasPrice,
  isInBoundBox,
} from '../property';

describe('property service', () => {
  describe('getPropertyPublishers', () => {
    describe('when the property follows the rental rules for zap properties', () => {
      it('returns a array with the correct publisher name', () => {
        const property = {
          address: {
            geoLocation: {
              location: {
                lon: -46.693419,
                lat: -23.568704,
              },
            },
          },
          pricingInfos: {
            price: '5000',
            businessType: 'RENTAL',
          },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['zap']);
      });
    });

    describe('when the property follows the sale rules for zap properties', () => {
      it('returns a array with the correct publisher name', () => {
        const property = {
          address: {
            geoLocation: { location: { lon: -46.693419, lat: -23.568704 } },
          },
          usableAreas: '171',
          pricingInfos: { price: '701000', businessType: 'SALE' },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['zap']);
      });
    });

    describe('when the property follows the rental rules for viva properties', () => {
      it('returns a array with the correct publisher name', () => {
        const property = {
          address: {
            geoLocation: { location: { lon: -46.693419, lat: -23.568704 } },
          },
          pricingInfos: { price: '2000', businessType: 'RENTAL' },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['viva']);
      });
    });

    describe('when the property follows the sale rules for viva properties', () => {
      it('returns a array with the correct publisher name', () => {
        const property = {
          address: {
            geoLocation: { location: { lon: -46.693419, lat: -23.568704 } },
          },
          pricingInfos: { price: '300000', businessType: 'SALE' },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['viva']);
      });
    });

    describe('when the property follows the rental rules for viva and zap properties', () => {
      it('returns a array with the correct publishers names', () => {
        const property = {
          address: {
            geoLocation: { location: { lon: -43.0, lat: -23.568704 } },
          },
          pricingInfos: {
            monthlyCondoFee: '100',
            price: '3999',
            businessType: 'RENTAL',
          },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['zap', 'viva']);
      });
    });

    describe('when the property follows the rental rules for viva and zap properties', () => {
      it('returns a array with the correct publishers names', () => {
        const property = {
          address: {
            geoLocation: { location: { lon: -43.0, lat: -23.568704 } },
          },
          usableAreas: 0,
          pricingInfos: {
            monthlyCondoFee: '100',
            price: '600000',
            businessType: 'SALE',
          },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['zap', 'viva']);
      });
    });

    describe('when the property doesnt follow the rules any publisher properties', () => {
      it('returns a array with the publisher "other"', () => {
        const property = {};
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['other']);
      });
    });
  });

  describe('isRental', () => {
    it('returns true if businessType is equal to RENTAL', () => {
      const pricingInfo = {
        businessType: 'RENTAL',
      };
      const response = isRental(pricingInfo);

      expect(response).toBeTruthy();
    });
  });

  describe('isSale', () => {
    it('returns true if businessType is equal to SALE', () => {
      const pricingInfo = { businessType: 'SALE' };
      const response = isSale(pricingInfo);

      expect(response).toBeTruthy();
    });
  });

  describe('hasValidVivaMonthlyCondoFee', () => {
    it('returns true if the monthly condo fee is lower than 30% of the price', () => {
      const payload = { monthlyCondoFee: '100', price: '3000' };
      const response = hasValidVivaMonthlyCondoFee(payload);

      expect(response).toBeTruthy();
    });
  });

  describe('hasMinimumZapSalePrice', () => {
    describe('when the property is inside the bound box', () => {
      it('returns false if the monthly condo fee is lower than 600000', () => {
        const payload = {
          location: { lon: -46.693419, lat: -23.568704 },
          price: '600000',
        };
        const response = hasMinimumZapSalePrice(payload);

        expect(response).toBeFalsy();
      });
    });

    describe('when the property is outside the bound box', () => {
      it('returns true if the monthly condo fee is higher or equal to 600000', () => {
        const payload = {
          location: {},
          price: '600000',
        };
        const response = hasMinimumZapSalePrice(payload);

        expect(response).toBeTruthy();
      });
    });
  });

  describe('hasMaximumVivaRentalPrice', () => {
    it('returns true if the price is lower than 4000', () => {
      const payload = { location: {}, price: '3000' };
      const response = hasValidVivaMonthlyCondoFee(payload);

      expect(response).toBeTruthy();
    });
  });

  describe('isValidLocation', () => {
    it('returns true if lat and lon are not 0', () => {
      const location = { lat: -23.546686, lon: -46.641146 };
      const response = isValidLocation(location);

      expect(response).toBeTruthy();
    });
  });

  describe('calculateUsableAreasPrice', () => {
    it('returns the correct price', () => {
      const payload = { usableAreas: 10, price: 100 };
      const response = calculateUsableAreasPrice(payload);

      expect(response).toBe(10);
    });
  });

  describe('isInBoundBox', () => {
    it('returns true if the lat and lon are inside the allowed range', () => {
      const location = { lat: -23.546686, lon: -46.641146 };
      const response = isInBoundBox(location);

      expect(response).toBeTruthy();
    });
  });
});
