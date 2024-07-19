import React, { useState } from 'react';
import CardItem from '../CardItem';
import { RotatingTriangles } from 'react-loader-spinner';
import { HiSearchCircle } from "react-icons/hi";
import './index.css';

const SearchHomePage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setNoData(false);
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();
    setMovies(data.docs);
    setQuery('');
    setLoading(false);
    if (data.docs.length === 0) {
      setNoData(true);
    }
  };

  return (
    <div className="search-home-page">
      <header className="search-header">
        <h1>Movie Search</h1>
        <form onSubmit={handleSearch}>
          <div className="wrap">
            <div className="search">
              <input
                className="search-term"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie"
              />
              <button type="submit" className="search-button">
                <HiSearchCircle />Search
              </button>
            </div>
          </div>
        </form>
      </header>
      <div className="movie-list">
        {loading ? (
          <RotatingTriangles color="#00BFFF" height={100} width={100} timeout={3000} />
        ) : noData ? (
          <div className="no-data">No Data Found</div>
        ) : (
          movies.map((movie) => (
            <CardItem key={movie.key} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchHomePage;
