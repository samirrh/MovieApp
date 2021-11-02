import React from 'react';
import { Box, Center, Text } from '@chakra-ui/layout';
import ComparisonGrid from '../components/ComparisonGrid';
import ComparisonSearch from '../components/ComparisonSearch';

const Compare = () => {
  return (
    <Center>
      <Box
        rounded="xl"
        bg="blue.300"
        m="10"
        borderColor="blue.500"
        borderWidth="5px"
        width="100%"
        height="40em"
        textAlign="center"
      >
        <Text fontSize={'4xl'} m="4">
          Compare Movies
        </Text>

        <ComparisonGrid />
        <ComparisonSearch />
      </Box>
    </Center>
  );
};

export default Compare;
