var app = angular.module('clone', ['yaru22.angular-timeago']);
app.factory('postFactory', function() {
  var posts = [
    {
      id: 1,
      author: 'Ben Hernandez',
      imageUrl: 'http://apod.nasa.gov/apod/image/1512/20151221LulworthCove-reKotsiopoulos.jpg',
      location: 'Otherworld, Milky Way',
      rating: 10,
      description: 'Hi omnes lingua, institutis, legibus inter se differunt. Unam incolunt Belgae, aliam Aquitani, tertiam. Plura mihi bona sunt, inclinet, amari petere vellent. Phasellus laoreet lorem vel dolor tempus vehicula.',
      comments: [
        {name: 'Ernie', comment: 'Quae vero auctorem tractata ab fiducia dicuntur. Paullum deliquit, ponderibus modulisque suis ratio utitur.',},
        {name: 'Ann', comment: 'Prima luce, cum quibus mons aliud consensu ab eo. Cum sociis natoque penatibus et magnis dis parturient. Cras mattis iudicium purus sit amet fermentum.',},
        {name: 'Rik', comment: 'Sed haec quis possit intrepidus aestimare tellus.',},
      ],
      date: '2016-03-31 15:35:16',
    },
    {
      id: 2,
      author: 'Chubby',
      imageUrl: 'http://i.dailymail.co.uk/i/pix/2015/09/28/08/2CD1E26200000578-0-image-a-312_1443424459664.jpg',
      location: 'Yellowstone National Park',
      rating: 0,
      description: 'Unam incolunt Belgae, aliam Aquitani, tertiam. Fictum, deserunt mollit anim laborum astutumque! Morbi odio eros, volutpat ut pharetra vitae, lobortis sed nibh. Quid securi etiam tamquam eu fugiat nulla pariatur. Quam temere in vitiis, legem sancimus haerentia.',
      comments: [
        {name: 'Mary', comment: 'Gallia est omnis divisa in partes tres, quarum. Donec sed odio operae, eu vulputate felis rhoncus.',},
      ],
      date: '2016-02-25 07:30:11',
    },
    {
      id: 3,
      author: 'AlphaKaiForever',
      imageUrl: 'http://www.sbs.com.au/news/sites/sbs.com.au.news/files/1-01-2016_2-21-55_pm_0.jpg',
      location: 'New York, NY',
      rating: -3,
      description: 'Ut enim ad minim veniam, quis nostrud exercitation. Phasellus laoreet lorem vel dolor tempus vehicula. Petierunt uti sibi concilium totius Galliae in diem certam indicere.',
      comments: [
        {name: 'Ben', comment: 'Quae vero auctorem tractata ab fiducia dicuntur. Paullum deliquit, ponderibus modulisque suis ratio utitur.',},
        {name: 'Max', comment: 'Prima luce, cum quibus mons aliud consensu ab eo. Cum sociis natoque penatibus et magnis dis parturient. Cras mattis iudicium purus sit amet fermentum.',},
        {name: 'Jeff', comment: 'Sed haec quis possit intrepidus aestimare tellus.',},
      ],
      date: '2016-03-31 15:35:16',
    },
  ]
  for (i = 0; i < posts.count; i++) {
    posts[i].showComments = false;
    posts[i].showAddComment = false;
  }
  var postClass = {};
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
  $scope.posts = $scope.postClass.get();
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
