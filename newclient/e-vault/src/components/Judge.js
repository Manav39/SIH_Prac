import React from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text, HStack } from '@chakra-ui/react';

const Judge = (j) => {
    return (
        <Card m={3}>
            <CardHeader>
                <HStack>
                    <Heading size='lg'>Judge Name:</Heading>
                    <Heading size='md'>{ j.props.Name }</Heading>
                </HStack>
            </CardHeader>
            <CardBody>
                <HStack>
                    <Heading size='lg'>Judge Address:</Heading>
                    <Text>{ j.props.Address }</Text>
                </HStack>
            </CardBody>
            <CardFooter>
                <Button>View here</Button>
            </CardFooter>
        </Card>
    )
}

export default Judge;