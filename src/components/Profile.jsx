import { Avatar, Card, Flex, CardBody, Text } from '@chakra-ui/react';

export default function Profile({profilePicture}) {
    return(
        <Flex align={'center'} justify={'center'} width={'75%'}>
            <Avatar size={'2xl'} src={profilePicture}/>
            <Card size='lg' width={'90%'} borderRadius={'md'} backgroundColor={'#585B5B'} boxShadow={'md'}>
                <CardBody>
                    <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis augue nec urna vestibulum facilisis. Fusce accumsan scelerisque mauris nec hendrerit. Nam molestie, enim quis cursus lobortis, lectus sapien egestas ante, ac consectetur risus arcu vitae magna. Duis vel est iaculis, maximus ante ut, pulvinar sapien. Proin vulputate arcu nec elit vulputate, at sodales diam auctor. Vestibulum et blandit nisi, eget faucibus erat. Ut dictum ex ac laoreet rutrum.
                    </Text>
                </CardBody>
            </Card>
        </Flex>
    )
}
