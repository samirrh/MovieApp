import React from 'react';
import {
  Box,
  Center,
  Text,
  Button,
  useDisclosure,
  Slide,
  Link,
  SimpleGrid,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
var divStyle = {
  position: 'fixed',
  left: '0',
  bottom: '0',
  height: '4em',
  width: '100%',
};

const Footer = () => {
  const isScreenBig = useBreakpointValue({ base: false, md: true }); // custom chakra ui hook for finding screen size
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box style={divStyle} bg="#a3a8ff">
      <Center my={3}>
        <Button
          variant="ghost"
          color="white"
          _hover={{
            bg: 'midnightBlue',
            color: 'white',
          }}
        >
          <Link href="https://www.linkedin.com/in/samirrh/" target="_blank">
            Samir Haque
          </Link>
        </Button>
        <Button onClick={onToggle} variant="ghost" mx={4}>
          Features
        </Button>
        <Button
          variant="ghost"
          color="white"
          _hover={{
            bg: 'midnightBlue',
            color: 'white',
          }}
        >
          <Link href="https://github.com/samirrh/movieApp" target="_blank">
            GitHub
          </Link>
        </Button>
      </Center>
      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box pt="1em" pb="1em" px="1em" color="white" bg="#a3a8ff">
          <Center>
            <Text fontSize="3xl">Features</Text>
          </Center>

          {isScreenBig ? (
            <SimpleGrid minChildWidth="300px" spacing="1em" mb={2}>
              <Box m={2} rounded="2xl" bg="gray.50" p={6} color="black">
                <Text>Technical Requirements</Text>
                <Box m={4}>
                  <ul>
                    <li>Search results from OMDB's API.</li>
                    <li>Result has title, release year, nomination button.</li>
                    <li>Updates to the search term Updates results.</li>
                    <li>
                      Results can be added and removed from the nominations.
                    </li>
                    <li>Nominate button disabled if already nominated.</li>
                    <li>Banner displayed when the user has 5 nominations.</li>
                  </ul>
                </Box>
              </Box>
              <Box m={2} rounded="2xl" bg="gray.50" p={6} color="black">
                <Text>Extra Features</Text>
                <Box m={4}>
                  <ul>
                    <li>Can drag and drop to reorder nominations.</li>
                    <li>Remove all nominations button.</li>
                    <li>Can see additional result details in a modal.</li>
                    <li>Toasts and input validity checking.</li>
                    <li>Slide up banner to explain site features.</li>
                    <li>
                      Sticky footer with contact info and GitHub repository.
                    </li>
                  </ul>
                </Box>
              </Box>

              <Box m={2} rounded="2xl" bg="gray.50" p={6} color="black">
                <Text>About</Text>
                <Text>
                  Hey, I'm Samir a computer engineering student @ UWaterloo.
                </Text>
                <Text>
                  When I'm not coding I enjoy playing basketball and listening
                  to podcasts.
                </Text>
                <br></br>
                <Text>I'd love to connect and chat!</Text>
                <Text>
                  Heres my
                  <Link
                    href="https://www.linkedin.com/in/samirrh/"
                    target="_blank"
                  >
                    &nbsp;LinkedIn.
                  </Link>
                </Text>
                <Text>You can also email me at samir.haque@uwaterloo.ca</Text>
                <br></br>
                <Text>
                  This was really fun to make, thank you for taking the time to
                  check it out!
                </Text>
              </Box>
            </SimpleGrid>
          ) : (
            <VStack my={4}>
              <Text>Search movies and see details.</Text>
              <Text>Add and remove from nomination list.</Text>
              <Text>Drag and drop to reorder nominations.</Text>
            </VStack>
          )}

          <Center>
            <Button color="black" mx={3} onClick={onToggle}>
              close
            </Button>
          </Center>
        </Box>
      </Slide>
    </Box>
  );
};

export default Footer;
