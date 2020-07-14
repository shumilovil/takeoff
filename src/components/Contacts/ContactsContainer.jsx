import React from 'react';
import { getAllContacts } from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';
import { Contacts } from './Contacts';

export const ContactsContainer = (props) => {

    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        getAllContacts()
            .then(response => {
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
