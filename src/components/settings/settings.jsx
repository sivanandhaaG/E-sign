import {useState, useEffect} from 'react'
import '../commoncss/common.css'
import {Container, Row, Col} from 'react-bootstrap'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import './settings.css'

// Import data 

import { SettingsTabs } from './settingsData'
console.log(SettingsTabs)

const Settings = () =>{
    const [key, setKey] = useState('mydetails');
    return(
        <Container fluid className='slate-blue-bg mt-5 py-2'>
            <Container className='mt-5'>
                <Row>
                    <Col lg={12} className='px-0'>
                        <p className='page-title'> Settings </p>
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={key}
                                onSelect={(k) => setKey(k)}
                                className="mb-3"
                                >
                                    {SettingsTabs.map((item)=>{
                                        const {id, eventKey, name, page, value} = item;
                                        return(
                                            <Tab key={id} eventKey={eventKey} title={name}>
                                                {page}
                                            </Tab>
                                        )
                                    })}
                            </Tabs>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default Settings