import { Heading, Flex, Image, Text, Button } from '@chakra-ui/react'
export default function Landing() {
    return(
        <div>
            
            <Flex>
                <Flex justify='center' align='center' className='left-side' direction={'column'} width={'45%'}>
                    <Heading color="white">Neural Network Education</Heading>
                    <Text align={'center'} color="white">
                   Ready to take a dive into Artifical Intelligence and Object Recognition? 
                    </Text>
                    <Button>Check it out</Button>
                </Flex>
                <Flex justify={'center'} align={'center'} width={'55%'} className='right-side'>
                    <Image src='src/assets/Untitled design (3).png' />
                </Flex>
            </Flex>
        </div>
    )
}
