import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Loading from './Loading';
import Filters from './Filters';
import RestaurantList from "./RestaurantList";

const defaultFilters = {
  nameFilter: '',
  priceRangeFilter: {
    $: false,
    $$: false,
    $$$: false,
    $$$$: false,
  }
}

function App({ navigate }) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);


  useEffect(() => {
    const host = process.env.REACT_APP_CONTENT_HOST;
    fetch(`${host}/restaurants.json`)
      .then(result => result.json())
      .then(restaurants => {
        setRestaurants(restaurants.map((restaurant => ({
          ...restaurant,
          imageSrc: `${host}${restaurant.imageSrc}`,
        }))))
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        setError(true)
      })
  }, [])

  const setNameFilter = (value) => {
    setNameFilter(value)
  }

  const setPriceRangeFilter = range => checked => {
    setPriceRangeFilter(({ priceRangeFilter }) => ({
      priceRangeFilter: {
        ...priceRangeFilter,
        [range]: checked,
      },
    }))
  };

  const resetAllFilters = () => {
    setFilters(defaultFilters);
  }

  if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <MainColumn>
          Sorry, but the restaurant list is unavailable right now
        </MainColumn>
      );
    }

    return (
        <MainColumn>
          <Filters
            name={filters.nameFilter}
            priceRange={filters.priceRangeFilter}
            setNameFilter={setNameFilter}
            setPriceRangeFilter={setPriceRangeFilter}
            resetAll={resetAllFilters}
          />
          <RestaurantList
            restaurants={restaurants}
            priceRangeFilter={filters.priceRangeFilter}
            nameFilter={filters.nameFilter}
            navigate={navigate}
          />
        </MainColumn>
    );
}

const MainColumn = styled.div`
  max-width: 1150px;
  margin: 0 auto;
`;

export default App;
