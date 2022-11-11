export const handleRegister = async (db, bcrypt) => async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const user = await addUserToDB(name, email, password, db, bcrypt);
        res.send({
            status: "ok",
            user: user
        })
    }
    catch (err) {
        res.status(400).json({
            status: "failed",
            message: "error registering user"
        })
    }
}

const addUserToDB = async (name, email, password, db, bcrypt) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    let user;
    await db.transaction(async trx => {
        try {
            await trx
            .insert({
                hash: hashedPassword,
                email: email
            })
            .into('login')

            user = await trx
            .insert({
                name: name,
                email: email,
                joined: new Date(),
                entries: 0
            })
            .into("users")
            .returning('*')
            .then(data => data[0])

            await trx.commit()

            console.log(`Transaction succeded`);

            return user;
        }
        catch (err) {
            console.log(`Transaction error when inserting to table '${err.table}': ${err.detail}`);
            await trx.rollback()
        }
    })

    if (!user){
        throw new Error('Error registering user')
    }

    return user;
}

