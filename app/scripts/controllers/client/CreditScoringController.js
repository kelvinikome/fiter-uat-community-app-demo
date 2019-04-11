(function (module) {
    mifosX.controllers = _.extend(module, {
        CreditScoringController: function (scope, routeParams, location, resourceFactory) {
            scope.formData = {};
            scope.scoring = {};
            scope.scoringData = "{ \
                \"burrower\": { \
                    \"age\": 38, \
                    \"employment\": \"State worker\", \
                    \"dtiRatio\": 65, \
                    \"paymentIncidents\": \"Nothing\", \
                    \"monthlyIncome\": 5018.27, \
                    \"liquidatedAssets\": \"No\" \
                }, \
                \"loan\": { \
                    \"interest\": 11.46, \
                    \"amount\": 475000, \
                    \"opening\": 3, \
                    \"term\": 60, \
                    \"loanDestiny\": \"Investment\", \
                    \"annualApr\": 14 \
                }, \
                \"collateral\": { \
                    \"propertyType\": \"Any prop. for sale\", \
                    \"ltv\": 34, \
                    \"lltv\": 34, \
                    \"previousCharges\": 16.81, \
                    \"population\": 86206, \
                    \"pricePerMeterSquare\": 2393.78, \
                    \"liquidityRatio\": 8.79, \
                    \"buildingValueRatio\": 1.23, \
                    \"far\": 1249.36 \
                } \
            }";

            scope.submit = function () {
                resourceFactory.creditScoringResource.post({configurationId: 1}, scope.formData, function(data) {
                    scope.scoring = data;

                    console.log('score: ', data)
                    console.log('score: ', scope.scoring)
                });

                // resourceFactory.clientIdenfierResource.save({clientId: scope.clientId}, this.formData, function (data) {
                //     location.path('/viewclient/' + data.clientId);
                // });
            };

        }
    });
    mifosX.ng.application.controller('CreditScoringController', ['$scope', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.CreditScoringController]).run(function ($log) {
        $log.info("CreditScoringController initialized");
    });
}(mifosX.controllers || {}));

