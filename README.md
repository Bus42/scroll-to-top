# Scroll To Top Tutorial

## Intro
Hello fellow React enthusiasts! I’m Greg with Studio42 Web Development. If you’re watching this video, chances are you’ve at least used React and Green Sock Animation Project, which I will refer to as GSAP. This tutorial requires very basic knowledge of JavaScript, NPM, CSS, React and React component libraries.

For those of you not familiar with Chakra UI, it is a fantastic component library that is growing quickly in popularity in the Front End community. Chakra makes it easy to incorporate accessibility and keyboard navigation into your applications. They have great documentation and some really great guides to help get you started with your next Front End project.

Today, I’m going to show you how to create a scroll to top button that will fade in when the user scrolls down, and when the user clicks the button, the page will scroll smoothly to the top, and fade the button out.

I have a link to the GitHub repository with two branches, starter and tldr. If you didn’t figure it out already, tldr is the branch with the completed code. Feel free to use it in your next application with Chakra UI and GSAP. The starter branch has the application and files created for you, but for the sake of those who are not GitHub users, I’ll start from scratch, in the terminal.

## Terminal

We’ll get started by running `npx create-react-app scroll-to-top --template @chakra-ui` 
This will create a new React application with the Chakra UI template baked in.

Next, we’ll install necessary dependencies with  `npm i`

Then, we’ll install the Green Sock Animation Project Node package with `npm i gsap`  

And, for later, we’ll install Chakra icons with `npm i @chakra-ui/icons`

Now, we launch our IDE, then start our application with  `npm start`  

Notice that at the top right there is an icon to switch between light and dark modes. Pretty cool, but not the focus of today’s tutorial. I’ll go ahead and switch it because it looks pretty cool.

Not much use adding a scroll button to a page without enough content to scroll, so we’re going to add some dummy content.

## Making Boxes
In the /src directory, create a folder named components.
In your components directory, create a new file called Boxes.jsx
We’ll need a few imports to start with:
+ React, useEffect, and useState from React
+ Flex and Box from @chakra-ui/react
```import React, { useEffect, useState } from 'react';
import { Flex, Box } from '@chakra-ui/react';
```
Create our functional component and just return a fragment for now:
```
const Boxes = () => {
  return (<></>)
}
export default Boxes;
```

In our Boxes function, we’ll create a slice of state called boxes and initialize it as an empty array
```
const [boxes, setBoxes] = useState([]);
```
Then we’ll create a function and call it makeBoxes with a single parameter for how many boxes we want. We’ll use an accumulator array and a for loop to push boxes into our array.
```
const makeBoxes = howMany => {
  let boxes = [];
  for (let i = 0; i < howMany; i++) {
    boxes.push('box' + i);
  }
  return boxes;
};
```

Now, we use the `useEffect` hook to set our boxes into application state.
```
useEffect(() => {
  setBoxes(makeBoxes(100));
}, []);
```

Go down to our return statement and we’ll replace our fragment with a Flex box. We’ll give it a `flexFlow` (shorthand for `flexDirection` and `flexWrap`) of `row wrap`, a `gap` of `{4}`, which Chakra will translate to a relative size and `justifyContent` of `center`.
```
<Flex flexFlow="row wrap" gap={4} justifyContent="center"></Flex>
```

We want to make sure there are boxes before trying to render them so I’ll put in a simple check to make sure the boxes array in state is “truthy”.

Now, we’ll map over the boxes array and return a Box for each one with a key, padding set to 80 pixels, and a gradient background, just for the heck of it. Let’s go ahead and give our boxes a nice round border. Some happy little boxes with happy little borders.
```
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
```

### `Boxes.jsx` should look like this now:
```
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
```
## Creating The Button
Now, for the main event: the scroll to top button. This component is completely reusable and depends on GSAP, the Chakra component library, and Chakra icons.

In your components directory, create a new file called ScrollToTop.jsx
Import the modules we need:
+ React, useEffect, and useRef from React
+ IconButton from @chakra-ui/react
+ ArrowUpIcon from @chakra-ui/icons that we installed earlier
+ gsap from gsap
```
import React, { useEffect, useRef } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { gsap } from 'gsap';
```

