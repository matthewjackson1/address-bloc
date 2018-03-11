const inquirer = require('inquirer');
const ContactController = require("./ContactController");

module.exports = class MenuController {
    constructor(){
	    this.mainMenuQuestions = [
	      {
	       type: "list",
	        name: "mainMenuChoice",
	        message: "Please choose from an option below: ",
	        choices: [
	          "Add new contact",
	          "Get the current date",
	          "Exit"
	        ]
	      }
	    ];
	    this.book = new ContactController();
	    this.addContactQuestions = [
    	{
          type: "input",
          name: "name",
          message: "Contact's name - ",
          validate(val){
            return val !== "";
          }
    	},
        {
          type: "input",
          name: "phone",
          message: "Contact's phone number - ",
          validate(val){
            return val !== "";
          }
        }
      ];
    }
    

    main(){
      console.log(`Welcome to AddressBloc! You have ${this.book.contacts.length} entries.`);
      inquirer.prompt(this.mainMenuQuestions).then((response) => {
        switch(response.mainMenuChoice){
          case "Add new contact":
            this.addContact();
            break;
          case "Get the current date":
          	this.getDate();
          	break;
          case "Exit":
            this.exit();
          default:
            console.log("Invalid input");
            this.main();
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    

    clear(){
      console.log("\x1Bc");
    }

    addContact(){
      this.clear();
      inquirer.prompt(this.book.addContactQuestions).then((answers) => {
       this.book.addContact(answers.name, answers.phone).then((contact) => {
         console.log("Contact added successfully!");
         this.main();
       }).catch((err) => {
         console.log(err);
         this.main();
       });
     });
    }

    getDate(){
      this.clear();
      let d = new Date();
      console.log("The current date is: "+d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear());
      this.main();
    }

    getContactCount(){
      return this.contacts.length;
    }

    remindMe(){
      return "Learning is a life-long pursuit";
    }

    exit(){
      console.log("Thanks for using AddressBloc!");
      process.exit();
    }
  }