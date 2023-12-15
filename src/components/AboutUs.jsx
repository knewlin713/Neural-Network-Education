import { Flex, Heading, Text } from "@chakra-ui/react"
import Profile from "./Profile"
import { forwardRef } from "react"

const AboutUs = forwardRef(({props}, ref) => {
    return(
        
        <Flex direction={'column'} gap={'10px'} align={'center'} justify={'center'} marginTop={'75px'}>
            <Heading color={'#FAF9F6'}  ref={ref}>About Us</Heading>
            <Profile profilePicture='/assets/thelordjesus.jpg' about = "Hello! My name is Jesus Rodriguez and I'm a computer science major at Brown University! The visualization of the data behind a neural network was definitely fun to code (though it took too long to find where the right places were)" />
            <Profile profilePicture='/assets/keyan.jpg'  about = 'Hey, I am Keyan Rahimi! I study Computer Science and Cognitve Nueroscience at Brown University.'/>
        <Profile profilePicture='/assets/Kaley.jpg'  about = 'I am Kaley Newlin. Recently finding my passion for computer science and cognitve neuroscience, I hope I can work on projects like this to bring to light some misconceptions and allow for more understanding of the exciting work coming about in this new tech age.' />
            <Heading color="#FAF9F6">Our Mission</Heading> 
            <Text style={{ textAlign: 'center', color:'#FAF9F6' }}>
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
