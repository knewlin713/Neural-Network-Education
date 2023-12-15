import { Flex, Heading, Text } from "@chakra-ui/react"
import Profile from "./Profile"
import { forwardRef } from "react"

const AboutUs = forwardRef(({props}, ref) => {
    return(
        
        <Flex direction={'column'} gap={'10px'} align={'center'} justify={'center'} marginTop={'75px'}>
            <Heading color={'white'}  ref={ref}>About Us</Heading>
            <Profile profilePicture='src/assets/thelordjesus.jpg' about = 'Hello! I am Jesus Rodriguez, a Computer Science Major at Brown University.'/>
            <Profile profilePicture='src/assets/keyan.jpg'  about = 'Hey, I am Keyan Rahimi! I study Computer Science and Cognitve Nueroscience at Brown University.'/>
            <Profile profilePicture='src/assets/Kaley.jpg'  about = 'I am Kaley Newlin. Recently finding my passion for computer science and cognitve neuroscience, I hope I can work on projects like this to bring to light some misconceptions and allow for more understanding of the exciting work coming about in this new tech age.' />
            <Heading color="white">Our Mission</Heading> 
            <Text style={{ textAlign: 'center', color:'white' }}>
                Sometimes it is difficult to conceptulize artificial intelligence in object <br />
                recognition due to its complexity. We want to make sure that people who want <br />
                to learn about it, especially children, are able to. In addition, we hope to <br />
                see a world where misconceptions about AI are limited. With one step at a time,<br />
                we hope to bring AI education to youth. 
            </Text>
        </Flex>
    )
})

export default AboutUs;
