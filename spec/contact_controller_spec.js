process.env.NODE_ENV = "test";
const ContactController = require('../controllers/ContactController');

const sequelize = require("../db/models/index").sequelize;


describe('ContactController', () => {
  let book;

  beforeEach(() => {
    book =  new ContactController;
    console.log("complete");
  });

  afterEach(() => {
      sequelize.sync({force: true}).then((res) => {
      done();
    }).catch((err) => {
      done();
    });
  });

  describe("#addContact()", () => {
      it("should add a single contact into the book", (done) => {
        book.addContact("Alice", "001-101-1010").then((contact) => {
          expect(contact.name).toBe("Alice");
          expect(contact.phone).toBe("001-101-1010");
          done();
        }).catch((err) => {
          done();
        });
      });


      });

    });


