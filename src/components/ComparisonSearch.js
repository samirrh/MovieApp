import React, { useState } from 'react';
import {
  Button,
  Input,
  SimpleGrid,
  Text,
  useToast,
  Box,
  HStack,
} from '@chakra-ui/react';

require('dotenv').config();

function ComparisonSearch({ toParent }) {
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
    <HStack m={6}>
      <Box width={'50%'} mr={3}>
        <Text fontSize="3xl" mb={2}>
          Enter Comparison ID
        </Text>
        <form onSubmit={handleClick}>
          <SimpleGrid minChildWidth="1" spacing="3">
            <Input
              variant="filled"
              placeholder="Comparison ID"
              value={query}
              onChange={onChangeQuery}
            />
            <Button bg="blue.400" type="submit">
              Compare
            </Button>
          </SimpleGrid>
        </form>
      </Box>
      <Box width={'50%'} ml={3}>
        <Text fontSize="3xl" mb={2}>
          Your Nominations
        </Text>
        {/* map nominations from local storage here - or show button to go back and make nominations*/}
      </Box>
    </HStack>
  );
}

export default ComparisonSearch;
