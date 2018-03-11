const inquirer = require('inquirer');
const Contact = require("../db/models").Contact;

module.exports = class ContactController {
    constructor(){
    	this.contacts = [];
    }

    addContact(name, phone){
    	Contact.create({name, phone});
    }
}