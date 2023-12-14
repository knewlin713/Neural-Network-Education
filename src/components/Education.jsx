import { AspectRatio, Flex, Card, CardBody, Heading } from "@chakra-ui/react"
import ReactPlayer from 'react-player'

export default function Education() {
    return(
        <Flex align={'center'} justify={'center'} marginTop={'75px'} direction={'column'} height={'560px'}>
            <Heading color='white'>Education Time</Heading>
            <Flex maxWidth={'50%'} height={'100%'}>
                {/* <Card>
                    <CardBody>
                        hi
                    </CardBody>
                </Card> */}
                <ReactPlayer url="https://www.youtube.com/embed/NOEy_9DgLvU?si=ay-Iqk4YCt8Jgh32"/>
                {/* <AspectRatio ratio={1} height={'100%'} width={'560px'}>
                <video width="560" height="560" src="https://www.youtube.com/embed/NOEy_9DgLvU?si=ay-Iqk4YCt8Jgh32" title="YouTube video player" allowFullScreen/>
                </AspectRatio> */}
            </Flex>
        </Flex>
    )
}