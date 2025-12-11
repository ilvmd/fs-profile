app.controller("FeatureCtrl", function ($scope, $http, $routeParams, $location) {
    $http.get("features.json")
        .then(function (response) {
            $scope.feature = response.data.features.find(f => f.id == $routeParams.id);
            if(!$scope.feature) {
                $location.path("/");
            }

            $scope.inprgressFeatures = $scope.feature.items.flatMap(item => item.features).filter(x=>x.status == "In progress");
            $scope.complatedFeatures = $scope.feature.items.flatMap(item => item.features).filter(x=>x.status == "Complated");
        });
});
