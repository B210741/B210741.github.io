// Function submitForm is defined, which is triggered when the form is submitted.
//It prevents the default form submission behavior using event.preventDefault()
//and then displays an alert saying "Form submitted!". 
function submitForm(event) {
    event.preventDefault(); 
    alert("Form submitted!");
}
