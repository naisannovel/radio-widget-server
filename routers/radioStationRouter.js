const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const { createStation, fetchAllStations, deleteStation, updateStation } = require('../controllers/radioStationController');


router.route('/station')
    .get(fetchAllStations)
    .post(authorize, createStation)

router.route('/station/:id')
    .put(authorize, updateStation)
    .delete(authorize,deleteStation)

module.exports = router;