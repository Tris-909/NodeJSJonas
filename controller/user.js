const fs = require('fs');
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));

// HANDLER
exports.getUsers = (req, res) => {
    res.status(200).send(users);
}
exports.createUser = () => {};
exports.getSingleUser = () => {};
exports.changeAUserInfo = () => {};
exports.deleteAUser = () => {};
