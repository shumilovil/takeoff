import React from 'react';
import './Contacts.css';
import { Contact } from './Contact';
import { addContact } from '../../api';
import { useState } from 'react';
import { useFormik } from 'formik';
import { useEffect } from 'react';

export const Contacts = (props) => {

    const [isAddingMode, setAddingMode] = useState(false);
    const [searchOption, setSearchOption] = useState('firstName');


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            search: ''
        },
        onSubmit: values => {
            addContact({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone
            })
                .then(() => { props.getContactsAfterUpdate() })
                .then(() => { setAddingMode(false) })
        }
    });


    const handleCancelEdit = () => {        
        setAddingMode(false);
    }

    useEffect(() => {
        formik.handleReset();
    }, [isAddingMode])

    return (
        <div>
            <h1>Contacts</h1>
            <div className='searchInput'>
                <input
                    id="search"
                    name="search"
                    type="text"
                    placeholder='search'
                    onChange={formik.handleChange}
                    value={formik.values.search}
                />
            </div>
            <div className='searchOptions'>
                <span className={searchOption === 'firstName' ? 'searchOption chosen' : "searchOption"}
                    onClick={() => { setSearchOption('firstName') }}>firstName</span>
                <span className={searchOption === 'lastName' ? 'searchOption chosen' : "searchOption"}
                    onClick={() => { setSearchOption('lastName') }}>lastName</span>
                <span className={searchOption === 'email' ? 'searchOption chosen' : "searchOption"}
                    onClick={() => { setSearchOption('email') }}>email</span>
                <span className={searchOption === 'phone' ? 'searchOption chosen' : "searchOption"}
                    onClick={() => { setSearchOption('phone') }}>phone</span>
            </div>
            <div className='contacts'>
                {
                    isAddingMode ?
                        <div className='contactWrapper addingContact'>
                            <form onSubmit={formik.handleSubmit}>
                                <span>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder='firstName'
                                        onChange={formik.handleChange}
                                        value={formik.values.firstName}
                                    />
                                </span>
                                <span>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder='lastName'
                                        onChange={formik.handleChange}
                                        value={formik.values.lastName}
                                    />
                                </span>
                                <span>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder='email'
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                                </span>
                                <span>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder='phone'
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                    />
                                </span>
                                <button type="submit" className='submitButton'>Add</button>
                            </form>
                            <button className='cancelButton' onClick={handleCancelEdit}>cancel</button>
                        </div>
                        : null
                }
                {
                    isAddingMode ?
                        null :
                        <button className='newContactButton' onClick={() => { setAddingMode(true) }}>New contact</button>
                }
                <div className='tableHeader'>
                    <span>Firstname</span>
                    <span>Lastname</span>
                    <span>Email</span>
                    <span>Phone</span>
                </div>

                {
                    props.contacts.map(contact => {
                        if (contact.firstName[searchOption].toLowerCase().includes(formik.values.search.toLowerCase())) {
                            return (
                                <Contact key={contact.id} id={contact.id} contact={contact.firstName} getContactsAfterUpdate={props.getContactsAfterUpdate} />
                            )
                        }

                    })
                }
            </div>
        </div>
    )
}