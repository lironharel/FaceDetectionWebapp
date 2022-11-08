import express from "express";
import bcrypt from 'bcrypt'
import cors from 'cors'

//********************* Express app config ************************

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});

const database = {
    users: [
        {
            id: '0',
            name: "Liron Harel",
            email: "lironharel@gmail.com",
            password: bcrypt.hashSync("12345", 10),
            entries: 0,
            createdAt: new Date()
        },
        {
            id: '1',
            name: "Maya Gembom",
            email: "mayagembom@gmail.com",
            password: bcrypt.hashSync("maya123", 10),
            entries: 0,
            createdAt: new Date()
        }
    ]
}

//********************* Request handlers **************************

const getUserByEmailPassword = async (email, password) => {
    let userReturned; 
    let isFound = false;
    
    for (let i = 0; i < database.users.length; i++) { 
        const passwordIsCorrect = await bcrypt.compare(password, database.users[i].password);
        if(passwordIsCorrect && database.users[i].email === email){
            isFound = true;
            userReturned = database.users[i];
        }
    }

    if(!isFound) {
        throw Error("Wrong username / password");
    }
    
    return userReturned;
}

const getUserById = (id) => {
    let userReturned, isFound;
    isFound = database.users.some(user => {
        if(user.id === id){
            userReturned = user;
            return true;
        }
    });

    if(!isFound) {
        throw Error("User not found");
    }
    
    return userReturned;
}

const addUserToDB = async (name, email, password) => {
    if (database.users.some(user => (user.email === email))){
        throw new Error("User exists");
    } 
    else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: database.users.length.toString(),
            name: name,
            email: email,
            password: hashedPassword,
            createdAt: new Date(),
            entries: 0
        };

        database.users.push(newUser);

        return newUser.id;
    }
}


//************************** Routes *******************************

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await getUserByEmailPassword(email, password);
        res.json(user);
    } 
    catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
})

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userId = await addUserToDB(name, email, password);
        res.send({
            success: true,
            id: userId
        })
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message
        })
    }
})

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;

    try {
        const user = getUserById(id);
        res.json(user);
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message
        })
    } 
})

app.put('/image', (req, res) => {
    const {id} = req.body;

    try {
        const user = getUserById(id);
        user.entries++;
        res.json({entries: user.entries});
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message
        })
    } 
})
