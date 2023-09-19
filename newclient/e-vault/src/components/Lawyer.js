import React from 'react'
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text, HStack } from '@chakra-ui/react';

const Lawyer = (l) => {
    return (
        <Card m={3}>
            <CardHeader>
                <HStack>
                    <Heading size='lg'>Lawyer Name:</Heading>
                    <Heading size='md'>{ l.props.Name }</Heading>
                </HStack>
            </CardHeader>
            <CardBody>
                <HStack>
                    <Heading size='lg'>Lawyer Address:</Heading>
                    <Text>{ l.props.Address }</Text>
                </HStack>
            </CardBody>
            <CardFooter>
                <Button>View here</Button>
            </CardFooter>
        </Card>
    )
}

export default Lawyer;