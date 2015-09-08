
Router.route('/', function () {
  this.render('Home', {data: {page: 'home'}});
});

Router.route('/users', function () {
  this.render('Users', {data: {page: 'users'}});
});

if (Meteor.isClient) {

Template.home.events({
  'submit form': function(event){
    event.preventDefault();
    var search_value = $('#search_value').val();
    $('#loading').fadeIn(1000);
    if(search_value != "")
    {
    $.ajax({ 
    type: 'GET', 
    url: 'https://api.github.com/search/repositories', 
    data: { q: search_value, page : 1, per_page : 20 }, 
    dataType: 'json',
    success: function (data) { 
      // console.log(data.items);
      $('#collection_list').empty();
      $('#heading').empty().text(data.total_count + ' Results found for '+ search_value);
      $('#loading').fadeOut(1000);
      if(data.total_count != 0){
        $.each(data.items, function(index, element) {
            $('#collection_list').append('<li class="collection-item avatar"><img src="'+ element.owner.avatar_url +'" class="circle"><span class="title">Username : <em><a href="'+ element.owner.html_url +'">'+ element.owner.login+'</a></em></span><p>Repo Link : <a href="'+ element.html_url+'">'+ element.html_url+'</a> <br><span>Clone Url :</span> <pre>'+ element.clone_url +'</pre></p></li>');
        });
      }else{
        $('#collection_list').append('<li class="collection-item">No Results Found</li>');
      }
    }
    });
  }

  }
});

Template.users.events({
  'submit form': function(event){
    event.preventDefault();
    var search_value = $('#search_value').val();
    $('#loading').fadeIn(1000);
    if(search_value != "")
    {
    $.ajax({ 
    type: 'GET', 
    url: 'https://api.github.com/search/users', 
    data: { q: search_value, page : 1, per_page : 20 }, 
    dataType: 'json',
    success: function (data) { 
      // console.log(data.items);
      $('#collection_list').empty();
      $('#heading').empty().text(data.total_count + ' Results found for '+ search_value);
      $('#loading').fadeOut(1000);
      if(data.total_count != 0){
        $.each(data.items, function(index, element) {
            $('#collection_list').append('<li class="collection-item avatar"><img src="'+ element.avatar_url +'" class="circle"><span class="title">Username : <em><a href="'+ element.html_url +'">'+ element.login+'</a></em></span><p>Score : '+ element.score +'</p></li>');
        });
        }else{
        $('#collection_list').append('<li class="collection-item">No Results Found</li>');
      }
    }
    });
  }

  }
});


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
