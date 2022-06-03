const UNIQUE_CARDS = 8;

const data = new Array(UNIQUE_CARDS).fill('').map((data, index) => index);
const cuadritos = shuffle([...data, ...data]);

let selectedPair = [];

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function deleteCard(selectedCard, previousCard){

    selectedCard.addEventListener('transitionend', () => {
       selectedCard.innerHTML = '';
       previousCard.innerHTML = '';
       checkResult();
    })
}

function checkResult() {
    const card = document.getElementsByClassName('card-filler')
    
    if(card.length === 0){
        alert('GANASTEEE!!!')
    }
}

function onClick(cardId, imageId){
    
console.log('cardId: ', cardId)
console.log('image: ', imageId)

    const selectedCard = document.getElementById(cardId)

    if(selectedCard.classList.contains('flip')){
        return;
}

    selectedCard.classList.add('flip');

    if(selectedPair.length === 0){
    selectedPair[0] = {imageId, cardId};  
}
    else if(selectedPair.length === 1){
    selectedPair[1] = {imageId, cardId}; 
      if(selectedPair[0].imageId === selectedPair[1].imageId){
         
    const previousCard = document.getElementById(selectedPair[0].cardId);
    
    deleteCard(selectedCard, previousCard)
    
        selectedPair = [];
    }
}else if(selectedPair.length === 2){
    const card1 = document.getElementById(selectedPair[0].cardId)
    const card2 = document.getElementById(selectedPair[1].cardId)

    card1.classList.remove('flip');
    card2.classList.remove('flip');
    
    selectedPair = [];  
    selectedPair[0] = {imageId, cardId};  
}

console.log('par serleccionado', selectedPair)
}

const html = cuadritos.map((image, index)=>`
<div id='card-${index}' class="card wrapper" data-tilt onClick="onClick('card-${index}', ${image})">
<div class="flipper card-filler">
    <div class="front"></div>
    <div class="back">
    <div class="circle-back">
    <img class="icon" src="./icons/${image}.png">
    </div>
    </div>
    </div>
    </div>`
).join('');

const containerGame = document.getElementById('jueguito-de-memoria')

containerGame.innerHTML = html;
containerGame.style.width = `${140 * Math.sqrt(UNIQUE_CARDS*2)}px`
containerGame.style.height = `${110 * Math.sqrt(UNIQUE_CARDS*2)}px`