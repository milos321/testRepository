(function() {
	"use strict";

	angular
		.module('merchant-admin-app.car-insurance-service')
		.factory('CarInsuranceService', CarInsuranceService);

	CarInsuranceService.$inject = ['$resource'];
	function CarInsuranceService($resource) {
		var collectionName = "carInsuranceServices";
		return $resource("https://agile-garden-53100.herokuapp.com/api/:collectionName/:carInsuranceServiceId",
			{ carInsuranceServiceId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();