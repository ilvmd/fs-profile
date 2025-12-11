app.controller("ProjectsCtrl", function ($scope, $http) {
            //     $scope.InprogressPercent = Math.round((2 / 7) * 100);
            // $scope.CompletedPercent = Math.round((5 / 7) * 100);

    $http.get("profile.json")
        .then(function (response) {
            $scope.projects = response.data.projects;
            $scope.InprogressCount = response.data.projects.filter(p => p.level == "Pending").length;
            $scope.CompletedCount = response.data.projects.filter(p => p.level == "Completed").length;
            $scope.InprogressPercent = Math.round(($scope.InprogressCount / response.data.projects.length) * 100);
            $scope.CompletedPercent = Math.round(($scope.CompletedCount / response.data.projects.length) * 100);

            console.log($scope.InprogressPercent, $scope.CompletedPercent);
            
        });
});
