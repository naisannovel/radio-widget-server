const { validate, Station } = require('../models/radioStationModel');

// create
module.exports.createStation = async (req,res)=>{

    const { value, error } = validate(req.body);
    if(error) return res.status(400).send({ message: error.details[0].message });

    const station = new Station(value);

    try {
        const result = await station.save();
            res.status(200).send(result);
      } catch (err) {
        const error = [];
        for (field in err.errors) {
          error.push(err.errors[field].message);
        }
        res.send(error);
      }
}

// get
module.exports.fetchAllStations = async (req,res)=>{
    const result = await Station.find({});
    res.status(200).send(result);
  }

// delete station
module.exports.deleteStation = async (req,res)=>{
  const id = req.params.id;
  const result = await Station.findByIdAndDelete(id);
  if (!result) return res.status(404).send({ message: error.details[0].message });
  res.status(200).send(result);
}