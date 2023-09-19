import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanel, TabPanels } from '@chakra-ui/react';
import Case from '../components/Case';
import AddNewCase from '../components/AddNewCase';
import { useEffect } from 'react';
import Judge from '../components/Judge';
import AddNewJudge from '../components/AddNewJudge';

import { useVault } from '../context/context';

const Judges = () => {

    const [judgeList, setJudgeList] = useState([]);
    const { account, contract } = useVault();

    const [activeTab, setActiveTab] = useState(0);

    const changeTab = () => {
        setActiveTab(activeTab===0 ? 1 : 0)
    }

    useEffect(() => {
        const display = async() => {
           try {
                const jl = await contract.getJudgeList();
                const copyData = []
                for(let i=0; i<jl.length; i++) {
                    const address = jl[i][0]
                    const name = jl[i][1]
                    copyData.push({Name: name, Address: address})
                }
                setJudgeList(copyData)
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
            <Tab>Judges</Tab>
            <Tab>Add New Judge</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                {judgeList && judgeList.map((j) => (
                    <Judge key={j.id}  props={j}/>
                ))}
            </TabPanel>


            <TabPanel>
                <AddNewJudge onSuccess={changeTab}/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    )
};

export default Judges;