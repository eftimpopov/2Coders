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
      // response = await tmdbAPI.search(props.category, { params });
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
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        breakLabel={'..'}
        pageCount={200}
        onPageChange={changePage}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        containerClassName="pagination"
      />
    </>
  );
};

// const MovieSearch = (props) => {
//   const history = useHistory();

//   const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

//   const goToSearch = useCallback(() => {
//     if (keyword.trim().length > 0) {
//       history.push(`/${category[props.category]}/search/${keyword}`);
//     } else {
//       history.push(`/${category[props.category]}`);
//     }
//   }, [keyword, props.category, history]);

//   useEffect(() => {
//     const enterEvent = (e) => {
//       e.preventDefault();
//       if (e.keyCode === 13) {
//         goToSearch();
//       }
//     };
//     document.addEventListener('keyup', enterEvent);
//     return () => {
//       document.removeEventListener('keyup', enterEvent);
//     };
//   }, [keyword, goToSearch]);

//   return (
//     <div className="movie-search">
//       <Input
//         type="text"
//         placeholder="Enter keyword"
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//       />
//       <Button className="small" onClick={goToSearch}>
//         Search
//       </Button>
//     </div>
//   );
// };

export default MovieGrid;
