import { Flex, Heading } from "@chakra-ui/react"
import Profile from "./Profile"

export default function AboutUs() {
    return(
        <Flex direction={'column'} gap={'10px'} align={'center'} justify={'center'} marginTop={'75px'}>
            <Heading color={'white'}>About Us</Heading>
            <Profile profilePicture='src/assets/thelordjesus.jpeg' about = 'Hello! I am Jesus Rodriguez, a Computer Science Major at Brown University. Worship me I am your Lord.'/>
            <Profile profilePicture='src/assets/keyan.jpeg'  about = 'I am awesome and my name is Keyan Rahimi. I am a Comptuer Science and Cognitve Nueroscince Major at Brown.'/>
            <Profile profilePicture='src/assets/Kaley.jpeg'  about = 'I am Kaley Newlin. Recently finding my passion for computer science and cognitve neuroscience, I hope I can work on projects like this to bring to light some misconceptions and allow for more understanding of the exciting work coming about in this new tech age.' />
        </Flex>
    )
}
