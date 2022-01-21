import React, { useEffect, useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';

const Boxes = () => {
  const [boxes, setBoxes] = useState([]);

  const makeBoxes = howMany => {
    let tempArr = [];
    for (let i = 0; i < howMany; i++) {
      tempArr.push('box' + i);
    }
    return tempArr;
  };

  useEffect(() => {
    setBoxes(makeBoxes(100));
  }, []);

  return (
    <Flex flexFlow="row wrap" gap={4} justifyContent="center">
      {boxes &&
        boxes.map(box => {
          return (
            <Box
              key={box}
              p="80px"
              bgImage="linear-gradient(red, orange)"
              borderRadius="lg"
            />
          );
        })}
    </Flex>
  );
};

export default Boxes;
