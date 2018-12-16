import { getPropertyPublishers, isRental, isSale } from '../property';

describe('property service', () => {
  describe('getPropertyPublishers', () => {
    describe('when the property follows the rules for zap properties', () => {
      it('returns a array with the correct publisher name', () => {
        const property = {
          pricingInfos: {
            price: '5000',
            businessType: 'RENTAL',
          },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['zap']);
      });
    });

    describe('when the property follows the rules for viva properties', () => {
      it('returns a array with the correct publisher name', () => {
        const property = {
          pricingInfos: {
            price: '2000',
            businessType: 'RENTAL',
          },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['viva']);
      });
    });

    describe('when the property follows the rules for viva and zap properties', () => {
      it('returns a array with the correct publishers names', () => {
        const property = {
          pricingInfos: { price: '4000', businessType: 'RENTAL' },
        };
        const publishers = getPropertyPublishers(property);

        expect(publishers).toEqual(['zap', 'viva']);
      });
    });

    describe('when the property doesnt follow the rules any publisher properties', () => {
      it('returns a array with the publisher "other"', () => {
        const property = {
          pricingInfos: { price: undefined, businessType: undefined },
        };
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
});
