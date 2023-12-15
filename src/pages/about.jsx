import Header from '../components/Header';
import { Heading } from '@chakra-ui/react'
export default function About() {
    return(
        <div>
            <Header />
            <Landing />
            <Heading color="white"> Mission </Heading>
            <Text align={'center'} color="white">
                   Ready to take a dive into Artifical Intelligence and Object Recognition? 
            </Text>
            <AboutUs />
        </div>
    )
}
//our mission should go before the about pages and maybe the click me
