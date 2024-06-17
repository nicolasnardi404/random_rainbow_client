import { useHistory } from 'react-router-dom';

export default function SignInForm() {
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission

        // Here, you would typically send the form data to your server
        // For demonstration purposes, we'll just simulate a successful submission
        console.log('Submitting form...');

        // After successful submission, redirect to the new endpoint
        history.push('/email-verification-sent');
    };

    return (
        <div className="mb-5">
            <form className="group-form" onSubmit={handleSubmit}>
                <label>Username:</label>
                <input className="input-form" type="text" name="name" required />
                <br></br>
                <label>Password:</label>
                <input className="input-form" type="password" name="password" required />
                <br></br>
                <label>First Name:</label>
                <input className="input-form" type="text" name="firstName" required />
                <br></br>
                <label>Last Name:</label>
                <input className="input-form" type="text" name="lastName" required />
                <br></br>
                <label>Email:</label>
                <input className="input-form" type="email" name="email" required />
                <br></br>
                <input type="submit" value="SIGN IN" />
            </form>
        </div>
    );
}
