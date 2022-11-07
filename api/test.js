const items = [
    {id: 0},
    {id: 1}
]

const f = () => {
    return items.some((item, index) => {
        console.log("foreach, iteration:", index)
        if (item.id === 0){
            return true;
        }
    });

}

console.log(f());