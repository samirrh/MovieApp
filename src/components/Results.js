import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Box,
  Button,
  Text,
  HStack,
  Spacer,
  Center,
  VStack,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import axios from 'axios';
require('dotenv').config();

const Results = ({ movies, query, toParent, nominees }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [details, setDetails] = useState({}); // need to put empty state or will break
  const canNominate = (nominee) => {
    if (nominees.includes(nominee) || nominees.length === 5) {
      return true;
    } else {
      return false;
    }
  };
  const handleNominate = (movie) => {
    toParent(movie);
  };
  const handleDetails = async (imdbID) => {
    const API_KEY = process.env.REACT_APP_API_KEY; // from .env
    // obj properties: Title, Year, Rated, Released, Runtime, Poster
    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`;
    const movieDetails = axios.get(url);
    movieDetails.then((res) => setDetails(res.data));
    onOpen();
  };
  return (
    <div>
      {query !== '' && (
        <>
          <Center my={4}>
            <Text color="teal" fontSize="xl">
              <SearchIcon />
              {` Showing results for "${query}"...`}
            </Text>
          </Center>
          {movies.map((movie) => (
            <Box key={movie.imdbID} my={3} p={3} rounded="xl" bg="green.200">
              <HStack>
                <VStack align="left">
                  <Text fontWeight="bold">{movie.Title}</Text>
                  <Text>Released: {movie.Year}</Text>
                </VStack>
                <Spacer />

                <Button
                  onClick={() => handleNominate(movie)}
                  isDisabled={canNominate(movie)}
                  _hover={{ bg: 'teal.400', color: 'white' }}
                >
                  Nominate
                </Button>
                <Button
                  colorScheme="teal"
                  _hover={{
                    bg: 'green.400',
                    color: 'white',
                  }}
                  onClick={() => handleDetails(movie.imdbID)}
                >
                  Details
                </Button>
              </HStack>
            </Box>
          ))}

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{details.Title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Release Date: {details.Released}</Text>
                <Text>Runtime: {details.Runtime}</Text>
                <Text>Rated: {details.Rated}</Text>
                <Text>Plot: {details.Plot}</Text>
                <Center my={4}>
                  {details.Poster !== 'N/A' ? (
                    <Image src={details.Poster} alt={details.Title} />
                  ) : (
                    <Text>Poster Not Available</Text>
                  )}
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export default Results;
