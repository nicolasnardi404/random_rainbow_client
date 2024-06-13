

export default function SignInForm() {

    return (
        <div className="mb-5">
            <form className="group-form" >
                <label>Name:</label>
                <input className="input-form" type="text" name="name"/>
                <br></br>
                <label>Password:</label>
                <input className="input-form" type="password" name="password"/>
                <br></br>
                <label>First Name:</label>
                <input className="input-form" type="text" name="firstName"/>
                <br></br>
                <label>Last Name:</label>
                <input className="input-form" type="text" name="lastName"/>
                <br></br>
                <label>Email:</label>
                <input className="input-form" type="email" name="email"/>
                <br></br>
                <input type="submit" value="LOG IN" />
            </form>
        </div>
    );
}
