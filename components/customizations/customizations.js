app.controller("CustomizationsCtrl", function ($scope, $http, $routeParams, $sce) {
    $scope.title = $routeParams.name;
    $http.get("./components/customizations/" + $routeParams.name + "-V2.md")
        .then(function (response) {

            // $scope.codes = response.data.split(/(@Split|@split)/g).filter(Boolean);
            // $scope.documents = $scope.codes.map(str => {
            //     let matchText = str.match(/@text\s*([\s\S]*?)\s*@endtext/g);
            //     let matchCode = str.match(/@code\s*([\s\S]*?)\s*@endcode/g);
            //     let matchResult = str.match(/@result\s*([\s\S]*?)\s*@endresult/g);

            //     let sDescription = matchText && matchText.length ? matchText[0].trim() : null;
            //     let sCode = matchCode && matchCode.length ? matchCode[0].trim() : null;
            //     let sResult = matchResult && matchResult.length ? matchResult[0].trim() : null;

            //     return {
            //         description: sDescription ? sDescription.replace(/(@text|@endtext)/g, '').trim() : '',
            //         code: sCode ? sCode.replace(/(@code|@endcode)/g, '').trim() : '',
            //         result: sResult ? sResult.replace(/(@result|@endresult)/g, '').trim() : '',
            //     }
            // });

            // 1- init plugin
            var $editor = $('.mardown-editor').codeparlMarkdown({
                toolbar: false,
                help: false
            });

            $editor.codeparlMarkdown('markdownContent', response.data);

            $('.cpme-preview').show();
            $('.cpme-editor').hide();

            var html = $editor.codeparlMarkdown('htmlContent');
            $('.cpme-preview').html(html);

            hljs.highlightAll()

        });
});
