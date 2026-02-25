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

const form=document.querySelector('form');
const feedback=document.getElementById('form-feedback');

form.addEventListener('submit', function(event)
{
    event.preventDefault();
    
    const nume=document.getElementById("name").value;
    const email=document.getElementById("email").value;
    const mesaj=document.getElementById("message").value;

    if(nume.length<2)
    {
        feedback.textContent="nume prea scurt";
        feedback.style.color="red";
    }

    if(!email.includes('@'))
    {
        feedback.textContent="emailu trebuie sa contina @";
        feedback.style.color="red";
    }

    if(mesaj.length<10)
    {
        feedback.textContent="mesajul trebuie sa aiba macar 10 caractere";
        feedback.style.color="red";
    }

    else
    {
        feedback.textContent="hai ca merge asa, multumesc de mesaj, " + nume;
        feedback.style.color="green";
    }
});

