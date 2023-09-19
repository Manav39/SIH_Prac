import React from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text, HStack } from '@chakra-ui/react';

const Client = (c) => {
    return (
        <Card m={3}>
            <CardHeader>
                <HStack>
                    <Heading size='lg'>Client Name:</Heading>
                    <Heading size='md'>{ c.props.Name }</Heading>
                </HStack>
            </CardHeader>
            <CardBody>
                <HStack>
                    <Heading size='lg'>Client Address:</Heading>
                    <Text>{ c.props.Address }</Text>
                </HStack>
            </CardBody>
            <CardFooter>
                <Button>View here</Button>
            </CardFooter>
        </Card>
    )
}

export default Client;