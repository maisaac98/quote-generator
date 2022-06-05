const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const changeQuoteBtn = document.getElementById('change-button');
const loader = document.getElementById('loader');

let bibleMode = false;
let apiQuotes = [];
let bibleQuotes = localQuotes;


function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function completeLoading(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function newQuote() {
    loading();
    let randomQuote = [];
    if(bibleMode == false){
        randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    }
    else{
        randomQuote = bibleQuotes[Math.floor(Math.random() * bibleQuotes.length)];
    }
    if(randomQuote.author == null){
        randomQuote.author = 'Anonymous';
    }
    authorText.textContent = randomQuote.author;
    quoteText.textContent = randomQuote.text;
    if(randomQuote.text.length > 40){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    completeLoading();

}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);   
        apiQuotes = await response.json();
        newQuote();
    } catch(error){
        console.log(error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent}-${authorText.textContent}` 
    window.open(twitterUrl, '_blank');
}

function changeQuoteType() {
    if (bibleMode == false){
        bibleMode = true;
        newQuote();
        changeQuoteBtn.textContent = 'Change to Universal Quotes';
    }
    else if (bibleMode == true){
        bibleMode = false;
        newQuote();
        changeQuoteBtn.textContent = 'Change to Bible Proverbs';
    }
}

//Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);
changeQuoteBtn.addEventListener('click', changeQuoteType);


//Function Run on Load
getQuotes();
