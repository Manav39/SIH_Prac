import React, { useEffect } from 'react'

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
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Center,
    Image,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { useVault } from '../context/context'
import { useParams } from 'react-router-dom'
import axios from "axios";

import { InfoOutlineIcon } from '@chakra-ui/icons'

const IMAGE = 
  "https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"

const ViewCase = ({ onSuccess }) => {

    const { id } = useParams();

    const { account, contract, userType } = useVault();

    const toast = useToast();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);

    const [numOfJudges, setNumOfJudges] = useState(0);
    const [judgeAddresses, setJudgeAddresses] = useState([]);

    const [numOfLawyers, setNumOfLawyers] = useState(0);
    const [lawyerAddresses, setLawyerAddresses] = useState([]);

    const [numOfClients, setNumOfClients] = useState(0);
    const [clientAddresses, setClientAddresses] = useState([]);

    const [documentHashesList, setDocumentHashesList] = useState([]);
    const [documentDescriptionsList, setDocumentDescriptionsList] = useState([]);
    const [documentUploadersList, setDocumentUploadersList] = useState([]);

    const [numOfDocs, setNumOfDocs] = useState(0);
    const mapDocsList = Array.from({ length: numOfDocs });
    const [docsAddresses, setDocsAddresses] = useState([]);


    const retrieveFile = (e) => {
        const data = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
        console.log(e.target.files[0].name);
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (file) {
          try {
            const formData = new FormData();
            formData.append("file", file);
    
            const resFile = await axios({
              method: "post",
              url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
              data: formData,
              headers: {
                pinata_api_key: `e8b143c571986d7b7074`,
                pinata_secret_api_key: `
    c60fe4549b60ae8f8dae9402ca841df7307d7947fbb90363cd7250b16d4cff8d`,
                "Content-Type": "multipart/form-data",
              },
            });
    
            const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
            console.log("Image hash: ", ImgHash)
            toast({
                position: 'top',
                title: 'Document Uploaded Successfully',
                status: 'success',
                duration: 1500,
                isClosable: true,
            });
            await contract.addDocument(id, ImgHash, fileName);
            setFileName("No image Uploaded");
            setFile(null);
          } catch (e) {
            alert(e);
          }
        }
    };

    useEffect(() => {

        const display = async() => {
            try {
                // starts with 0
                const cl = await contract.getCaseDetails(id);

                setTitle(cl[0]);
                setDesc(cl[1]);
                setNumOfJudges(cl[2].length);
                setNumOfLawyers(cl[3].length);
                setNumOfClients(cl[4].length);

                setJudgeAddresses(cl[2]);
                setLawyerAddresses(cl[3]);
                setClientAddresses(cl[4]);

                setDocumentHashesList(cl[5]);
                setDocumentDescriptionsList(cl[6]);
                setDocumentUploadersList(cl[7]);
                
                // console.log("Title: ", title);
                // console.log("Desc: ", desc);
                // console.log("Num of Judges: ", numOfJudges);
                // console.log("Judges Addressess: ", judgeAddresses);
                // console.log("Num of Lawyers: ", numOfLawyers);
                // console.log("Lawyers Addressess: ", lawyerAddresses);
                // console.log("Num of Clients: ", numOfClients);
                // console.log("Clients Addressess: ", clientAddresses);
                // console.log(documentHashesList);
                // console.log(documentDescriptionsList);
                // console.log(documentUploadersList);
            }
            catch(err) {
                 console.log(err);
            }
        }
        display();

    }, [])

    return (

        <Tabs variant='soft-rounded' isFitted colorScheme='cyan'>
        <TabList>
            <Tab>Case Details</Tab>
            <Tab>Case Documents</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                        <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Case {parseInt(id) + 1} 
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
                                    <Input type="text" value={title} readOnly/>
                                </FormControl>
                            
                            </HStack>
                            <FormControl id="desc" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea w={400} h={200} value={desc} readOnly/>
                            </FormControl>

                            <VStack>
                                <FormControl id="numJudges" isRequired>
                                    <FormLabel>Number Of Judges</FormLabel>
                                    <Input type="number" value={numOfJudges} readOnly/>
                                </FormControl>

                                {
                                    judgeAddresses.map((val, idx) => (
                                        <FormControl isRequired>
                                            <FormLabel>Judge {idx + 1} Address: </FormLabel>
                                            <Input type="text" value={val} readOnly/>
                                        </FormControl>
                                    ))
                                }
                            </VStack>

                            <Divider/>

                            <VStack>
                                <FormControl id="numLawyers" isRequired>
                                    <FormLabel>Number Of Lawyers</FormLabel>
                                    <Input type="number" value={numOfLawyers} readOnly/>
                                </FormControl>

                                {
                                    lawyerAddresses.map((val, idx) => (
                                        <FormControl isRequired>
                                            <FormLabel>Lawyer {idx + 1} Address: </FormLabel>
                                            <Input type="text"  value={val} readOnly/>
                                        </FormControl>
                                    ))
                                }
                            </VStack>

                            <Divider/>

                            <VStack>
                                <FormControl id="NumClient" isRequired>
                                    <FormLabel>Number Of Clients</FormLabel>
                                    <Input type="number" value={numOfClients} readOnly/>
                                </FormControl>

                                {
                                    clientAddresses.map((val, idx) => (
                                        <FormControl isRequired>
                                            <FormLabel>Client {idx + 1} Address: </FormLabel>
                                            <Input type="text" value={val} readOnly/>
                                        </FormControl>
                                    ))
                                }
                            </VStack>

                            <Divider />

                            {
                                (userType === "Judge" || userType === "Lawyer") && (

                                    <>

                                    <VStack>
                                        {/* <FormControl id="NumDocs" isRequired>
                                            <FormLabel>Number Of Documents</FormLabel>
                                            <Input type="number" onChange={(e) => setNumOfDocs(e.target.value)}/>
                                        </FormControl> */}
                                        <FormControl isRequired>
                                            <FormLabel>Document </FormLabel>
                                            <Input
                                                type="file"
                                                id="file-upload"
                                                name="data"
                                                onChange={retrieveFile}
                                            />
                                        </FormControl>
                                    </VStack>

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
                                        Add Documents
                                    </Button>
                                    </Stack>

                                    </>
                                )
                            }

                        </Stack>
                        </Box>
                    </Stack>
                </Flex>
            </TabPanel>


            <TabPanel>
                <Flex
                    minH={'100vh'}
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>


                    {
                        documentHashesList.length === 0 && (
                            <Box border="2px solid cyan"  bgColor={'cyan.400'}  borderRadius="50" m={20} p={10}>
                                <HStack>
                                    <Heading>
                                        <InfoOutlineIcon/>
                                    </Heading>
                                    <Heading>
                                        No Documents Uploaded
                                    </Heading>
                                </HStack>
                            </Box>
                        )
                    }

                    {
                        documentHashesList && documentHashesList.map((documentHash, idx) => (
                            <Center py={12} ml={5}>
                                <Box
                                    role={'group'}
                                    p={6}
                                    maxW={'330px'}
                                    w={'full'}
                                    bg={useColorModeValue('white', 'gray.800')}
                                    boxShadow={'2xl'}
                                    rounded={'lg'}
                                    pos={'relative'}
                                    zIndex={1}>
                                    <Box
                                    rounded={'lg'}
                                    mt={-12}
                                    pos={'relative'}
                                    height={'230px'}
                                    _after={{
                                        transition: 'all .3s ease',
                                        content: '""',
                                        w: 'full',
                                        h: 'full',
                                        pos: 'absolute',
                                        top: 5,
                                        left: 0,
                                        backgroundImage: `url(${IMAGE})`,
                                        filter: 'blur(15px)',
                                        zIndex: -1,
                                    }}
                                    _groupHover={{
                                        _after: {
                                        filter: 'blur(20px)',
                                        },
                                    }}>
                                    <Image
                                        rounded={'lg'}
                                        height={230}
                                        width={282}
                                        objectFit={'cover'}
                                        src={IMAGE}
                                        alt="#"
                                    />
                                    </Box>
                                    <Stack pt={10} align={'center'}>
                                        <Heading fontSize={'2xl'} fontFamily={'body'} fontWeight={500}>
                                            { documentDescriptionsList[idx] }
                                        </Heading>
                                        {/* <Text>
                                            {`Uploaded by ${documentUploadersList[idx]}`}
                                        </Text> */}
                                        <Stack direction={'row'} align={'center'}>
                                            <a href={`${documentHash}`} target="_blank">
                                                <Button
                                                    mt={5}
                                                    w={'full'}
                                                    bg={'green.400'}
                                                    color={'white'}
                                                    rounded={'xl'}
                                                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                                    _hover={{
                                                    bg: 'green.500',
                                                    }}
                                                    _focus={{
                                                    bg: 'green.500',
                                                    }}>
                                                    View Document
                                                </Button>
                                            </a>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Center>
                        ))
                    }

                </Flex>
            </TabPanel>
        </TabPanels>
        </Tabs>

        

    )
}

export default ViewCase;