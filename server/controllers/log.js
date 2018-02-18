const path = require('path');
const fs = require('fs');


exports.log = (req, res) => {
  const file = path.join(__dirname, `../logs/${req.params.path}Log.json`)
  fs.readFile(file, (err, fsData) => {
    res.send(JSON.parse(fsData));
  })
}
