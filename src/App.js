import React, { useState } from 'react';
import './App.css';
import { ContactsContainer } from './components/Contacts/ContactsContainer';
import { Login } from './components/Login/Login';
import { authorise } from './api';

function App() {

    const [isAuthorised, setAuthorisation] = useState(true);

    const handleAuthorisation = (formValues) => {
        authorise().then(response => {
            if (formValues.email === response.data.email && formValues.password === response.data.password) {
                setAuthorisation(true);
            } else {
                alert('Wrong email or password! Try again!')
            }
        })

    }

    return (
        <div className="App">
            {isAuthorised ? <ContactsContainer /> : <Login handleAuthorisation={handleAuthorisation} />}
        </div>
    );
}

export default App;
