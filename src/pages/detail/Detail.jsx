import React, { useEffect, useState, useRef, useContext } from 'react';
import { useParams } from 'react-router';
import { MainContext } from '../../context/main';
import tmdbAPI from '../../api/tmdbAPI';
import apiConfig from '../../api/apiConfig';
import './detail.scss';
import CastList from './CastList';
import VideoList from './VideoList';

import MovieList from '../../components/movie-list/MovieList';
import Button from '../../components/button/Button';
import { isTokenValid } from './../../utils/helpers';

const Detail = () => {
  const { category, id } = useParams();
  let ratingRef = useRef(null);
  let ratingContainerRef = useRef(null);
  const { user, setUser } = useContext(MainContext);

  const [item, setItem] = useState(null);
  let [isRefRendered, setIsRefRendered] = useState(false);
  let [showRating, setShowRating] = useState(false);
  let [isRated, setIsRated] = useState(false);
  useEffect(() => {
    if (JSON.parse(user).success) {
      setShowRating(true);
    } else {
      setShowRating(false);
    }
  }, [user]);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbAPI.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  const rateMovie = async (id) => {
    let sessionId = JSON.parse(localStorage.getItem('reactflixUser')).sessionId;
    let params = {
      value: ratingRef.current.value,
    };
    let response = '';

    if (isTokenValid()) {
      tmdbAPI
        .rate(category, id, sessionId, params)
        .then((res) => {
          setIsRated(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log('this is res', response);
  };
  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              {showRating ? (
                <div
                  ref={(e) => {
                    ratingContainerRef.current = e;
                    setIsRefRendered(true);
                  }}
                  className="movie-rating"
                  id="movie-rating"
                >
                  <h4>
                    Rate this {category == 'tv' ? 'TV series: ' : 'movie:'}
                  </h4>
                  <input
                    ref={ratingRef}
                    type="number"
                    min="0.5"
                    max="10.0"
                    step="0.1"
                    defaultValue={10}
                  />
                  <Button className="small" onClick={() => rateMovie(item.id)}>
                    Rate
                  </Button>
                  {isRated ? (
                    <div className="rated-success">
                      Rated <i className="bx bx-check"></i>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
