app.controller('thePosts', function($scope, postFactory) {
  $scope.postClass = postFactory;
  $scope.postClass.getInitial()
  .then(function () {
    $scope.posts = $scope.postClass.get();
  });

  $scope.reverseSort = false;
  $scope.showAddPost = false;
  $scope.flipSort = function() {
    $scope.reverseSort = !$scope.reverseSort;
  }
  $scope.fileChanged = function(element) {
    var photofile = element.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      $scope.$apply(function() {
        $scope.prevImg = e.target.result;
      });
    };
    reader.readAsDataURL(photofile);
  };
  $scope.clearForm = function(blah) {
    console.log(blah);
  }
});
