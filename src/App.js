import Search from './components/Search';
import { useState } from 'react';
import Results from './components/Results';
import Nominations from './components/Nominations';
import { SimpleGrid, Box, Text, Center } from '@chakra-ui/react';
import { Alert, AlertIcon, Collapse } from '@chakra-ui/react';
import Footer from './components/Footer';

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [nominees, setNominees] = useState([]);

  //gets data from child component Search
  const transferSearchData = (moviesData, userQuery) => {
    if (typeof moviesData !== undefined) {
      setMovies(moviesData);
    }
    setQuery(userQuery);
  };

  //gets data from child component Nominations
  const addNomination = (nominated) => {
    if (nominees.length < 5) {
      setNominees([...nominees, nominated]);
    } else {
      alert('List Full!');
    }
  };

  const removeNomination = (removed) => {
    setNominees(nominees.filter((movie) => movie !== removed));
  };

  const clearNominations = (removed) => {
    setNominees([]);
  };

  return (
    <div>
      <Center>
        <Text color="white" fontSize="6xl" mt={4}>
          The Shoppies
        </Text>
      </Center>
      <Collapse in={nominees.length === 5} animateOpacity>
        <Alert
          status="success"
          variant="top-accent"
          colorScheme="cyan"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon boxSize="35px" mr={0} my={2} />
          <Text fontSize={'xl'}>Nominations Filled!</Text>
        </Alert>
      </Collapse>
      <SimpleGrid minChildWidth="300px" spacing="1em" mx={2}>
        <Box rounded="2xl" bg="green.100" p={6} m={4}>
          <Search toParent={transferSearchData} />
          <Results
            movies={movies}
            query={query}
            toParent={addNomination}
            nominees={nominees}
          />
        </Box>
        <Nominations
          nominees={nominees}
          toParent={removeNomination}
          clear={clearNominations}
        />
      </SimpleGrid>
      <Footer />
    </div>
  );
}

export default App;
