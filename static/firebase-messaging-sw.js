importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'
)
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
)
firebase.initializeApp({"apiKey":"AIzaSyChwP2vZ1Q4E_6wFIr0Pb_mfDFq_ThSas4","authDomain":"my-shout-staging.firebaseapp.com","projectId":"my-shout-staging","storageBucket":"my-shout-staging.appspot.com","messagingSenderId":"777569508563","appId":"1:777569508563:web:f205aa7aea3820e0230826","measurementId":""})

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
