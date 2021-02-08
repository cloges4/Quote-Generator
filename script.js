const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From API

async function getQuote() {
  loading();
  // const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://quotes.stormconsultancy.co.uk/random.json';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.author;
    }

    // reduce font size for long quotes
    if (data.quote.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quote;
    // Stop Loader Show Quote
    complete();
  } catch (error) {
    getQuote();
  }
}

// Twitter Quote

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

// EventListeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
