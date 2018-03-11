const MenuController = require('../controllers/MenuController');
	

describe('MenuController', () => {
	let menu;
    beforeEach(() => {
        menu = new MenuController();
    });
    xdescribe('#getContactCount()', () => {
      it('should return 0 when no contacts are in the book', () => {
        expect(menu.getContactCount()).toBe(0);
      });
      it('should return 1 when there is exactly one contact in the book', () => {
	    menu.book.addContact("Bob", "555-555-5555");
	    expect(menu.getContactCount()).toBe(1)
   	  });
    });
    describe('#remindMe()', () => {
      it('should return "Learning is a life-long pursuit"', () => {
        expect(menu.remindMe()).toBe("Learning is a life-long pursuit");
      });
    });
  });

