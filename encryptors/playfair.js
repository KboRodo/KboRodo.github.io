const button=document.getElementById('playfair');
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
    const inputArray=readText()//wczytywanie tekstu
    const keyword=createKeyword()//wczytania slowa klucza i usuniecie duplikatu liter //ok
    const keywordArray=createKeywordArray(keyword)//stworzenie tablicy z tekstem//ok
    const letterArray=createLetterArray(inputArray)
    const letterLocation=letterLocator(letterArray, keywordArray)
    const encryptedText=encryptPlayfair(letterArray, keywordArray, letterLocation)
    console.log(encryptedText)
    writeText(encryptedText)
}
//DZIAŁA OK

function decryptText() {
    const inputArray=readText()//wczytywanie tekstu
    const keyword=createKeyword()//wczytania slowa klucza i usuniecie duplikatu liter //ok
    const keywordArray=createKeywordArray(keyword)//stworzenie tablicy z tekstem//ok
    const letterArray=createLetterArray(inputArray)
    const letterLocation=letterLocator(letterArray, keywordArray)
    const decryptedText=decryptPlayfair(letterArray, keywordArray, letterLocation)
    console.log(decryptedText)
    writeText(decryptedText)
}
//----FUNKCJE OBSŁUGUJACE SZYFROWANIE TEKSTU------
function decryptPlayfair(letterArray, keywordArray, letterLocation){//letterarray-tablica z inputem, keywordArray-slowo klucz
    console.log('decrypt playfair')
    console.log('input arrray', letterArray)//INPUT
    console.log('keyword array', keywordArray)//TABLICA Z ALFABETEM
    console.log('location array', letterLocation)

    let diffRow
    let diffCol
    let chiperedText=new Array(letterArray.length)
    let index=0

    for(let row=0; row<letterLocation.length; row++){
            console.log('current element',letterLocation[row][0][0], letterLocation[row][1][0])

            diffRow=letterLocation[row][1][0]-letterLocation[row][0][0]
            diffCol=letterLocation[row][1][1]-letterLocation[row][0][1]
            chiperedText[index]=new Array(2)
            if(diffCol===0){
                console.log('same column')
                if(letterLocation[row][0][0]>0 && letterLocation[row][1][0]>0){
                    chiperedText[index][0]=keywordArray[letterLocation[row][0][0]-1][letterLocation[row][0][1]]
                    chiperedText[index][1]=keywordArray[letterLocation[row][1][0]-1][letterLocation[row][1][1]]
                }//else wrap to last element of collumn
                else{
                    chiperedText[index][0]=keywordArray[letterLocation[row][0][0]-1][letterLocation[row][0][1]]
                    chiperedText[index][1]=keywordArray[keywordArray[0].length][letterLocation[row][1][1]]
                }
            }
            else if(diffRow===0){
                console.log('same row')
                if(letterLocation[row][0][1]<keywordArray.length && letterLocation[row][1][1]<keywordArray.length){
                    chiperedText[index][0]=keywordArray[letterLocation[row][0][0]][letterLocation[row][0][1]-1]
                    chiperedText[index][1]=keywordArray[letterLocation[row][1][0]][letterLocation[row][1][1]-1]
                }//else wrap to last element of row
                else{
                    chiperedText[index][0]=keywordArray[letterLocation[row][0][0]][letterLocation[row][0][1]-1]
                    chiperedText[index][1]=keywordArray[letterLocation[row][1][0]][keywordArray.length]
                }
            }
            else{
                console.log('rectangle')
                chiperedText[index][0]=keywordArray[letterLocation[row][0][0]][letterLocation[row][1][1]]
                chiperedText[index][1]=keywordArray[letterLocation[row][1][0]][letterLocation[row][0][1]]
            }
            index++
    }
    return chiperedText
}

