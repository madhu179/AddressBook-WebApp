window.addEventListener('DOMContentLoaded', (event) =>{
const name = document.querySelector('#name');
const textError = document.querySelector('.name-error');
name.addEventListener('input', function() {
   if(name.value.length == 0){
       textError.textContent = "";
       return;
   }
   let names =  name.value.split(" ");
   try{
       (new Contact()).firstName = names[0];
       (new Contact()).lastName = names[1];
       textError.textContent = "";
   }catch(e){
       textError.textContent = e;
   }
});

});

const save = () => {
    try{
        let contactData = createContact();
        createAndUpdateStorage(contactData);
    }catch(e){
        return;
    }
}

const createContact = () => {
    let contactData = new Contact();
    let names = getInputValueById('#name').split(" ");
    contactData.firstName = names[0];
    contactData.lastName = names[1];
    contactData.address = getInputValueById('#address');
    contactData.city = getInputValueById('#city');
    contactData.state = getInputValueById('#state');
    contactData.zip = getInputValueById('#zip');
    contactData.phone = getInputValueById('#phone');
    contactData.email = getInputValueById('#email');
    alert(contactData.toString());
    return contactData;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked)
        selItems.push(item.value);
    });
    return selItems;
}

function createAndUpdateStorage(contactData){
    let contactList = JSON.parse(localStorage.getItem("ContactList"));

    if(contactList != undefined){
        contactList.push(contactData);
    }
    else{
        contactList = [contactData];
    }

    alert(contactList.toString());
    localStorage.setItem("ContactList",JSON.stringify(contactList));
}

const resetForm = () => {
    setValue('#name','');
    setValue('#address','');
    setValue('#city','');
    setValue('#state','');
    setValue('#zip','');
    setValue('#phone','');
    setValue('#email','');
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const setTextValue = (id,value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}