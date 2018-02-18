const path = require('path');
const fs = require('fs');
const _ = require('lodash');

const errorLog = path.join(__dirname, `../logs/errorLog.json`);
const sucessLog = path.join(__dirname, `../logs/successLog.json`);

exports.error = (data) => {
  const { image, message, alprData, alprData: { epoch_time }} = data;
  console.log('Plate: ', message, alprData);

  const imagePath = path.join(__dirname, `../public/images/image-${epoch_time}.jpg`);

  fs.writeFile(imagePath, image, () => {
    fs.readFile(errorLog, (err, fsData) => {
      let fileData = JSON.parse(fsData);
      const timestamp = getTimestamp();

      const newData = {
        image: `/images/image-${epoch_time}.jpg`,
        message,
        ..._.pick(alprData, ['epoch_time', 'processing_time_ms']),
      }
      fileData[timestamp] = updateData(fileData, timestamp, newData);

      fs.writeFileSync(errorLog, JSON.stringify(fileData, null, 2));
    })
  })
}


exports.success = (data) => {
  fs.readFile(sucessLog, (err, fsData) => {
    let fileData = JSON.parse(fsData);
    const timestamp = getTimestamp();
    data.data = _.pick(data.data, ['epoch_time', 'processing_time_ms', 'results']);
    data.data.results = _.pick(data.data.results, ['plate', 'confidence', 'processing_time_ms', 'candidates'])
    fileData[timestamp] = updateData(fileData, timestamp, data);


    fs.writeFileSync(sucessLog, JSON.stringify(fileData, null, 2));
  })
}




function getTimestamp() {
  const date = new Date;
  const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return timestamp;
}

function updateData(fileData, timestamp, newData) {
  if (fileData[timestamp]) {
    return [...fileData[timestamp], newData];
  } else {
    return [newData];
  }
}
