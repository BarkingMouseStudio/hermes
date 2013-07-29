(function() {
  var signupTemplate = _.template($('#signup-template').html());
  var $signups = $('.signups');

  var signups = new IDBStore({
    storeName: 'signups',
    keyPath: 'id',
    indexes: [{
      name: 'email',
      keyPath: 'email',
      unique: true,
      multiEntry: false
    }],
    onStoreReady: function(){
      signups.getAll(function(data) {
        console.log(data);
      });
    }
  });

  var $signups = $('.signups-page');

  var $email = $('.email');
  $('.signup').on('click', function(e) {
    var email = $email.val();
    if (email === 'password') {
      $signups.show();
      return;
    }
    signups.put({
      email: email
    });
    $email.val('');
  });

  $('.close').on('click', function(e) {
    e.preventDefault();
    $signups.hide();
  })

  var $wifi = $('.wifi').toggleClass('connected', navigator.onLine);
  $(window).on('online', function(e) {
    $wifi.addClass('connected');
  }).on('offline', function(e) {
    $wifi.removeClass('connected');
  });

}).call(this);
