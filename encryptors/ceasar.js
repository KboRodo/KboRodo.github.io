const modeEncrypt=document.querySelector('#encrypt')//tryb szyfrowania
const modeDecrypt=document.querySelector('#decrypt')//tryb odszyfrowywania

const button=document.getElementById('ceasar');
const moveBy=document.querySelector('#move')
//OBSŁUGA OPCJI SZYFROWANIA/ODSZYFROWANIA
modeEncrypt.addEventListener('click',function(){
    button.removeEventListener('click',decryptCeasar)
    button.addEventListener('click',encryptCeasar);
    modeDecrypt.classList.remove('active')
    modeEncrypt.classList.add('active')
})
modeDecrypt.addEventListener('click',function(){
    button.removeEventListener('click',encryptCeasar)
    button.addEventListener('click',decryptCeasar);
    modeDecrypt.classList.add('active')
    modeEncrypt.classList.remove('active')
})
modeEncrypt.click()

function encryptCeasar(){//zaszyferowanie tekstu według klucza
    const move=moveBy.value
    const inputText=document.getElementById('input-text').value;
    const output=document.getElementById('output-text');
    const inputArray=inputText.split('')
    let index
    let outputText=[]

    const encryptionKey=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']//referencja alfabetu

    for(let i=0; i<move; i++){
        encryptionKey.push(encryptionKey[0])
        encryptionKey.shift()
    }

    inputArray.forEach(element => {
        if(element===' ')
        {
        outputText.push(' ')
        }
        else{
        index=alphabet.indexOf(element)
        outputText.push(encryptionKey[index])
        }
        console.log(outputText)
    });
    output.innerHTML=outputText.join('')//usinac przecinki
}

function decryptCeasar(){//ODSZYFROWANIE TEKSTU
    const move=moveBy.value
    const inputText=document.getElementById('input-text').value;
    const output=document.getElementById('output-text');
    const inputArray=inputText.split('')
    let index
    let outputText=[]

    const encryptionKey=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']//referencja alfabetu

    for(let i=0; i<move; i++){
        encryptionKey.unshift(encryptionKey[encryptionKey.length-1])
        encryptionKey.pop()
    }

    inputArray.forEach(element => {
        if(element===' ')
        {
        outputText.push(' ')
        }
        else{
        index=alphabet.indexOf(element)
        outputText.push(encryptionKey[index])
        }
        console.log(outputText)
    });
    output.innerHTML=outputText.join('')
}
