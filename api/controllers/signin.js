export const handleSignIn = async (db, bcrypt) => async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await getUserByEmailPassword(email, password, db, bcrypt);
        res.json({
            status: "ok",
            user: user
        });
    } 
    catch (err) {
        console.log(err)
        res.status(400).json({
            status: "failed",
            error: 'invalid credentials'
        })
    }
}

export const getUserByEmailPassword = async (email, password, db, bcrypt) => {
    const loginTableUser = await db
    .select('*')
    .from('login')
    .where('email', '=', email)
    .then(data => data[0])

    if(!loginTableUser) {
        throw new Error('No user found corresponding to the email entered');
    }
    
    const passwordIsValid = await bcrypt.compare(password, loginTableUser.hash);

    if (!passwordIsValid) {
        throw new Error('invalid credentials');
    }

    const user = await db
    .select('*')
    .from('users')
    .where('email', '=', email)
    .then(data => data[0])

    return user;
}
