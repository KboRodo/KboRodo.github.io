const button=document.getElementById('vigenere');
const keyword=document.querySelector('#keyword');

const modeEncrypt=document.querySelector('#encrypt')//tryb szyfrowania
const modeDecrypt=document.querySelector('#decrypt')//tryb odszyfrowywania

//OBSŁUGA OPCJI SZYFROWANIA/ODSZYFROWANIA
modeEncrypt.addEventListener('click',function(){
    button.removeEventListener('click',decryptText)
    button.addEventListener('click',encryptText)
    modeDecrypt.classList.remove('active')
    modeEncrypt.classList.add('active')
})
modeDecrypt.addEventListener('click',function(){
    button.removeEventListener('click',encryptText)
    button.addEventListener('click',decryptText)
    modeDecrypt.classList.add('active')
    modeEncrypt.classList.remove('active')
})
modeEncrypt.click()


function encryptText(){//zaszyferowanie tekstu według klucza
    const inputArray=readName()
    const alphabetArray=createEncryptorArray()
    const keyword=createKeyword(inputArray)
    const outputText=encryptVigenere(keyword,inputArray,alphabetArray)
    writeText(outputText)
}

function decryptText() {
    const inputArray=readName()
    const alphabetArray=createEncryptorArray()
    const keyword=createKeyword(inputArray)
    const outputText=decryptVigenere(keyword,inputArray,alphabetArray)
    writeText(outputText)
}

function readName() {
    const inputText=document.getElementById('input-text').value;
    const inputArray=inputText.split('')
    return inputArray
}

function writeText(outputText) {
    const output=document.getElementById('output-text')
    output.innerHTML=outputText
}

function createEncryptorArray() {
    const alphabetArray= new Array(26)
    for(let i=0; i<26; i++){
        alphabetArray[i]= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
        for(let mv=0; mv<i; mv++){
            alphabetArray[i].push(alphabetArray[i][0])
            alphabetArray[i].shift()
        }
    }
    return alphabetArray
}

function createKeyword(inputArray) {
    const keyword=document.querySelector('#keyword')
    let matchedKeywordArray=keyword.value.split('')
    const keywordLength=matchedKeywordArray.length

    while(matchedKeywordArray.length<inputArray.length){
        for(let i=0; i<keywordLength; i++){
            if(inputArray[i]===" "){
                matchedKeywordArray.push(" ")
            }
            else{
            matchedKeywordArray.push(matchedKeywordArray[i])
            }
        }
    }

    for(let i=0; i<inputArray.length; i++){
        if(inputArray[i]===" "){
            matchedKeywordArray[i]=" "
        }
    }
    while(matchedKeywordArray.length>inputArray.length){
        matchedKeywordArray.pop()
    }

    return matchedKeywordArray
}

function encryptVigenere(matchedKeywordArray, inputArray, alphabetArray) {
    let outputText=''
    let row
    let col
    for(let i=0; i<inputArray.length; i++){
        if(matchedKeywordArray[i]===" ")
        {
            outputText+=" "
        }
        else{
            row=alphabetArray[0].indexOf(inputArray[i])
            col=alphabetArray[0].indexOf(matchedKeywordArray[i])
            outputText+=alphabetArray[row][col]
        }
    }
    return outputText
}

function decryptVigenere(matchedKeywordArray, inputArray, alphabetArray) {
    let outputText=''
    let row
    let col
    for(let i=0; i<inputArray.length; i++){
        if(matchedKeywordArray[i]===" ")
        {
            outputText+=" "
        }
        else{
            col=alphabetArray[0].indexOf(matchedKeywordArray[i])
            for(let j=0; j<26; j++){
                if(alphabetArray[j][col]===inputArray[i]){
                    row=j
                }
            }
            console.log(row,col)
            outputText+=alphabetArray[row][0]
        }
    }
    return outputText
}
