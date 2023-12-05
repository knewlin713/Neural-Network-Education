import Header from '../components/header';
import { Flex, Heading, Text } from "@chakra-ui/react"
import backgroundImage from '../assets/spider.jpg';


export default function Home(){
  
    return(
        <div>
            <Header />
            {/* <Flex width="100" height="250px" borderWidth='1px' borderRadius='lg' style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}} alignItems="center" justifyContent="center">
            <Text color="white">Neural Network Education</Text>
            </Flex> */}
            <Flex justifyContent="center">
            <Heading color="white">Neural Network Education</Heading>
            </Flex>
        </div>
    )
}
