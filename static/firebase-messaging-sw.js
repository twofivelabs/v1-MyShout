importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyDzL5T3aUM7GGvTR_dh84Tm_D01T8pAGYM","authDomain":"my-shout-app.firebaseapp.com","projectId":"my-shout-app","storageBucket":"my-shout-app.appspot.com","messagingSenderId":"137661141174","appId":"1:137661141174:web:c00c73c494443d7e449617","measurementId":"G-6D1EY1D843"})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

// Setup event listeners for actions provided in the config:
self.addEventListener('notificationclick', function(e) {
  const actions = [{"action":"goToHome","url":"\u002F"},{"action":"goToProfile","url":"\u002Fprofile"}]
  const action = actions.find(x => x.action === e.action)
  const notification = e.notification

  if (!action) return

  if (action.url) {
    clients.openWindow(action.url)
    notification.close()
  }
})
