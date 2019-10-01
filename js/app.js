if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('service worker registered'))
    .catch(err => console.log('service worker not registered', err));
}

// if(!(event.request.url.indexOf('http') === 0)){
//   //skip request
//   console.log("Request scheme 'chrome-extension' is unsupported")
// }

Notification.requestPermission(result =>  {
  console.log(result)
  if (result === 'granted') {
    alert('thanks for giving me permissions')
    navigator.serviceWorker.getRegistration().then(function(reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: '/img/dish.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [
          {action: 'explore', title: 'Explore this new world',
            icon: '/img/dish.png'},
          {action: 'close', title: 'Close notification',
            icon: '/img/dish.png'},
        ]
      };
      reg.showNotification('Hello world!', options);
    }); 
  }
});


