import React, { useState } from 'react';
import { Button, Input, SimpleGrid, Text, useToast } from '@chakra-ui/react';
require('dotenv').config();

function Search({ toParent }) {
  const [query, setQuery] = useState('');
  const toast = useToast();

  //fetches data from api on submit
  const handleClick = async (e) => {
    e.preventDefault();

    const API_KEY = process.env.REACT_APP_API_KEY; // from .env
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query.trim()}&type=movie`;
    const res = await fetch(url);
    const resData = await res.json();

    if (resData.Response === 'True') {
      const data = resData.Search;
      toast({
        title: `Showing results for '${query}'`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-left',
        variant: 'subtle',
      });
      toParent(data, query);
    } else {
      toast({
        title: 'Invalid Search',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-left',
        variant: 'subtle',
      });
    }
  };

  const onChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="container-class">
      <Text fontSize="3xl" mb={2}>
        Search Movies
      </Text>
      <form onSubmit={handleClick}>
        <div>
          <SimpleGrid minChildWidth="1" spacing="3">
            <Input
              variant="filled"
              placeholder="Search Movies"
              value={query}
              onChange={onChangeQuery}
              focusBorderColor="lime"
            />
            <Button
              bg="green.400"
              color="white"
              _hover={{
                bg: 'green.500',
                color: 'white',
              }}
              type="submit"
            >
              Search
            </Button>
          </SimpleGrid>
        </div>
      </form>
    </div>
  );
}

export default Search;
