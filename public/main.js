(function() {

  var signups = new IDBStore({
    dbVersion: 1,
    storeName: 'signups',
    keyPath: 'id',
    autoIncrement: true,
    indexes: {
      name: 'email',
      keyPath: 'email',
      unique: true,
      multiEntry: false
    },
    onStoreReady: function(){
      console.log('Store ready!');

      customers.iterate(function() {
        console.log('Item', arguments);
      }, {
        index: 'email',
        keyRange: IDBKeyRange,
        order: 'ASC',
        filterDuplicates: false,
        writeAccess: false,
        onEnd: function() {
          console.log('End', arguments);
        },
        onError: function(err) {
          console.error(err);
        }
      });
    }
  });

  var $email = $('#email');
  $('#sigunp').on('click', function(e) {
    signups.put({
      email: $email.val()
    }, function(id) {
      console.log("Success!", id);
    }, function(err) {
      console.error(err);
    });
    $email.val('');
  });

  signups.getAll(function(data) {
    console.log(data):
  }, function(err) {
    console.error(err);
  });

  // customers.clear(onsuccess, onerror);

  var $offline = $('#offline')
    .toggle(!navigator.onLine);

  $(window).on('online', function(e) {
    $offline.hide();
  }).on('offline', function(e) {
    $offline.show();
  });

}).call(this);
