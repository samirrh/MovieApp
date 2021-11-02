import React, { Component } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
  Button,
  Text,
  Box,
  HStack,
  Spacer,
  Badge,
  Fade,
  Center,
} from '@chakra-ui/react';
import { UpDownIcon, DragHandleIcon } from '@chakra-ui/icons';
import history from '../history';

const reorderList = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging && 'tomato',

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nominees: this.props.nominees,
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  //lifecycle method to change the state if the prop has changed
  componentDidUpdate(prevProps) {
    if (prevProps.nominees.length !== this.props.nominees.length) {
      this.setState({ nominees: this.props.nominees });
    }
  }
  onDragEnd(result) {
    // handles dropped outside the list
    if (!result.destination) {
      return;
    }

    const nominees = reorderList(
      this.state.nominees,
      result.source.index,
      result.destination.index
    );

    this.setState({
      nominees,
    });
  }

  render() {
    const handleClick = (nominee) => {
      this.props.toParent(nominee);
    };
    return (
      <>
        <Box rounded="2xl" bg="teal.100" p={6} m={4}>
          <HStack>
            <Text fontSize="3xl">Nominees</Text>
            <Spacer />
            <Fade in={this.props.nominees.length > 0}>
              <Text fontSize="4xl" fontWeight="extrabold" color="teal.400">
                {this.props.nominees.length}
              </Text>
            </Fade>
          </HStack>
          {this.props.nominees.length > 1 && (
            <Fade in={this.props.nominees.length > 1}>
              <Text color="teal.600" fontSize="xl">
                <UpDownIcon /> Drag to reorder
              </Text>
            </Fade>
          )}

          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {this.state.nominees.map((nominee, index) => (
                    <Draggable
                      key={nominee.imdbID}
                      draggableId={nominee.imdbID}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                          my={3}
                          bg="teal.200"
                          rounded="xl"
                          p={3}
                        >
                          <HStack>
                            <DragHandleIcon />
                            <Badge rounded="xl" p={1} bg="teal.500" mx={2}>
                              <Text fontWeight="bold" color="white">
                                #{index + 1}
                              </Text>
                            </Badge>
                            <Text fontWeight="bold">{nominee.Title}</Text>
                            <Spacer />
                            <Button
                              _hover={{
                                bg: 'tomato',
                                color: 'white',
                              }}
                              onClick={() => handleClick(nominee)}
                            >
                              Remove
                            </Button>
                          </HStack>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Center my={6}>
            <Fade in={this.props.nominees.length > 1}>
              <Button
                bg="tomato"
                color="white"
                onClick={this.props.clear}
                _hover={{ bg: 'red' }}
              >
                Remove All
              </Button>
            </Fade>
          </Center>
          <Center>
            <Fade in={this.props.nominees.length === 5}>
              <Button
                mx={4}
                onClick={() => {
                  localStorage.setItem(
                    'Movies',
                    JSON.stringify(this.state.nominees)
                  );
                  history.push('/compare');
                }}
              >
                Save Nominees
              </Button>
            </Fade>
          </Center>
        </Box>
      </>
    );
  }
}
