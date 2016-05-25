/**
 * Created by Karen on 01-05-2016.
 */
(function(){
    "use strict";

    //Define module
    angular
        .module("app.uploadProducts", [])
        .controller("uploadProductsController", uploadProductsController);

    //Define controller
    function uploadProductsController($scope, Upload, $location, $timeout)
    {
        $scope.title = "Importer produkter";

        $scope.uploadProducts = function() {
            if ($scope.form.file.$valid && $scope.file) {
                upload($scope.file);
            }
        };

        // upload on file select
        function upload(file) {
            file.upload = Upload.upload({
                url: '/upload/products',
                method: 'POST',
                file: file
            });

            file.upload.then(function (response) {
                $timeout(function () {
                    $scope.result = response.data;
                    console.log($scope.result);
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                    evt.loaded / evt.total));
            });
        };
    }
}());