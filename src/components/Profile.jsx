import { Avatar, Card, Flex, CardBody, Text } from '@chakra-ui/react';

export default function Profile({profilePicture, about}) {
    return(
        <Flex align={'center'} justify={'center'} width={'75%'}>
            <Avatar size={'2xl'} src={profilePicture}/>
            <Card size='lg' width={'90%'} borderRadius={'md'} backgroundColor={'#585B5B'} boxShadow={'md'}>
                <CardBody>
                    <Text>
                     {about}
                    </Text>
                </CardBody>
            </Card>
        </Flex>
    )
}
