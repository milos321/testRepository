(function() {
	"use strict";

	angular
		.module('merchant-admin-app.amount')
		.controller('AmountController', AmountController);

	AmountController.$inject = ['$location','Amount','$state','$window'];
	function AmountController($location,Amount,$state,$window) {
		var ac = this;
		ac.amount = new Amount();

		Amount.get(function(response){ac.listOfAmounts = response.amounts;});

		ac.submitAmount = function(){
			$state.reload();
			ac.amount.$save(success);
		}
		function success() {
			console.log("Amount added...")
			Amount.get(function(response){ac.listOfAmounts = response.amounts;});
			ac.amount = new Amount();
		}
	}
})();