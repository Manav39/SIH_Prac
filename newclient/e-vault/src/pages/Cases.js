import React from 'react';
import { Tabs, Tab, TabList, TabPanel, TabPanels, Heading } from '@chakra-ui/react';
import Case from '../components/Case';
import AddNewCase from '../components/AddNewCase';

import { useState, useEffect } from 'react';
import { useVault } from '../context/context';

const Cases = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [casesList, setCasesList] = useState([]);
    const { account, contract, caseCount } = useVault();

    useEffect(() => {
        const display = async() => {
           try {
                const cl = await contract.getAllCaseIdsAndNames();
                let copyData = []
                let count = parseInt(await contract.caseIdCounter())
                for(let i=0; i<count-1; i++) {
                    const name = cl[1][i]
                    const desc = cl[2][i]
                    copyData.push({id: i, Name: name, Desc: desc})
                    setCasesList(copyData)
                }
           }
           catch(err) {
                console.log(err);
           }
        }
        display();
    }, []);

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
                {casesList && casesList.map((c) => (
                    <Case key={c.id}  props={c} />  
                ))}
            </TabPanel>


            <TabPanel>
                <AddNewCase onSuccess={changeTab}/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    )
};

export default Cases;