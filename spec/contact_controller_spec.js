process.env.NODE_ENV = "test";
const sequelize = require("../db/models/index").sequelize;
const ContactController = require('../controllers/ContactController');



describe('ContactController', () => {
  it("should be defined", () => {
      expect(ContactController).toBeDefined();
    });

  let book;

  beforeEach(() => {
    book =  new ContactController;
  });

  afterEach((done) => {
      sequelize.sync({force: true}).then((res) => {
      done();
    }).catch((err) => {
      done();
    });
  });

  describe("#addContact()", () => {
      it("should add a single contact into the book", (done) => {
          book.addContact("Alice", "001-101-1010","alice@gmail.com").then((contact) => {
          expect(contact.name).toBe("Alice");
          expect(contact.phone).toBe("001-101-1010");
          expect(contact.email).toBe("alice@gmail.com");
          done();
        }).catch((err) => {
          done();
        });
      });

  });
});


