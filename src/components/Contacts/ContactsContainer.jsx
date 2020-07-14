import React from 'react';
import { getAllContacts } from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';
import { Contacts } from './Contacts';

export const ContactsContainer = (props) => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        console.log('Use1');
        getAllContacts()
            .then(response => {
                console.log(response.data)
                setContacts(response.data)
            })
    }, []);

    const getContactsAfterUpdate = () => {        
        getAllContacts().then(response => {
            setContacts(response.data)
        })
    }

    return <Contacts contacts={contacts} getContactsAfterUpdate={getContactsAfterUpdate}/>
}
