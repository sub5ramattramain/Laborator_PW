const educationItems = document.querySelectorAll('#education ol li');
const educationArray = [...educationItems].map(item => item.textContent);

console.log("Educație:", educationArray);

var ramattra='ramattra';
var filtered=educationArray.filter(function (str) {return str.includes(ramattra);})

console.log("elementele care contin ramattra: ", filtered)

const primeleLitere=educationArray.map(text=>text[0]);
console.log("primele litere sunt", primeleLitere)

const aniTotaliDeStudiu=educationArray.reduce((total, text)=> {
    const aniGasiti=text.match(/\d{4}/g);
    if(aniGasiti && aniGasiti.length>=2)
    {
        const anInceput=parseInt(aniGasiti[0]);
        const anFinal=parseInt(aniGasiti[1]);
        return total + (anFinal-anInceput);
    }
        
    if(aniGasiti && aniGasiti.length===1 && text.toLowerCase().includes('prezent'))
    {
        const anInceput=parseInt(aniGasiti[0]);
        const anCurent=new Date().getFullYear();
        return total+(anCurent-anInceput);
    }
    return total;
}, 0);
console.log(`Total ani de studiu: ${aniTotaliDeStudiu}`);
