import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import Case from '../components/Case';
import AddNewCase from '../components/AddNewCase';
import { useEffect } from 'react';
import Judge from '../components/Judge';
import AddNewJudge from '../components/AddNewJudge';
import Lawyer from '../components/Lawyer';
import AddNewLawyer from '../components/AddNewLawyer';

import { useVault } from '../context/context';

const Lawyers = () => {

    const [lawyerList, setLawyerList] = useState([]);
    const { account, contract } = useVault();

    const [activeTab, setActiveTab] = useState(0);

    const changeTab = () => {
        setActiveTab(activeTab===0 ? 1 : 0)
    }

    useEffect(() => {
        const display = async() => {
           try {
                const ll = await contract.getLawyerList();
                const copyData = []
                for(let i=0; i<ll.length; i++) {
                    const address = ll[i][0]
                    const name = ll[i][1]
                    copyData.push({Name: name, Address: address})
                }
                setLawyerList(copyData)
           }
           catch(err) {
                console.log(err);
           }
        }
        display();
    }, []);

    return (
        <Tabs variant='soft-rounded' isFitted colorScheme='cyan' index={activeTab} onChange={changeTab}>
        <TabList>
            <Tab>Lawyers</Tab>
            <Tab>Add New Lawyer</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                {lawyerList && lawyerList.map((l) => (
                    <Lawyer key={l.id}  props={l}/>
                ))}
            </TabPanel>


            <TabPanel>
                <AddNewLawyer onSuccess={changeTab}/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    )
};

export default Lawyers;