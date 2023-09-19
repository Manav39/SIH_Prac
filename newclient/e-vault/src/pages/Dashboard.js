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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

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
      setNumberOfCases(parseInt(await contract.caseIdCounter()))
    }
    getDetails();

  }, []);
  
  return (
    <HStack align={"center"} justify={"center"}>
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
              {numberOfCases - 1}
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

      <Card maxW="sm" align="center">
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
      </Card>
    </HStack>
  );
};

export default Dashboard;
