import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageHeader from '../components/page-header/PageHeader';
import { category as cat } from '../api/tmdbAPI';
import MovieGrid from './../components/movie-grid/MovieGrid';
import { useHistory } from 'react-router-dom';

const Catalog = () => {
  const { category } = useParams();
  let history = useHistory();

  return (
    <>
      <PageHeader>{category === cat.movie ? 'Movies' : 'TV Series'}</PageHeader>
      <div className="container">
        <div className="section mb3">
          <MovieGrid category={category} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
