app.controller("CustomizationsCtrl", function ($scope, $http, $routeParams, $sce) {
    $scope.title = $routeParams.name;
    $http.get("./components/customizations/" + $routeParams.name + ".md")
        .then(function (response) {

            $scope.codes = response.data.split(/(@Split|@split)/g).filter(Boolean);
            $scope.documents = $scope.codes.map(str => {
                let matchText = str.match(/@text\s*([\s\S]*?)\s*@endtext/g);
                let matchCode = str.match(/@code\s*([\s\S]*?)\s*@endcode/g);

                let description = matchText && matchText.length ? matchText[0].trim() : null;
                let code = matchCode && matchCode.length ? matchCode[0].trim() : null;

                console.log("description :: ", description);
                console.log("code :: ", code);
                
                return {
                    text: description ? description.replace(/(@text|@endtext)/g, '').trim() : '',
                    code: code ? code.replace(/(@code|@endcode)/g, '').trim() : ''
                }
            });

        });
});
