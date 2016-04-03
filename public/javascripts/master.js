var app = angular.module('clone', ['yaru22.angular-timeago', 'ngAnimate']);
app.factory('postFactory', function($http) {
  var posts = [];
  var postClass = {};
  postClass.getInitial = function() {
    return $http.get('/posts')
    .then(function(results) {
      posts = results.data;
      for (i = 0; i < posts.count; i++) {
        posts[i].showComments = false;
        posts[i].showAddComment = false;
      }
    });
  }
  postClass.addPost = function(author, imageUrl, location, description) {
    console.log(imageUrl);
    posts.push({
      id: posts.length + 1,
      author: author,
      imageUrl: imageUrl,
      location: location,
      description: description,
      rating: 0,
      comments: [],
      date: new Date(),
    })
  }
  postClass.upVote = function(id) {
    for (i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        posts[i].rating++;
        break;
      }
    }
  }
  postClass.downVote = function(id) {
    for (i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        posts[i].rating--;
        break;
      }
    }
  }
  postClass.addComment = function(id, name, comment) {
    for (i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        posts[i].comments.push({name: name, comment: comment});
        break;
      }
    }
  }
  postClass.get = function(id) {
    if (id) {
      for (i = 0; i < posts.length; i++) {
        if (posts[i].id == id) {
          return posts[i];
        }
      }
    }
    return posts;
  }
  postClass.toggleComments = function(id) {
    for (i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        posts[i].showComments = !posts[i].showComments;
        posts[i].showAddComment = false;
      }
    }
  }
  postClass.toggleAddComment = function(id) {
    for (i = 0; i < posts.length; i++) {
      if (posts[i].id == id) {
        posts[i].showAddComment = !posts[i].showAddComment;
        posts[i].showComments = false;
      }
    }
  }
  return postClass;
})
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
