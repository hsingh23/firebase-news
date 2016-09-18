(function(angular) {
  'use strict';
angular.module('ngAppDemo', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', "firebase"])
.config(function($sceProvider) {
    $sceProvider.enabled(false);
 }).controller('ngAppDemoController', function($scope, $http, $firebaseArray) {
  $scope.stories = [];
  var ref = firebase.database().ref().child("/v0");
  ref.child("/beststories").limitToFirst(5).once('value').then(function(snapshot) {
    snapshot.val().map(function(id){
      ref.child("/item/"+id.toString()).once('value').then(function(story){
        $scope.stories.push(story.val());
        $scope.$apply();
      });
    });
  });
  console.log($scope.stories);
});
})(window.angular);