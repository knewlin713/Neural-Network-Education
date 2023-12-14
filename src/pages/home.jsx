import Header from '../components/header';
import { Flex, Heading, Text } from "@chakra-ui/react"
import backgroundImage from '../assets/spider.jpg';
import Playground from './Playground';
import Landing from '../components/Landing';
import AboutUs from '../components/AboutUs'
import Education from '../components/Education'
import { useRef, forwardRef, createRef } from 'react';

export default function Home(){
  
    const educationRef = createRef();
    const playgroundRef = createRef();
    const aboutusRef = createRef();
    const landingRef = createRef();

    
    return(
        <div>
        <Header educationRef={educationRef} playgroundRef={playgroundRef} aboutusRef={aboutusRef} landingRef={landingRef}/>
        <div style={{ height: '100vh' }}>
            <Landing ref={landingRef} playgroundRef={playgroundRef}/>
        </div>
        <div style={{ height: '100vh' }}>
            <Education ref={educationRef}/>
        </div>
        <div style={{ height: '250vh' }}>ref={}
            <Playground ref={playgroundRef}/>
        </div>
        <div style={{ height: '100vh' }}>
            <AboutUs ref={aboutusRef}/>
        </div>
        </div>
    )
}
//maybe remove about us an descibe nueural networks a bit with a blurb and such
