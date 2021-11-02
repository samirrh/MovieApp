import React from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/layout';

const ComparisonGrid = () => {
  return (
    <SimpleGrid minChildWidth="300px" spacing="1em" mx={2}>
      <Box rounded="2xl" bg="blue.100" p={6} ml={4} mr={2}>
        <Text fontSize={'2xl'}>Exclusive To User</Text>
      </Box>
      <Box rounded="2xl" bg="blue.100" p={6} mr={4} ml={2}>
        <Text fontSize={'2xl'}>Movies In Common</Text>
      </Box>
      <Box rounded="2xl" bg="blue.100" p={6} mr={4} ml={2}>
        <Text fontSize={'2xl'}>Exclusive To Sender</Text>
      </Box>
    </SimpleGrid>
  );
};

export default ComparisonGrid;
