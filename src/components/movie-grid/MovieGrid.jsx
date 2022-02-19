import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import ReactPaginate from 'react-paginate';
import './movie-grid.scss';
import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';

import tmdbAPI, { category, movieType, tvType } from '../../api/tmdbAPI';

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      switch (props.category) {
        case category.movie:
          response = await tmdbAPI.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbAPI.getTvList(tvType.popular, { params });
      }
      console.log('this is from here', response);
      setItems(response.results);
      setTotalPage(response.total_pages);
    };

    getList();
  }, [props.category]);

  const loadMore = async () => {
    let response = null;

    const params = {
      page: page + 1,
    };
    switch (props.category) {
      case category.movie:
        response = await tmdbAPI.getMoviesList(movieType.popular, {
          params,
        });
        break;
      default:
        response = await tmdbAPI.getTvList(tvType.popular, { params });
    }

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  const changePage = async (data) => {
    let response = null;
    const params = {
      page: data.selected + 1,
    };
    switch (props.category) {
      case category.movie:
        response = await tmdbAPI.getMoviesList(movieType.popular, {
          params,
        });
        break;
      default:
        response = await tmdbAPI.getTvList(tvType.popular, { params });
    }
    setItems(response.results);
  };

  return (
    <>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={item.id} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
      {/*<ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'..'}
        pageCount={200}
        onPageChange={changePage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName="pagination"
      />*/}
    </>
  );
};

export default MovieGrid;
