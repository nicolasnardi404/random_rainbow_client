import React from 'react';
import { useHistory } from 'react-router-dom';

export default function LogInForm() {
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault(); 
        history.push('/videos');
    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="group-form">
                Name:
                <input className="input-form" type="text" name="name" />
                <br></br>
                Password:
                <input className="input-form" type="password" name="password" />
            </label>
            <br></br>
            <input type="submit" value="LOG IN" />
        </form>
    );
}
