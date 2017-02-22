angular.module('starter', ['ionic', 'ngCordova'])
.controller('FileOpenCtrl', ['$scope', '$cordovaFile', '$cordovaFileOpener2', function($scope, $cordovaFile, $cordovaFileOpener2) {
    $scope.openPDF = function(){
        var externalPath = cordova.file.externalDataDirectory; // External location
        var appDirectoryPath = cordova.file.applicationDirectory; // App directory
        var localPathOfFile = appDirectoryPath + "www/files"; //Directory of pdf file
        $cordovaFile.checkFile(externalPath, "Ionic.pdf")
             .then(function (success) {
                    console.log("File already exists in external directory "+ externalPath)
                    $cordovaFileOpener2.open(externalPath + "Ionic.pdf",'application/pdf').
                                        then(function() {
                                           // file opened successfully
                                           console.log('Success in opening file from external path '+ externalPath);
                                       }, function(error) {
                                           // An error occurred. Show a message to the user
                                           console.log('Failed in opening the file from external path ' + externalPath + 'Error is '+ err.message);
                                       });
             }, function (error) {
                    $cordovaFile.copyFile(localPathOfFile, "Ionic.pdf", externalPath, "Ionic.pdf")
                          .then(function (success) {
                            console.log("Success in copying file from " + localPathOfFile + " to " + externalPath);
                            $cordovaFileOpener2.open(externalPath + "Ionic.pdf",'application/pdf').
                                                                    then(function() {
                                                                       // file opened successfully
                                                                       console.log('Success in opening the file from external path ' + externalPath +'after copying from ');
                                                                   }, function(err) {
                                                                       // An error occurred. Show a message to the user
                                                                       console.log('Failed in opening the file from external path '+ externalPath + ". Error is " + err.message);
                                                                   });
                            // success
                          }, function (error) {
                             console.log("Failed in copying file from " + localPathOfFile + " to " + externalPath + ". Error is " + error.message);
                          });
             });
    }
}]);
