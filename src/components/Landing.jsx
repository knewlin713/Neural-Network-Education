import { Heading, Flex, Image, Text, Button } from '@chakra-ui/react'
import { forwardRef } from 'react';


const Landing = forwardRef(({playgroundRef}, ref) =>  {
    const traverseToProject = () => {
        playgroundRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
    }
    return(
        <div>
            {/* <Flex  borderTop="5px solid" borderBottom="1px solid" p={2} color="#FAF9F6" 
                 alignItems="center" justifyContent="center" >
                </Flex> */}
            <Flex   borderBottom="1px solid" p={6} color="#FAF9F6" 
                 alignItems="center" justifyContent="center" ref={ref} >
                </Flex>
            <Flex>
                <Flex justify='center' align='center' className='left-side' direction={'column'} width={'45%'}>
                    <Heading color="white">Neural Network Education</Heading>
                    <Text align={'center'} color="white">
                   Ready to take a dive into Artifical Intelligence and Object Recognition?  <br />Try out our Playground!
                    </Text>
                    <Button style={{ marginTop: '20px' }} onClick={() => traverseToProject()}>Check it out</Button>
                </Flex>
                <Flex justify={'center'} align={'center'} width={'55%'} className='right-side'>
                    <Image src='src/assets/face.JPG' />
                </Flex>
            </Flex>
            <Flex borderTop="1px solid"   p={6} color="#FAF9F6" 
                 alignItems="center" justifyContent="center" >
                </Flex>
        </div>
    )
})

export default Landing
