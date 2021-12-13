import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '@mui/material/Button';

const First = () => {
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState('');
  const [previousQuote, setPreviousQuote] = useState('');

  const getData = async () => {
    const res = await axios.get(
      'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json',
    );
    setQuotes(res);
  };

  const getRandomQuote = () => {
    if (randomQuote) setPreviousQuote(randomQuote);
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  };

  const getPreviousQuote = () => {
    if (previousQuote) {
      setRandomQuote(previousQuote);
      setPreviousQuote('');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getRandomQuote();
  }, [quotes]);

  return (
    <>
      <Button variant="contained" disabled={!previousQuote} onClick={getPreviousQuote}>
        Previous
      </Button>
      <Button variant="outlined" onClick={getRandomQuote}>
        Generate
      </Button>

      {randomQuote && (
        <>
          <h1>{randomQuote.quote}</h1>
          <h1>{randomQuote.author}</h1>
        </>
      )}
    </>
  );
};

export default First;
