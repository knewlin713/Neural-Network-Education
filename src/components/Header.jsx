import { Box, Flex, Spacer, Heading, Button } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import { useRef } from 'react';



export default function Header({ landingRef, educationRef, aboutusRef, playgroundRef }) {
    // let navigate = useNavigate();
    //every function used to be navigate('path'), changed for now
    const scrollToComponent = (ref) => {
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      };
    const handleHome = () => {
        console.log('/home'); //when we choose the path to navigate to, use / + route_name
    }
    const handleAbout = () => {
        console.log('/about')
    }
    const handlePlayground = () => {
        console.log('/playground');
    }
    
    return (
        <Flex alignItems="center" justifyContent="center">
        <Flex borderBottom="1px " p={4} color="#FAF9F6" width="66%" 
            alignItems="center" justifyContent="center" gap="25px" >
                {/* <Heading size="md">Project Title</Heading>  */}
                <Button onClick={() => {scrollToComponent(landingRef)}}variant="link" color="#FAF9F6">Home</Button>
                <Button onClick={() => {scrollToComponent(educationRef)}}variant="link" color="#FAF9F6">Learn</Button>
                <Button onClick={() => {scrollToComponent(aboutusRef)}}variant="link" color="#FAF9F6">About Us</Button>
                <Button onClick={() => {scrollToComponent(playgroundRef)}}variant="link" color="#FAF9F6">Playground</Button>
                {/* <Button onClick={() => {scrollToComponent()}}variant="link" color="#FAF9F6">FAQ</Button> */}

        </Flex>
        </Flex>
    )
}
