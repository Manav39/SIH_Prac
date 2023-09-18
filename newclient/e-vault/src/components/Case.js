import React from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text } from '@chakra-ui/react';

const Case = (c) => {
    return (
        <Card m={3}>
            <CardHeader>
                <Heading size='md'>{ c.props.title }</Heading>
            </CardHeader>
            <CardBody>
                <Text>{ c.props.description }</Text>
            </CardBody>
            <CardFooter>
                <Button>View here</Button>
            </CardFooter>
        </Card>
    )
}

export default Case;