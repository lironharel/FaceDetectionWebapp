export const handleImage = async (db) => async (req, res) => {
    const {id} = req.body;

    try {
        const entries = await incrementUserEntries(id, db)
        res.json({
            status: "ok",
            entries: entries
        }); 
    }
    catch (err) {
        console.log("Error updating user entries:", err.detail)
        res.status(400).send({
            status: "failed",
            message: "error updating user entries"
        })
    } 
}

const incrementUserEntries = async (userId, db) => {
    return await db('users')
    .where('id', '=', userId)
    .increment('entries', 1)
    .returning('entries')
    .then(data => data[0].entries)
}