import React from 'react';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import Case from '../components/Case';
import AddNewCase from '../components/AddNewCase';

const Cases = () => {

    const cases = [
        {id: 0, title: "Case 1 Title", description: "Case 1 Description"},
        {id: 1, title: "Case 2 Title", description: "Case 2 Description"},
        {id: 2, title: "Case 3 Title", description: "Case 3 Description"},
        {id: 3, title: "Case 4 Title", description: "Case 4 Description"},
        {id: 4, title: "Case 5 Title", description: "Case 5 Description"}
    ]

    return (
        <Tabs variant='soft-rounded' isFitted colorScheme='cyan'>
        <TabList>
            <Tab>Cases</Tab>
            <Tab>Add New Case</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                {cases && cases.map((c) => (
                    <Case key={c.id}  props={c} />  
                ))}
            </TabPanel>


            <TabPanel>
                <AddNewCase />
            </TabPanel>
        </TabPanels>
        </Tabs>
    )
};

export default Cases;