We create our functional component.
We'll just return a fragment for now
```
const ScrollToTop = () => {
  return (<></>)
};

export default ScrollToTop;
```

## State
Inside our functional component, Let’s set up the state we’ll need using the `useState` hook
```
const [isVisible, setIsVisible] = React.useState(false);
```
We’ll store a reference to this one with `useRef` and we'll call that one Ryan Reynolds, no, scrollButton. It's always good practice to use declarative names for variables.
```
const scrollButton = useRef();
```
Now that we’ve got our state, let’s write the functions that we’ll need to make the magic happen

## What’s Your Function?

First is our handleScroll function, which will check the window location on scroll.
```
const handleScroll = () => {
  if (window.scrollY > 100) {
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }
};
```

Now our handleClick function:
```
const handleClick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  scrollButton.current.blur();
};
```

We’ll tell it to move focus away from the button after it’s clicked so you don’t get that annoying browser highlighting hanging around next time it shows.

While gsap does have a function for this, I found it easier just to use the standard window API. It’s generally best to use the standard web APIs if you don’t need the extra weight of a library function.


On to our useEffect calls:

## useEffect in Effect

Let’s write our first `useEffect` call where we will add an event listener to the document window to listen for the scroll event. This will fire our handleScroll function when the browser detects a scroll event.
```
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```
Don’t forget to remove the event listener in the return block. Not that we need it here, but in any other application you want to do a little cleanup before you unmount the component. And make sure to add that empty dependency array at the end so it doesn’t run on every render, just the first one.

Our second call will listen for a change in the isVisible slice of state and animate our component based on that state.
```
useEffect(() => {
  if (isVisible) {
  gsap.to(scrollButton.current, {
    duration: 0.5,
    opacity: 1,
    zIndex: 100,
  });
} else {
  gsap.to(scrollButton.current, {
    duration: 0.5,
    opacity: 0,
    zIndex: -1,
  });
}
}, [isVisible]);
```

Now that we have the logic in place, let’s replace our fragment

## Iconic

Now, we’ll replace that fragment with an IconButton from Chakra UI and give it the following attributes:
```
<IconButton
  aria-label="scroll to top"
  icon={<ArrowUpIcon />}
  size="lg"
  colorScheme="purple"
  variant="outline"
  border="2px solid"
  ref={scrollButton}
  onClick={handleClick}
  position="fixed"
  bottom="4rem"
  right="4rem"
  zIndex="-1"
  opacity="0"
/>
```
### `ScrollToTop.jsx` should look like this now:
```
import React, { useEffect, useRef } from 'react';
import { IconButton } from '@chakra-ui/react';
import { ArrowUpIcon } from '@chakra-ui/icons';
import { gsap } from 'gsap';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const scrollButton = useRef();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      gsap.to(scrollButton.current, {
        duration: 0.5,
        opacity: 1,
        zIndex: 100,
      });
    } else {
      gsap.to(scrollButton.current, {
        duration: 0.5,
        opacity: 0,
        zIndex: -1,
      });
    }
  }, [isVisible]);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    scrollButton.current.blur();
  };

  return (
    <IconButton
      aria-label="scroll to top"
      icon={<ArrowUpIcon />}
      size="lg"
      colorScheme="purple"
      variant="outline"
      border="2px solid"
      ref={scrollButton}
      onClick={handleClick}
      position="fixed"
      bottom="4rem"
      right="4rem"
      zIndex="-1"
      opacity="0"
    />
  );
};

export default ScrollToTop;
```
## Don’t forget to wrap it up!

Finally, we'll import our components into our application in `App.js`
```
import Boxes from './components/Boxes';
import ScrollToTop from './components/ScrollToTop';
```
Then we'll place them below the Box in the return statement
```
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        ...
      </Box>
      <Boxes />
      <ScrollToTop />
    </ChakraProvider>
  );
```
App.js should look like this now:
```
import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Boxes from './components/Boxes';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
      <Boxes />
      <ScrollToTop />
    </ChakraProvider>
  );
}

export default App;
```
## Ding! Fries are done!
And there we go, a scroll to top button that plays nice and works in any component. Thanks so much for checking out my tutorial. The Github link for the code is in the comments, as well as links to Chakra UI and GSAP – two great libraries that make life easier.
