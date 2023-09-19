import React, { useEffect, useState } from "react";
import { useVault } from "../context/context";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Center,
  HStack,
  Flex,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { InfoOutlineIcon } from "@chakra-ui/icons";

const Dashboard = (props) => {
  const { account, contract, userType } = useVault();
  const navigate = useNavigate();
  const [numberOfCases, setNumberOfCases] = useState(0);
  const [numberOfDocuments, setNumberOfDocuments] = useState(0);

  const goToCases = () => {
    navigate("/Cases");
  };

  useEffect(() => {
    console.log("Account : ", account);
    console.log("Contract : ", contract);
    console.log("User Type : ", userType);

    const getDetails = async() => {
      let cl = []
      if (userType === "Client") {
        cl = await contract.getClientCaseIds(account);
      } else if (userType === "Judge") {
        cl = await contract.getJudgeCaseIds(account);
      } else if (userType === "Lawyer") {
        cl = await contract.getLawyerCaseIds(account);
      } else {
        cl = await contract.getAllCaseIdsAndNames();
      }
      
      if(userType === "Admin") {
        setNumberOfCases(cl.length - 1)
      }
      else {
        setNumberOfCases(cl.length)
      }
    }
    getDetails();

  }, []);
  
  return (
    <HStack align={"center"} justify={"center"}>
      
      {
        userType === "" && (
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
                                Please Contact the Admin to add you as a new member
                            </Heading>
                        </HStack>
                    </Box>

            </Flex>
        )
      }

      {
        userType !== "" && (
          <Card maxW="sm" align="center">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1589216532372-1c2a367900d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3" align="center">
                <Heading size="md">Number of Cases </Heading>

                <Text color="blue.600" fontSize="2xl">
                  {numberOfCases}
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <ButtonGroup spacing="2">
                <Button variant="solid" colorScheme="blue" onClick={goToCases}>
                  View Cases
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        )
      }

      {/* <Card maxW="sm" align="center">
        <CardBody>
          <Image
            src="https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3" align="center">
            <Heading size="md">Number of Documents </Heading>

            <Text color="blue.600" fontSize="2xl">
              {numberOfDocuments}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue" onClick={goToCases}>
              View Documents
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card> */}
    </HStack>
  );
};

export default Dashboard;
