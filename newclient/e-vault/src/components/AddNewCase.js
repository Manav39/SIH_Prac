import React from 'react'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Textarea,
  } from '@chakra-ui/react'
import { useState } from 'react'

const AddNewCase = () => {
    return (
        <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
                Add A New Case
            </Heading>
            
            </Stack>
            <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            >
            <Stack spacing={4}>
                <HStack>
                
                    <FormControl id="title" isRequired>
                        <FormLabel>Case Title</FormLabel>
                        <Input type="text" />
                    </FormControl>
                
                </HStack>
                <FormControl id="desc">
                    <FormLabel>Description</FormLabel>
                    <Textarea w={400} h={200}/>
                </FormControl>

                <Stack spacing={10} pt={2}>
                <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                    bg: 'blue.500',
                    }}>
                    Add
                </Button>
                </Stack>
                <Stack pt={6}>
                
                </Stack>
            </Stack>
            </Box>
        </Stack>
        </Flex>
    )
}

export default AddNewCase