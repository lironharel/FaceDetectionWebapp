import React, {Component} from "react";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    updateStateName = (e) =>{
        this.setState({name: e.target.value});
    }

    updateStateEmail = (e) =>{
        this.setState({email: e.target.value});
    }

    updateStatePassword = (e) =>{
        this.setState({password: e.target.value});
    }

    register = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.user) {
                this.props.loadUser(data.user)
                this.props.setRoute('home')
            }
        })
    }

    render() {
        return (
            <article className="card br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 center">Register</legend>
                            <div className="mt3">
                                <label
                                    className="db fw6 lh-copy f6"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    onChange={this.updateStateName}
                                    className="border-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="text"
                                    name="name"
                                    id="name"
                                />
                            </div>
                            <div className="mt3">
                                <label
                                    className="db fw6 lh-copy f6"
                                    htmlFor="email-address"
                                >
                                    Email
                                </label>
                                <input
                                    onChange={this.updateStateEmail}
                                    className="border-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    onChange={this.updateStatePassword}
                                    className="border-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                />
                            </div>
                        </fieldset>
                        <div className="center">
                            <input
                                onClick={this.register}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"
                            />
                        </div>
                        <div className="lh-copy mt3 center">
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default Register;
