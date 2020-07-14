import React from 'react';
import './Contacts.css';
import { useState } from 'react';
import { useFormik } from 'formik';
import { updateContact } from '../../api';

export const Contact = (props) => {

    const [editMode, setEditMode] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: props.contact.firstName,
            lastName: props.contact.lastName,
            email: props.contact.email,
            phone: props.contact.phone
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            updateContact(props.contact.id, values.firstName, values.lastName, values.email, values.phone)
                .then(() => { setEditMode(false) })
                .then(() => { props.getContactsAfterUpdate() })



        }
    });

    const handleCancelEdit = () => {
        formik.handleReset();
        setEditMode(false);
    }

    return (
        <div className='contactWrapper'>
            

            {
                editMode ?
                    <form onSubmit={formik.handleSubmit}>
                        <span>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                        </span>
                        <span>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                            />
                        </span>
                        <span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                        </span>
                        <span>
                            <input
                                id="phone"
                                name="phone"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                            />
                        </span>
                        <button type="submit" className='submitButton'>Submit</button>
                    </form>

                    :
                    <div className='singleContact'>
                        <span>{props.contact.firstName}</span>
                        <span>{props.contact.lastName}</span>
                        <span>{props.contact.email}</span>
                        <span>{props.contact.phone}</span>
                    </div>
            }

            {
                !editMode
                    ? <button onClick={() => { setEditMode(true) }} className='editButton'>edit</button>
                    : <button onClick={handleCancelEdit} className='cancelButton'>cancel</button>
            }

            <button className='deleteButton'>delete</button>

        </div>
    )
}