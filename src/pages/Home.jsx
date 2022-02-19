import React from 'react';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';

import MovieList from '../components/movie-list/MovieList';
import { category, movieType } from '../api/tmdbAPI';
import { tvType } from './../api/tmdbAPI';

const Home = () => {
  return (
    <>
      <HeroSlide />

      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top rated movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Popular TV shows</h2>
            <Link to="/movie">
              <OutlineButton className="small">View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>
      </div>
    </>
  );
};

export default Home;
