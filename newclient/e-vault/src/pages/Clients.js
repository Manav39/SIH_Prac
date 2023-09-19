import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import Case from '../components/Case';
import AddNewCase from '../components/AddNewCase';
import { useEffect } from 'react';
import Judge from '../components/Judge';
import AddNewJudge from '../components/AddNewJudge';
import Lawyer from '../components/Lawyer';
import AddNewLawyer from '../components/AddNewLawyer';
import Client from '../components/Client';
import AddNewClient from '../components/AddNewClient';

import { useVault } from '../context/context';

const Clients = () => {

    const [clientList, setClientList] = useState([]);
    const { account, contract } = useVault();

    const [activeTab, setActiveTab] = useState(0);

    const changeTab = () => {
        setActiveTab(activeTab===0 ? 1 : 0)
    }

    useEffect(() => {
        const display = async() => {
           try {
                const cl = await contract.getClientList();
                const copyData = []
                for(let i=0; i<cl.length; i++) {
                    const address = cl[i][0]
                    const name = cl[i][1]
                    copyData.push({Name: name, Address: address})
                }
                setClientList(copyData)
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
            <Tab>Clients</Tab>
            <Tab>Add New Client</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                {clientList && clientList.map((c) => (
                    <Client key={c.id}  props={c}/>
                ))}
            </TabPanel>


            <TabPanel>
                <AddNewClient onSuccess={changeTab}/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    )
};

export default Clients;