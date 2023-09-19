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
    VStack,
    Divider,
    useToast,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { useVault } from '../context/context'

const AddNewCase = ({ onSuccess }) => {

    const { account, contract, caseCount, setCaseCount } = useVault();

    const toast = useToast();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const [numOfJudges, setNumOfJudges] = useState(0);
    const mapJudgesList = Array.from({ length: numOfJudges });
    const [judgeAddresses, setJudgeAddresses] = useState([]);

    const [numOfLawyers, setNumOfLawyers] = useState(0);
    const mapLawyersList = Array.from({ length: numOfLawyers });
    const [lawyerAddresses, setLawyerAddresses] = useState([]);

    const [numOfClients, setNumOfClients] = useState(0);
    const mapClientsList = Array.from({ length: numOfClients });
    const [clientAddresses, setClientAddresses] = useState([]);

    const handleJudgeAddressChange = (index, value) => {
        let addresses = [...judgeAddresses];
        addresses[index] = value;
        let filtered = addresses.filter((str) => str !== "");
        setJudgeAddresses(filtered);
    };

    const handleLawyerAddressChange = (index, value) => {
        let addresses = [...lawyerAddresses];
        addresses[index] = value;
        let filtered = addresses.filter((str) => str !== "");
        setLawyerAddresses(filtered);
    };
    
    const handleClientAddressChange = (index, value) => {
        let addresses = [...clientAddresses];
        addresses[index] = value;
        let filtered = addresses.filter((str) => str !== "");
        setClientAddresses(filtered);
    };

    const validateForm = () => {
        if(title === "") {
            toast({
                position: 'top',
                title: 'Please Enter a Title',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });
            return false;
        }
        else if(desc === "") {
            toast({
                position: 'top',
                title: 'Please Enter a Description',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });
            return false;
        }
        else if(numOfJudges === 0) {
            toast({
                position: 'top',
                title: 'Please Enter number of Judges',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });
            return false;
        }
        else if(numOfLawyers === 0) {
            toast({
                position: 'top',
                title: 'Please Enter number of Lawyers',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });
            return false;
        }
        else if(numOfClients === 0) {
            toast({
                position: 'top',
                title: 'Please Enter number of Clients',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });
            return false;
        }
        else if(judgeAddresses.length < numOfJudges) {
            toast({
                position: 'top',
                title: 'Please Enter the Addresses of Judges',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });
            return false;
        }
        else if(lawyerAddresses.length < numOfLawyers) {
            toast({
                position: 'top',
                title: 'Please Enter the Addresses of Lawyers',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });
            return false;
        }
        else if(clientAddresses.length < numOfClients) {
            toast({
                position: 'top',
                title: 'Please Enter the Addresses of Clients',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });
            return false;
        }
        return true
    }

    const handleSubmit = async () => {
        if(validateForm()) {
            const result = await contract.createCase(title, desc, judgeAddresses, clientAddresses, lawyerAddresses);
            console.log("result: ", result);
            toast({
                position: "top",
                title: "New Case Added Successfully",
                status: "success",
                duration: 1500,
                isClosable: true,
            });
            setCaseCount(caseCount + 1);
            onSuccess();
        }
        // console.log('Judge Addresses:', judgeAddresses, 'No. of Judges: ', numOfJudges);
        // console.log('Lawyer Addresses:', lawyerAddresses, 'No. of Lawyers: ', numOfLawyers);
        // console.log('Client Addresses:', clientAddresses, 'No. of Clients: ', numOfJudges);
    }

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
                        <Input type="text" onChange={(e) => setTitle(e.target.value)} required/>
                    </FormControl>
                
                </HStack>
                <FormControl id="desc" isRequired>
                    <FormLabel>Description</FormLabel>
                    <Textarea w={400} h={200} onChange={(e) => setDesc(e.target.value)} required/>
                </FormControl>

                <VStack>
                    <FormControl id="numJudges" isRequired>
                        <FormLabel>Number Of Judges</FormLabel>
                        <Input type="number" onChange={(e) => setNumOfJudges(e.target.value)} required/>
                    </FormControl>

                    {
                        mapJudgesList.map((idx, val) => (
                            <FormControl isRequired>
                                <FormLabel>Judge {val+1} Address: </FormLabel>
                                <Input type="text" onChange={(e) => handleJudgeAddressChange(val, e.target.value)} required/>
                            </FormControl>
                        ))
                    }
                </VStack>

                <Divider/>

                <VStack>
                    <FormControl id="numLawyers" isRequired>
                        <FormLabel>Number Of Lawyers</FormLabel>
                        <Input type="number" onChange={(e) => setNumOfLawyers(e.target.value)} required/>
                    </FormControl>

                    {
                        mapLawyersList.map((idx, val) => (
                            <FormControl isRequired>
                                <FormLabel>Lawyer {val+1} Address: </FormLabel>
                                <Input type="text"  onChange={(e) => handleLawyerAddressChange(val, e.target.value)} required/>
                            </FormControl>
                        ))
                    }
                </VStack>

                <Divider/>

                <VStack>
                    <FormControl id="NumClient" isRequired>
                        <FormLabel>Number Of Clients</FormLabel>
                        <Input type="number" onChange={(e) => {setNumOfClients(e.target.value)}} required/>
                    </FormControl>

                    {
                        mapClientsList.map((idx, val) => (
                            <FormControl isRequired>
                                <FormLabel>Client {val+1} Address: </FormLabel>
                                <Input type="text" onChange={(e) => handleClientAddressChange(val, e.target.value)} required/>
                            </FormControl>
                        ))
                    }
                </VStack>

                <Divider />

                <Stack spacing={10} pt={2}>
                <Button
                    onClick={handleSubmit}
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