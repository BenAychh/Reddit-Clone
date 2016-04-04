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
