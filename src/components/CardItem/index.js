import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import './index.css';

const CardItem = ({ movie }) => {
  const [dogImage, setDogImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogImage = async () => {
      const response = await fetch('https://dog.ceo/api/breeds/image/random');
      const data = await response.json();
      setDogImage(data.message);
      setLoading(false);
    };
    fetchDogImage();
  }, []);

  return (
    <div className="card-item">
      {loading ? (
        <MagnifyingGlass color="#00BFFF" height={50} width={50} />
      ) : (
        <img src={dogImage} alt="Random Dog" />
      )}
      <h2>{movie.title}</h2>
      <p>Author: {movie.author_name?.join(', ')}</p>
      <p>First Published: {movie.first_publish_year}</p>
    </div>
  );
};

export default CardItem;
