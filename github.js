
Router.route('/', function () {
  this.render('Home');
});

if (Meteor.isClient) {

Template.home.events({
  'submit form': function(event){
    event.preventDefault();
    var search_value = $('#search_value').val();

    $.ajax({ 
    type: 'GET', 
    url: 'https://api.github.com/search/repositories', 
    data: { q: search_value, page : 1, per_page : 10 }, 
    dataType: 'json',
    success: function (data) { 
      console.log(data.items);
        $.each(data.items, function(index, element) {
            console.log(element);
        });
    }
    });
  }
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
