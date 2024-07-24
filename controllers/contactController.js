const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");


//@desc Get all contacts
//@route Get api/contacts
//@acces public

const getContacts =  asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});


//@desc create new contacts
//@route post api/contacts
//@access public

const createContact = asyncHandler(async(req, res) => {
    console.log("request body is:", req.body);
    const {name, email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(404);
        throw new Error("all fields are required");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id,
    });
    res.status(201).json(contact);
});

//@desc get contact by id
//@route get api/contacts/:id
//@access public

const getContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);

});

//@desc update  contacts
//@route put api/contacts/:id
//@access public

const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission to update other contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true}
    )
    res.status(200).json(updatedContact);
});

//@desc delete  contacts
//@route delete api/contacts/:id
//@access public

const deleteContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("user dont have permission");
    }
    await Contact.deleteOne({_id : req.params.id}); //deleteone for one contact
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    getContact ,
    createContact,
    updateContact,
    deleteContact
};