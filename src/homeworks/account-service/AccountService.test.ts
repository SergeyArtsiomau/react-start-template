import { AccountService } from './AccountService';
import { FakeAccountDatabase } from './FakeAccountDatabase';
import type { IAccountDatabase } from './IAccountDatabase';
import { ProductType, USER_TYPES, PRODUCT_TYPES, UserType } from './types';
import { InvalidDiscountError } from './validation';

const createDatabaseMock = (): jest.Mocked<IAccountDatabase> => ({
  getGeneralDiscount: jest.fn(),
  setGeneralDiscount: jest.fn(),
  getProductDiscount: jest.fn(),
  setProductDiscount: jest.fn(),
});

describe('AccountService', () => {
  describe('общие скидки по типам пользователей', () => {
    const generalDiscountCases: Array<{ userType: UserType; discount: number }> = [
      { userType: UserType.Standard, discount: 5 },
      { userType: UserType.Premium, discount: 10 },
      { userType: UserType.Gold, discount: 15 },
      { userType: UserType.Free, discount: 0 },
    ];

    it.each(generalDiscountCases)(
      'сохраняет общую скидку $discount% для пользователя $userType',
      ({ userType, discount }) => {
        const database = createDatabaseMock();
        const service = new AccountService(database);

        service.setGeneralDiscount(userType, discount);

        expect(database.setGeneralDiscount).toHaveBeenCalledWith(userType, discount);
      }
    );

    it.each(generalDiscountCases)(
      'возвращает общую скидку $discount% для пользователя $userType',
      ({ userType, discount }) => {
        const database = createDatabaseMock();
        database.getGeneralDiscount.mockReturnValue(discount);
        const service = new AccountService(database);

        expect(service.getGeneralDiscount(userType)).toBe(discount);
        expect(database.getGeneralDiscount).toHaveBeenCalledWith(userType);
      }
    );

    it('возвращает 0, если общая скидка для типа пользователя не задана', () => {
      const database = createDatabaseMock();
      database.getGeneralDiscount.mockReturnValue(null);
      const service = new AccountService(database);

      expect(service.getGeneralDiscount(UserType.Standard)).toBe(0);
    });
  });

  describe('скидки по типам товаров и пользователей', () => {
    const productDiscountCases: Array<{
      userType: UserType;
      productType: ProductType;
      discount: number;
    }> = [
      { userType: UserType.Standard, productType: ProductType.Car, discount: 3 },
      { userType: UserType.Premium, productType: ProductType.Toy, discount: 7 },
      { userType: UserType.Gold, productType: ProductType.Food, discount: 12 },
      { userType: UserType.Free, productType: ProductType.Car, discount: 1 },
    ];

    it.each(productDiscountCases)(
      'сохраняет скидку $discount% на $productType для пользователя $userType',
      ({ userType, productType, discount }) => {
        const database = createDatabaseMock();
        const service = new AccountService(database);

        service.setProductDiscount(userType, productType, discount);

        expect(database.setProductDiscount).toHaveBeenCalledWith(userType, productType, discount);
      }
    );

    it.each(productDiscountCases)(
      'возвращает скидку $discount% на $productType для пользователя $userType',
      ({ userType, productType, discount }) => {
        const database = createDatabaseMock();
        database.getProductDiscount.mockReturnValue(discount);
        const service = new AccountService(database);

        expect(service.getProductDiscount(userType, productType)).toBe(discount);
        expect(database.getProductDiscount).toHaveBeenCalledWith(userType, productType);
      }
    );

    it('возвращает 0, если товарная скидка не задана', () => {
      const database = createDatabaseMock();
      database.getProductDiscount.mockReturnValue(null);
      const service = new AccountService(database);

      expect(service.getProductDiscount(UserType.Gold, ProductType.Toy)).toBe(0);
    });

    it('поддерживает независимые скидки для всех комбинаций типов', () => {
      const database = new FakeAccountDatabase();
      const service = new AccountService(database);

      USER_TYPES.forEach((userType, userIndex) => {
        PRODUCT_TYPES.forEach((productType, productIndex) => {
          service.setProductDiscount(userType, productType, userIndex + productIndex + 1);
        });
      });

      USER_TYPES.forEach((userType, userIndex) => {
        PRODUCT_TYPES.forEach((productType, productIndex) => {
          expect(service.getProductDiscount(userType, productType)).toBe(userIndex + productIndex + 1);
        });
      });
    });
  });

  describe('суммирование общей и товарной скидки', () => {
    it('суммирует общую и товарную скидки', () => {
      const database = createDatabaseMock();
      database.getGeneralDiscount.mockReturnValue(10);
      database.getProductDiscount.mockReturnValue(5);
      const service = new AccountService(database);

      expect(service.calculateTotalDiscount(UserType.Premium, ProductType.Car)).toBe(15);
    });

    it('возвращает только общую скидку, если товарная не задана', () => {
      const database = createDatabaseMock();
      database.getGeneralDiscount.mockReturnValue(8);
      database.getProductDiscount.mockReturnValue(null);
      const service = new AccountService(database);

      expect(service.calculateTotalDiscount(UserType.Standard, ProductType.Food)).toBe(8);
    });

    it('возвращает только товарную скидку, если общая не задана', () => {
      const database = createDatabaseMock();
      database.getGeneralDiscount.mockReturnValue(null);
      database.getProductDiscount.mockReturnValue(6);
      const service = new AccountService(database);

      expect(service.calculateTotalDiscount(UserType.Gold, ProductType.Toy)).toBe(6);
    });

    it('возвращает 0, если обе скидки не заданы', () => {
      const database = createDatabaseMock();
      database.getGeneralDiscount.mockReturnValue(null);
      database.getProductDiscount.mockReturnValue(null);
      const service = new AccountService(database);

      expect(service.calculateTotalDiscount(UserType.Free, ProductType.Car)).toBe(0);
    });
  });

  describe('валидация скидок', () => {
    const invalidDiscounts = [-1, 101, Number.NaN, Number.POSITIVE_INFINITY];

    it.each(invalidDiscounts)('не позволяет установить общую скидку %p', (discount) => {
      const database = createDatabaseMock();
      const service = new AccountService(database);

      expect(() => service.setGeneralDiscount(UserType.Standard, discount)).toThrow(InvalidDiscountError);
      expect(database.setGeneralDiscount).not.toHaveBeenCalled();
    });

    it.each(invalidDiscounts)('не позволяет установить товарную скидку %p', (discount) => {
      const database = createDatabaseMock();
      const service = new AccountService(database);

      expect(() => service.setProductDiscount(UserType.Premium, ProductType.Car, discount)).toThrow(
        InvalidDiscountError
      );
      expect(database.setProductDiscount).not.toHaveBeenCalled();
    });

    it('принимает граничные значения 0 и 100', () => {
      const database = createDatabaseMock();
      const service = new AccountService(database);

      expect(() => service.setGeneralDiscount(UserType.Standard, 0)).not.toThrow();
      expect(() => service.setProductDiscount(UserType.Standard, ProductType.Car, 100)).not.toThrow();
      expect(database.setGeneralDiscount).toHaveBeenCalledWith(UserType.Standard, 0);
      expect(database.setProductDiscount).toHaveBeenCalledWith(UserType.Standard, ProductType.Car, 100);
    });
  });

  describe('интеграция сервиса и фейковой базы данных', () => {
    it('рассчитывает итоговую скидку в полном сценарии', () => {
      const database = new FakeAccountDatabase();
      const service = new AccountService(database);

      service.setGeneralDiscount(UserType.Premium, 10);
      service.setProductDiscount(UserType.Premium, ProductType.Car, 5);
      service.setGeneralDiscount(UserType.Gold, 15);
      service.setProductDiscount(UserType.Gold, ProductType.Food, 8);

      expect(service.calculateTotalDiscount(UserType.Premium, ProductType.Car)).toBe(15);
      expect(service.calculateTotalDiscount(UserType.Gold, ProductType.Food)).toBe(23);
      expect(service.calculateTotalDiscount(UserType.Premium, ProductType.Toy)).toBe(10);
    });

    it('изолирует скидки разных типов пользователей', () => {
      const database = new FakeAccountDatabase();
      const service = new AccountService(database);

      service.setGeneralDiscount(UserType.Standard, 5);
      service.setGeneralDiscount(UserType.Free, 0);
      service.setProductDiscount(UserType.Standard, ProductType.Toy, 4);

      expect(service.calculateTotalDiscount(UserType.Standard, ProductType.Toy)).toBe(9);
      expect(service.calculateTotalDiscount(UserType.Free, ProductType.Toy)).toBe(0);
    });
  });
});
