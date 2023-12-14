import { Heading, Flex, Image, Text, Button } from '@chakra-ui/react'

const scrollToOffset = () => {
      const offset = 1000; 
      window.scrollTo({ top: offset, behavior: 'smooth' });
  };

export default function Landing() {
    return(
        <div>
            {/* <Flex  borderTop="5px solid" borderBottom="1px solid" p={2} color="#FAF9F6" 
                 alignItems="center" justifyContent="center" >
                </Flex> */}
            <Flex   borderBottom="1px solid" p={6} color="#FAF9F6" 
                 alignItems="center" justifyContent="center" >
                </Flex>
            <Flex>
                <Flex justify='center' align='center' className='left-side' direction={'column'} width={'45%'}>
                    <Heading color="white">Neural Network Education</Heading>
                    <Text align={'center'} color="white">
                   Ready to take a dive into Artifical Intelligence and Object Recognition?  <br />Try out our Playground!
                    </Text>
                    <Button style={{ marginTop: '20px' }} onClick={scrollToOffset}>Check it out</Button>
                </Flex>
                <Flex justify={'center'} align={'center'} width={'55%'} className='right-side'>
                    <Image src='src/assets/Untitled design (3).png' />
                </Flex>
            </Flex>
            <Flex borderTop="1px solid"  borderBottom="3px solid" p={6} color="#FAF9F6" 
                 alignItems="center" justifyContent="center" >
                </Flex>
            <Flex borderTop="1px solid"  borderBottom="5px solid" p={2} color="#FAF9F6" 
                 alignItems="center" justifyContent="center" >
                </Flex>
        </div>
    )
}