function encryptPlayfair(letterArray, keywordArray, letterLocation){//letterarray-tablica z inputem, keywordArray-slowo klucz
    console.log('encrypt playfair')
    console.log('input arrray', letterArray)//INPUT
    console.log('keyword array', keywordArray)//TABLICA Z ALFABETEM
    console.log('location array', letterLocation)

    let diffRow
    let diffCol
    let chiperedText=new Array(letterArray.length)
    let index=0

    for(let row=0; row<letterLocation.length; row++){
            console.log('current element',letterLocation[row][0][0], letterLocation[row][1][0])

            diffRow=letterLocation[row][0][0]-letterLocation[row][1][0]
            diffCol=letterLocation[row][0][1]-letterLocation[row][1][1]
            chiperedText[index]=new Array(2)
            if(diffCol===0){
                console.log('same column')
                if(letterLocation[row][0][0]<keywordArray.length && letterLocation[row][1][0]<keywordArray.length){
                    chiperedText[index][0]=keywordArray[letterLocation[row][0][0]+1][letterLocation[row][0][1]]
                    chiperedText[index][1]=keywordArray[letterLocation[row][1][0]+1][letterLocation[row][1][1]]
                }//else wrap to first element of collumn
                else{
                    chiperedText[index][0]=keywordArray[letterLocation[row][0][0]+1][letterLocation[row][0][1]]
                    chiperedText[index][1]=keywordArray[0][letterLocation[row][1][1]]
                }
            }
            else if(diffRow===0){
                console.log('same row')
                if(letterLocation[row][0][1]<keywordArray.length && letterLocation[row][1][1]<keywordArray.length){
                    chiperedText[index][0]=keywordArray[letterLocation[row][0][0]][letterLocation[row][0][1]+1]
                    chiperedText[index][1]=keywordArray[letterLocation[row][1][0]][letterLocation[row][1][1]+1]
                }//else wrap to first element of row
                else{
                    chiperedText[index][0]=keywordArray[letterLocation[row][0][0]][letterLocation[row][0][1]+1]
                    chiperedText[index][1]=keywordArray[letterLocation[row][1][0]][0]
                }
            }
            else{
                console.log('rectangle')
                chiperedText[index][0]=keywordArray[letterLocation[row][0][0]][letterLocation[row][1][1]]
                chiperedText[index][1]=keywordArray[letterLocation[row][1][0]][letterLocation[row][0][1]]
            }
            index++
    }
    return chiperedText
}

function letterLocator(letterArray, keywordArray){//lokalizuje litery z tabeli letterArray w tabeli keywordArray
    let locationArray=new Array(letterArray.length)

    for(let i=0; i<locationArray.length; i++){//tworzenie tableli w ktorej przechowywane sa lokalizacje liter z tabeli keywordArray w tabeli keywordArray
        locationArray[i]=new Array(2)
    }
    //wyszukiewanie lokalizacji liter 

    for(let letterRow=0; letterRow<letterArray.length; letterRow++){
        for(let letterCol=0; letterCol<letterArray[letterRow].length; letterCol++){
            //przechodzi przez wszystkie elementy tabeli letterArray
            //works ok
                for(let row=0; row<keywordArray.length; row++){
                    for(let col=0; col<keywordArray[row].length; col++){
                        //przechodzi przez wszystkie elementy tabeli keywordArray
                        if(keywordArray[row][col]===letterArray[letterRow][letterCol]){
                            locationArray[letterRow][letterCol]=[row,col]
                            break
                        }
                    }
                }

        }
    }
    return locationArray
    //works ok
}
function createLetterArray(inputArray){
    if(inputArray.length%2!=0){//doodanie "z" do konca tekstu wejsciowego jezeli dlugosc jest nieparzysta
        inputArray.push('z')
    }
    let inputLetterPairs=inputArray.length/2
    let inputLetterArray=new Array(inputLetterPairs)
    let index=0
    for(let i=0; i<inputLetterPairs; i++){
        inputLetterArray[i]=new Array(2)
        for(let j=0; j<2; j++){
            inputLetterArray[i][j]=inputArray[index]
            index++
        }
    }
    return inputLetterArray
}

function createKeywordArray(keyword){
    let alphabet = ['a','b','c','d','e','f','g','h','i','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    let outputLetters=keyword
    let outputArray=new Array(5)
    const keywordLength=keyword.length
    for(let i=0; i<25; i++){//dopisywanie do tabeli brakujacych liter
        if((outputLetters.includes(alphabet[i]))===false){
            outputLetters.push(alphabet[i])
        }
    }
    let index=0
    for(let i=0; i<5; i++){
        outputArray[i]=new Array(5)
        for(let j=0; j<5; j++){
            outputArray[i][j]=outputLetters[index]
            index++
        }
    }
    return outputArray
}

function createKeyword(){
    const keyword=document.querySelector('#keyword')
    let keywordArray=keyword.value.split('')

    let noDuplicates = keywordArray.filter((c, index)=>{
        return keywordArray.indexOf(c)===index
    })

    return noDuplicates
}
function readText() {
    const inputText=document.getElementById('input-text').value;
    const inputArray=inputText.split('')//usunac powtorzenia
    return inputArray
}

function writeText(outputText) {
    const output=document.getElementById('output-text')
    output.innerHTML=outputText.join('')
}//usunac wypisywanie przecinków