const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const { createStation, fetchAllStations, deleteStation } = require('../controllers/radioStationController');


router.route('/station')
    .get(fetchAllStations)
    .post(authorize, createStation)

router.route('/station/:id')
    // .put()
    .delete(authorize,deleteStation)

module.exports = router;