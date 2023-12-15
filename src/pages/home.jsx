import Header from '../components/Header';
import { Flex, Heading, Text } from "@chakra-ui/react"
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

    return (
        <div>
            <Header educationRef={educationRef} playgroundRef={playgroundRef} aboutusRef={aboutusRef} landingRef={landingRef}/>
            <div style={{ minHeight: '90vh' }}>
                <Landing ref={landingRef} playgroundRef={playgroundRef}/>
            </div>
            <div style={{ minHeight: '125vh' }}>
                <Education ref={educationRef}/>
            </div>
                <div style={{ minHeight: '100vh' }}>
                    <Playground ref={playgroundRef}/>
                </div>
                <div style={{ minHeight: '100vh' }}>
                    <AboutUs ref={aboutusRef}/>
                </div>
        </div>
    )
}
