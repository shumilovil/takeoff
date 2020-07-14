import React from 'react';
import './Contacts.css';
import { Contact } from './Contact';
import { addContact } from '../../api';

export const Contacts = (props) => {

    const handleUpdateContact = () => {
        addContact({ firstName: 'new', lastName: 'new', email: 'new', phone: 'new' })
    }

    return (
        <div>
            <h1>Contacts</h1>
            <button className='newContactButton' onClick={handleUpdateContact}>New contact</button>
            <div className='contacts'>
                <div className='tableHeader'>
                    <span>Firstname</span>
                    <span>Lastname</span>
                    <span>Email</span>
                    <span>Phone</span>
                </div>

                {
                    props.contacts.map(contact => {
                        return (
                            <Contact key={contact.id} contact={contact} getContactsAfterUpdate={props.getContactsAfterUpdate} />
                        )
                    })
                }
            </div>
        </div>
    )
}