app.controller("CoursesCtrl", function ($scope, $http) {
    $http.get("profile.json")
        .then(function (response) {
            $scope.courses = response.data.courses;
            $scope.coursesGroup = groupBy($scope.courses, x => x.flag);
            console.log($scope.coursesGroup);
        });
});

function groupBy(arr, selector) {
    return arr.reduce((acc, item) => {
        const key = typeof selector === 'function'
            ? selector(item)
            : item[selector];

        if (!acc[key]) acc[key] = [];
        acc[key].push(item);

        return acc;
    }, {});
}
