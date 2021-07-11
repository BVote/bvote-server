const b = require("bcrypt");



const compute = async () => {
    const one = await b.hash("toto", 10);
    const two = await b.hash("toto", 10);
    console.log(one);
    console.log(two);
}

compute();