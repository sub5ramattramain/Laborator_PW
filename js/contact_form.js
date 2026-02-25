const headerParagraf = document.querySelector('header p');

const oraCurenta = new Date().getHours();

let mesajSalut = "";

if (oraCurenta >= 6 && oraCurenta < 12) {
    mesajSalut = "neata! welcome to my page vro"; 
} else if (oraCurenta >= 12 && oraCurenta < 18) {
    mesajSalut = "buna ziua vro! welcome to my page";       
} else {
    mesajSalut = "buna seara vro! welcome to my page";      
}

if (headerParagraf) {
    headerParagraf.textContent = mesajSalut;
}

function submitForm() {
    const nume = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mesaj = document.getElementById("message").value;

    console.log("Numele introdus:", nume);
    console.log("Emailul introdus:", email);
    console.log("Mesajul introdus:", mesaj);

    console.warn("Goodbye World!");
}