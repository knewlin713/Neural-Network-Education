import { Flex, Heading } from "@chakra-ui/react"
import Profile from "./Profile"

export default function AboutUs() {
    return(
        <Flex direction={'column'} gap={'10px'} align={'center'} justify={'center'} marginTop={'75px'}>
            <Heading color={'white'}>About Us</Heading>
            <Profile profilePicture='src/assets/Untitled design (3).png'/>
            <Profile profilePicture='src/assets/Untitled design (3).png'/>
            <Profile profilePicture='src/assets/Untitled design (3).png'/>
        </Flex>
    )
}
