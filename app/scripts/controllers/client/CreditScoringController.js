(function (module) {
    mifosX.controllers = _.extend(module, {
        CreditScoringController: function (scope, routeParams, location, resourceFactory,WizardHandler) {
            scope.formData = {};
            scope.products = 
            scope.scoring = {};
            scope.configuration = null;
            scope.selectedConfiguration;
            scope.limit = {};
            scope.placeholder = {};
            scope.data = "{ \"burrower\": { \"dateOfBirth\": \"1985-02-05T23:00:00.000Z\", \"employment\": \"State worker\", \"dtiRatio\": 65, \"paymentIncidents\": \"Nothing\", \"monthlyIncome\": 5018.27, \"liquidatedAssets\": \"No\" }, \"loan\": { \"interest\": 11.46, \"amount\": 475000, \"opening\": 3, \"term\": 60, \"loanDestiny\": \"Investment\", \"annualApr\": 14 }, \"collateral\": { \"propertyType\": \"Any prop. for sale\", \"ltv\": 34, \"lltv\": 34, \"previousCharges\": 16.81, \"population\": 86206, \"touristic\": true, \"pricePerMeterSquare\": 2393.78, \"liquidityRatio\": 8.79, \"buildingValueRatio\": 1.23, \"far\": 1249.36 } }";
            scope.placeholder.employment = ["Unemployed", "Self employed", "Worker", "State worker", "Business man", "Rent basis"];
            scope.placeholder.paymentIncidents = ["Nothing", "ASNEF Services", "Financial Services", "ASNEF Financial", "Judicial Credit", "Judicial Others",
                                                    "TGSS", "AEAT"];
            scope.placeholder.liquidatedAssets = ["No", "Yes"];
            scope.placeholder.loanDestiny = ["Debt structure", "Asset liquidity", "Investment", "Refurbishing", "Divorce", "Inheritance"];
            scope.placeholder.propertyType = ["First residence", "Second house", "Any prop. for sale", "Residential rented", "Commercial", "Commercial rented",
                                                    "Building", "Building rented", "Land/plot", "Industrial building"];

            resourceFactory.loanProductResource.getAllLoanProducts(function (data) {
                scope.products = data;
            });

            scope.loanProductChange = function (configurationName) {
                resourceFactory.creditScoringConfigurationResource.getAllConfigurations({}, function (configurationList) {
                    for (let config of configurationList) {
                        if (config.name == configurationName) {
                            resourceFactory.creditScoringConfigurationResource.get({configurationId: config.id}, function (data) {
                                scope.selectedConfiguration = data;

                                for (let entry of scope.selectedConfiguration.creditScoringDataGroups) {
                                    if (entry.name == "Burrower") {
                                        scope.limit.burrower = entry.points;
                                    }
                                    if (entry.name == "Loan") {
                                        scope.limit.loan = entry.points;
                                    }
                                    if (entry.name == "Collateral") {
                                        scope.limit.collateral = entry.points;
                                    }
                                }

                                for (let entry of scope.selectedConfiguration.creditScoringVariables) {
                                    if (entry.name == "AGE") {
                                        scope.limit.age = entry.points;
                                    }
                                    if (entry.name == "EMPLOYMENT") {
                                        scope.limit.employment = entry.points;
                                    }
                                    if (entry.name == "DTI RATIO") {
                                        scope.limit.dtiRatio = entry.points;
                                    }
                                    if (entry.name == "PAYMENT INCIDENT") {
                                        scope.limit.paymentIncidents = entry.points;
                                    }
                                    if (entry.name == "MONTHLY INCOME") {
                                        scope.limit.monthlyIncome = entry.points;
                                    }
                                    if (entry.name == "ASSET THAT CAN BE LIQUIDATED") {
                                        scope.limit.liquidatedAssets = entry.points;
                                    }
                                    if (entry.name == "INTEREST") {
                                        scope.limit.interest = entry.points;
                                    }
                                    if (entry.name == "AMOUNT") {
                                        scope.limit.amount = entry.points;
                                    }
                                    if (entry.name == "TERM") {
                                        scope.limit.term = entry.points;
                                    }
                                    if (entry.name == "OPENING") {
                                        scope.limit.opening = entry.points;
                                    }
                                    if (entry.name == "LOAN DESTINY") {
                                        scope.limit.loanDestiny = entry.points;
                                    }
                                    if (entry.name == "A.P.R. (ANNUAL)") {
                                        scope.limit.annualApr = entry.points;
                                    }
                                    if (entry.name == "PROPERTY TYPE") {
                                        scope.limit.propertyType = entry.points;
                                    }
                                    if (entry.name == "LTV") {
                                        scope.limit.ltv = entry.points;
                                    }
                                    if (entry.name == "LTLV") {
                                        scope.limit.lltv = entry.points;
                                    }
                                    if (entry.name == "PREVIOUS CHARGES") {
                                        scope.limit.previouscharges = entry.points;
                                    }
                                    if (entry.name == "POPULATION") {
                                        scope.limit.population = entry.points;
                                    }
                                    if (entry.name == "PRICE M2") {
                                        scope.limit.pricePerMeterSquare = entry.points;
                                    }
                                    if (entry.name == "LIQUIDITY RATIO") {
                                        scope.limit.liquidityRatio = entry.points;
                                    }
                                    if (entry.name == "BUILDING VALUE RATIO") {
                                        scope.limit.buildingValueRatio = entry.points;
                                    }
                                    if (entry.name == "FAR") {
                                        scope.limit.far = entry.points;
                                    }
                                }
                            });
                        }
                    }
                });
            }

            scope.fetchDatagroupValue = function(name) {
                if (name == "Profile") {
                    return scope.scoring.profile;
                }
                if (name == "Risk") {
                    return scope.scoring.risk;
                }
                if (name == "Return") {
                    return scope.scoring.returnValue;
                }
                if (name == "Liquidity") {
                    return scope.scoring.liquidity;
                }
                return null;
            }

            scope.isQualification = function(min, max) {
                if ((min <= scope.scoring.qualification.min) && (max >= scope.scoring.qualification.max)) {
                    return true;
                }
                return false;
            }

            scope.submit = function () {
                resourceFactory.creditScoringResource.post({configurationId: scope.selectedConfiguration.id}, scope.formData, function(data) {
                // resourceFactory.creditScoringResource.post({configurationId: 1}, scope.data, function(data) {
                    scope.scoring = data;
                });
            };

            scope.goNext = function(form){
                WizardHandler.wizard().checkValid(form);
                scope.isClicked = true;
            }

        }
    });
    mifosX.ng.application.controller('CreditScoringController', ['$scope', '$routeParams', '$location', 'ResourceFactory', 'WizardHandler', mifosX.controllers.CreditScoringController]).run(function ($log) {
        $log.info("CreditScoringController initialized");
    });
}(mifosX.controllers || {}));

