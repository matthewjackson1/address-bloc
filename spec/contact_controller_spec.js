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

  afterEach(() => {
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


  describe("#getContacts()", () => {

      it("should return an empty array when no contacts are available", (done) => {
        book.getContacts().then((contacts) => {
          expect(contacts.length).toBe(0);
          done();
        }).catch((err) => {
          console.log(err);
          done();
        });
      });

      it("should return an array of contacts when contacts are available", (done) => {
        book.addContact("Alice", "001-101-1010", "alice@example.com").then(() => {
          book.getContacts().then((contacts) => {
            expect(contacts.length).toBe(1);
            done();
          });
        }).catch((err) => {
          console.log(err);
          done();
        });
      });

    });

describe("search methods", () => {

      const zelda = ["Zelda Smith", "000-100-111", "zelda@nintendo.com"];
      const snake = ["Solid Snake", "100-100-100", "snake@konami.com"];
      const magus = ["Magus Johnson", "101-010-101", "magus@squaresoft.com"];
      const alloy = ["Alloy Rodriguez", "111-111-111", "allow@guerrilla-games.com"];


  describe("#iterativeSearch()", () => {
      it("should return null when called with an empty array", (done) => {
        expect(book.iterativeSearch([], "Alloy")).toBeNull();
      });

      it("should return null when contact is not found", (done) => {
        book.addContact(...zelda).then(() => {
          book.getContacts().then((contacts) => {
            expect(book.iterativeSearch(contacts, "Alloy Rodriguez")).toBeNull();
            done();
          });
        }).catch((err) => {
          console.log(err);
          done();
        });
      });

      it("should return the contact if found", (done) => {
        book.addContact(...alloy).then(() => {
          book.addContact(...magus).then(() => {
            book.getContacts().then((contacts) => {
              let contact = book.iterativeSearch(contacts, "Magus Johnson");
              expect(contact.name).toBe("Magus Johnson");
              expect(contact.phone).toBe("101-010-101");
              expect(contact.email).toBe("magus@squaresoft.com");
             done();
            });
          });
        }).catch((err) => {
          console.log(err);
          done();
        });
      });

    });

  describe("#binarySearch()", () => {

        function sort(contacts){
         return contacts.sort((a, b) => {
           if(a.name > b.name) return 1;
           else if(a.name < b.name) return -1;
           else return 0;
         });
        }

        it("should return null when called with an empty array", () => {
          expect(book.binarySearch([], "Alloy Rodriguez")).toBeNull();
        });

        it("should return null when contact is not found", (done) => {
          book.addContact(...zelda).then(() => {
            book.getContacts().then((contacts) => {
              expect(book.binarySearch(sort(contacts), "Alloy Rodriguez")).toBeNull();
              done();
            });
          }).catch((err) => {
            console.log(err);
            done();
          });
        });

        it("should return the contact if found", (done) => {
          book.addContact(...alloy).then(() => {
            book.addContact(...magus).then(() => {
              book.addContact(...zelda).then(() => {
                book.addContact(...snake).then(() => {
                  book.getContacts().then((contacts) => {
                    let contact = book.binarySearch(sort(contacts), "Magus Johnson");
                    expect(contact.name).toBe("Magus Johnson");
                    expect(contact.phone).toBe("101-010-101");
                    expect(contact.email).toBe("magus@squaresoft.com");
                    done();
                  });
                });
              });
            });
          }).catch((err) => {
            console.log(err);
            done();
          });
        });

      });

    });

    
    describe("#search()", () => {
      it("should return null when a contact was not found", (done) => {
        book.addContact(...zelda).then(() => {
          book.search("Solid Snake").then((contact) => {
            expect(contact).toBeNull();
            done();
          });
        }).catch((err) => {
          console.log(err);
          done();
        });
      });

      it("should return the contact when found", (done) => {
        book.addContact(...snake).then(() => {
          book.search("Solid Snake").then((contact) => {
            expect(contact).not.toBeNull();
            expect(contact.name).toBe("Solid Snake");
            expect(contact.phone).toBe("100-100-100");
            expect(contact.email).toBe("snake@konami.com");
            done();
          });
        }).catch((err) => {
          console.log(err);
          done();
        });
      });

    });


    describe("#delete()", () => {

      it("should not remove any contacts that do not match the ID passed", (done) => {
        book.addContact("Rick Deckard", "000-000-000", "null@null.com").then(() => {
          book.getContacts().then((contacts) => {
            expect(contacts[0].name).toBe("Rick Deckard");
            expect(contacts.length).toBe(1);
            book.delete(99).then(() => {
              book.getContacts().then((contacts) => {
                expect(contacts.length).toBe(1);
                done();
              });
            });
          }).catch((err) => {
            console.log(err);
            done();
          });
        });
      });

      it("should remove the contact that matches the ID passed", (done) => {

        book.addContact("Rick Deckard", "000-000-000", "null@null.com").then((contact) => {
          book.getContacts().then((contacts) => {
            expect(contacts[0].name).toBe("Rick Deckard");
            expect(contacts.length).toBe(1);
            book.delete(contact.id).then(() => {
              book.getContacts().then((contacts) => {
                expect(contacts.length).toBe(0);
                done();
              });
            });
          }).catch((err) => {
            console.log(err);
            done();
          });
        });

      });

    });
    
});


