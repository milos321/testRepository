var carInsurances = require(appRoot+'/controllers/car-insurance.server.controller.js');

module.exports = function(app){

app.route('/api/carInsurances')
    .get(carInsurances.list)
    .post(carInsurances.createCarInsurance);
}