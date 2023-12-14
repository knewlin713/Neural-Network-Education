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
            
            <Landing />
            <AboutUs />
            <Education />
            <Playground />  
        </div>
    )
}
//maybe remove about us an descibe nueural networks a bit with a blurb and such