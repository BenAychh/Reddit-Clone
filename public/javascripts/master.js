var app = angular.module('clone', []);
app.factory('postFactory', function() {
  var posts = [
    {
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
  var postClass = {};
  postClass.addPost = function(author, imageUrl, location, description) {
    posts.push({
      author: author,
      imageUrl: imageUrl,
      loation: location,
      rating: 0,
      comments: [],
      date: new Date(),
    })
  }
  postClass.upVote = function(postNumber) {
    posts[postNumber].rating++;
  }
  postClass.downVote = function(postNumber) {
    posts[postNumber].rating--;
  }
  postClass.addComment = function(postNumber, name, comment) {
    posts[postNumber].comments.push({name: name, comment: comment});
  }
  postClass.get = function(postNumber) {
    if (postNumber) {
      return posts[postNumber];
    }
    return posts;
  }
  return postClass;
})
app.controller('thePosts', function($scope, postFactory) {
  $scope.posts = postFactory.get();
})
