import { category } from 'api/tmdbApi';
import Button from 'components/button/Button';
import Input from 'components/input/Input';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function MovieSearch(props) {
  const history = useHistory();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '');

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      history.push(`/${category[props.category]}/search/${keyword}`);
    }
  }, [keyword, props.category, history]);

  useEffect(() => {
    const enterEvent = (e) => {
      e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener('keyup', enterEvent);
    return () => {
      document.removeEventListener('keyup', enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <>
      <div className="movie-search">
        <div className="mb-2">
          <Input
            type="text"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button className="small" onClick={goToSearch}>
            Search
          </Button>
        </div>
      </div>
    </>
  );
}

export default MovieSearch;
