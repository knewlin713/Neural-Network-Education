import Header from '../components/header';
import { Flex, Heading, Text } from "@chakra-ui/react"
import backgroundImage from '../assets/spider.jpg';
import Playground from './Playground';
import Landing from '../components/Landing';

export default function Home(){
  
    return(
        <div>
            <Header />
            <Flex justify={'center'}>
            
            </Flex>
            <Landing />
            
            {/* <Playground />   */}
        </div>
    )
}
