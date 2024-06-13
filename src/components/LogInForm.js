export default function LogInForm(){
    return (
        <form>
            <label className="group-form">
                Name:
                <input className="input-form" type="text" name="name" />
                <br></br>
                Password:
                <input className="input-form" type="text" name="name" />
            </label>
            <br></br>
            <input type="submit" value="LOG IN" />
        </form>
    )
}