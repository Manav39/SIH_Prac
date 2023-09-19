import React from 'react';
import { Tabs, Tab, TabList, TabPanel, TabPanels, Heading, Box, HStack, Flex, useColorModeValue, Spinner } from '@chakra-ui/react';
import Case from '../components/Case';
import AddNewCase from '../components/AddNewCase';
import { InfoOutlineIcon } from '@chakra-ui/icons';

import { useState, useEffect } from 'react';
import { useVault } from '../context/context';

const Cases = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [casesList, setCasesList] = useState([]);
    const { account, contract, caseCount, userType } = useVault();

    useEffect(() => {
        const fetchData = async () => {
          try {
            let cl = [];
            if (userType === "Client") {
              cl = await contract.getClientCaseIds(account);
            } else if (userType === "Judge") {
              cl = await contract.getJudgeCaseIds(account);
            } else if (userType === "Lawyer") {
              cl = await contract.getLawyerCaseIds(account);
            } else {
              cl = await contract.getAllCaseIdsAndNames();
              console.log(cl)
            }
      
            let mappedCl = []
            let tempData = []
            if(userType === "Admin") {
                let count = parseInt(await contract.caseIdCounter())
                console.log(count)
                for(let i=0; i<count-1; i++) {
                    const name = cl[1][i]
                    const desc = cl[2][i]
                    tempData.push({id: i, Name: name, Desc: desc})
                    setCasesList(tempData)
                }
            }
            else {
                mappedCl = cl.map((c) => parseInt(c));
                tempData = [];
            }
            
            for (const id of mappedCl) {
                // id starts from 0
                if(userType !== "Admin") {
                    const data = await contract.getCaseDetails(id - 1);
                    tempData.push({ id: id - 1, Name: data[0], Desc: data[1] });
                }
            }
      
            setCasesList(tempData);
            
          } catch (err) {
            console.error(err);
          }
        };

        fetchData();
      }, [userType, account, contract]);
      

    const changeTab = () => {
        setActiveTab(activeTab===0 ? 1 : 0)
    }

    return (
        
        <Tabs variant='soft-rounded' isFitted colorScheme='cyan'>
        <TabList>
            <Tab>Cases</Tab>
            <Tab>Add New Case</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>

                {
                    casesList.length === 0 && (
                    <Flex
                        minH={'100vh'}
                        align={'center'}
                        justify={'center'}
                        bg={useColorModeValue('gray.50', 'gray.800')}>
                            <Box border="2px solid cyan"  bgColor={'cyan.400'}  borderRadius="50" m={20} p={10}>
                                <HStack>
                                    <Heading>
                                        <InfoOutlineIcon/>
                                    </Heading>
                                    <Heading>
                                        You Don't Have any active Cases
                                    </Heading>
                                </HStack>
                            </Box>

                    </Flex>
                    )
                }

                {casesList && casesList.map((c) => (
                    <Case key={c.id}  props={c} />  
                ))}
            </TabPanel>


            <TabPanel>
                {
                    userType !== "Admin" && (
                    <Flex
                        minH={'100vh'}
                        align={'center'}
                        justify={'center'}
                        bg={useColorModeValue('gray.50', 'gray.800')}>
                            <Box border="2px solid cyan"  bgColor={'cyan.400'}  borderRadius="50" m={20} p={10}>
                                <HStack>
                                    <Heading>
                                        <InfoOutlineIcon/>
                                    </Heading>
                                    <Heading>
                                        You Don't Have permission to add a case
                                    </Heading>
                                </HStack>
                            </Box>

                    </Flex>
                    )
                }

                {
                    userType === "Admin" && (
                        <AddNewCase onSuccess={changeTab}/>
                    )
                }

            </TabPanel>
        </TabPanels>
        </Tabs>
    )
};

export default Cases;