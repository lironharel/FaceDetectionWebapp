import React, {Component} from "react";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    updateEmailState = (e) => {
        this.setState({email: e.target.value, error: ""})
    }

    updatePasswordState = (e) => {
        this.setState({password: e.target.value, error: ""})
    }

    signIn = () => {
        fetch('https://frozen-crag-50039.herokuapp.com/signin', {
            method: "post",
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(res => res.json())
        .then((data) => {
            if(data.user) {
                this.props.loadUser(data.user);
                this.props.setRoute('home');
            } else if (data.error) {
                this.setState({ error: data.error });
            }
        })
        .catch(() => this.setState({ error: 'unable to sign in' }))
    }
    
    render() {
        const {setRoute} = this.props;

        return (
            <article className="card br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0 center">Sign In</legend>
                            <div className="mt3">
                                <label
                                    className="db fw6 lh-copy f6"
                                    htmlFor="email-address"
                                    >
                                    Email
                                </label>
                                <input
                                    onChange={this.updateEmailState}
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
                                    onChange={this.updatePasswordState}
                                    className="border-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                    type="password"
                                    name="password"
                                    id="password"
                                    />
                            </div>
                        </fieldset>
                        {this.state.error && (
                            <div className="mt2 red center">{this.state.error}</div>
                        )}
                        <div className="center">
                            <input
                                onClick={this.signIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Sign in"
                                />
                        </div>
                        <div className="lh-copy mt3 center">
                            <p onClick={() => setRoute('register')} className="f6 link dim black db pointer">
                                Register
                            </p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
};

export default Signin;
