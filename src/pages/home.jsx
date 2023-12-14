import Header from '../components/header';
import { Flex, Heading, Text } from "@chakra-ui/react"
import backgroundImage from '../assets/spider.jpg';
import Playground from './Playground';
import Landing from '../components/Landing';
import AboutUs from '../components/AboutUs'
import Education from '../components/Education'

export default function Home(){
  
    return(
        <div>
        <Header />
        <div style={{ height: '100vh' }}>
            <Landing />
        </div>
        <div style={{ height: '100vh' }}>
            <Education />
        </div>
        <div style={{ height: '200vh' }}>
            <Playground />
        </div>
        <div style={{ height: '100vh' }}>
            <AboutUs />
        </div>
        </div>
    )
}
//maybe remove about us an descibe nueural networks a bit with a blurb and such
