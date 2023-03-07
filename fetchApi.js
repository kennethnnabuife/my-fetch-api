import React, { useState, useEffect } from "react";

const fetchApi = () => {
  const [motQuotes, setMotQuotes] = useState([]);
  const [randomnumber, setRandomnumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/people/${randomnumber}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setMotQuotes([data]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setHasError(true);
      });
  }, [randomnumber]);

  const handleClick = () => {
    setRandomnumber(Math.ceil(Math.random() * 58));
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : hasError ? (
        <p>Error fetching data</p>
      ) : (
        motQuotes.map((quote) => (
          <div key={quote.url}>
            <p>{quote.name}</p>
            <p>{quote.height || "Unknown"}</p>
            <button onClick={handleClick}>Click</button>
          </div>
        ))
      )}
    </div>
  );
}

export default fetchApi;
