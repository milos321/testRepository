(function() {
	"use strict";

	angular
		.module('merchant-admin-app.amount')
		.factory('Amount', Amount);

	Amount.$inject = ['$resource'];
	function Amount($resource) {
		var collectionName = "amounts";
		return $resource("https://agile-garden-53100.herokuapp.com/api/:collectionName/:amountId",
			{ amountId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();