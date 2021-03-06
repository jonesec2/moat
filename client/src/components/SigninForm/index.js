import React from "react";
// import "../sass/style.scss";

function SigninForm({ userInfo, handleInputChange }) {
    const infoReceived = Object.keys(userInfo);
    return (
        <form>
            {infoReceived.map(formInfo => {
                return (
                    <div className="form-group" key={formInfo}>
                        <input
                            value={userInfo[formInfo]}
                            onChange={handleInputChange}
                            name={formInfo}
                            type={formInfo}
                            className="form-control"
                            id={`input${formInfo.charAt(0).toLocaleUpperCase()}${formInfo.substring(1)}`}
                            placeholder={formInfo.toLocaleLowerCase()}
                        />
                    </div>
                )
            })}

            {/* <div className="form-group">
                <input
                    value={userInfo.username}
                    onChange={handleInputChange}
                    name="username"
                    type="text"
                    className="form-control"
                    id="inputUsername"
                    placeholder="username"
                />
            </div>
            <div className="form-group">
                <input
                    value={userInfo.password}
                    onChange={handleInputChange}
                    name="password"
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    placeholder="password"
                />
            </div> */}
        </form>
    );
}

export default SigninForm;

{/* <form>
<div className="form-group">
    <input
        value={userInfo.firstName}
        onChange={handleInputChange}
        name="firstName"
        type="text"
        className="form-control"
        id="inputFirstName"
        placeholder="first name"
    />
</div>
<div className="form-group">
    <input
        value={userInfo.lastName}
        onChange={handleInputChange}
        name="lastName"
        type="text"
        className="form-control"
        id="inputLastName"
        placeholder="last name"
    />
</div>
<div className="form-group">
    <input
        value={userInfo.username}
        onChange={handleInputChange}
        name="username"
        type="text"
        className="form-control"
        id="inputUsername"
        placeholder="username"
    />
</div>
<div className="form-group">
    <input
        value={userInfo.email}
        onChange={handleInputChange}
        name="email"
        type="text"
        className="form-control"
        id="inputEmail"
        placeholder="email"
    />
</div>
<div className="form-group">
    <input
        value={userInfo.password}
        onChange={handleInputChange}
        name="password"
        type="password"
        className="form-control"
        id="inputPassword"
        placeholder="password"
    />
</div>
</form> */}