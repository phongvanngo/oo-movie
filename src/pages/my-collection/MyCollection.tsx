import { MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import tmdbApi, { category, movieType } from 'api/tmdbApi';
import MovieCard from 'components/movie-card/MovieCard';
import { FixMeLater } from 'interfaces/Migrate';
import React, { ReactElement, useEffect, useState } from 'react';
interface Props {}

const listCollection = [
  {
    id: 1,
    display: 'Popular',
    value: movieType.popular,
  },
  {
    id: 2,
    display: 'Top rated',
    value: movieType.top_rated,
  },
  {
    id: 3,
    display: 'Up comming',
    value: movieType.upcoming,
  },
];

export default function MyCollection({}: Props): ReactElement {
  const [items, setItems] = useState([]);
  const [collectionName, setcollectionName] = useState<string>(
    listCollection[0].value
  );

  useEffect(() => {
    const getList = async () => {
      let response: FixMeLater = null;
      const params = {};

      response = await tmdbApi.getMoviesList(movieType.popular, { params });

      setItems(response.results);
    };
    getList();
  }, []);

  useEffect(() => {
    const getList = async () => {
      let response: FixMeLater = null;
      const params = {};

      response = await tmdbApi.getMoviesList(collectionName, { params });

      setItems(response.results);
    };
    getList();
  }, [collectionName]);

  const handleChange = (event: FixMeLater) => {
    setcollectionName(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div className="flex font-semibold mb-4 text-lg justify-between items-center">
        <div className="">My Collection</div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 140 }}>
          <Select
            value={collectionName}
            onChange={handleChange}
            sx={{
              color: 'white',
              fontWeight: 600,
              outlineColor: 'white',
            }}
          >
            {listCollection.map((collection) => (
              <MenuItem key={collection.id} value={collection.value}>
                {collection.display}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {items.map((item, i) => (
          <div className="w-44" key={i}>
            <MovieCard key={i} item={item} category={category.movie} />
          </div>
        ))}
      </div>
    </>
  );
}
