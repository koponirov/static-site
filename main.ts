import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { firebaseConfig, vapidKey } from './config';

let userId = "";
let refId = "";
let tokenFCM = "";

initializeApp(firebaseConfig);

const messaging = getMessaging();

// IDs of divs that display registration token UI or request permission UI.
const permissionBlockedDivId = 'permission_blocked';
const permissionDivId = 'permission_div';

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
onMessage(messaging, (payload) => {
  // TODO: потом убрать лог
  console.log('Message received. ', payload);
});

const postMessage = (message) => {
  if (window && window.opener) {
    try {
      window.opener.postMessage(message, '*');
    } catch (e) {
      console.error('Error sending message:', e);
    }
  } else {
    console.error('Missing window.opener. Message: ', message);
  }
}


const PERMISSION_BLOCKED_ERROR = 'messaging/permission-blocked';

function requestTokenFCM() {
  getToken(messaging, { vapidKey }).then((currentToken) => {
    if (currentToken) {
      tokenFCM = currentToken;
      console.log('received FCM token', currentToken)
      sendTokenToServer(currentToken);
      // window.close()
    } else {
      // Show permission request.
      console.log('No registration token available. Request permission to generate one.');
      setTokenSentToServer(false);
    }
  }).catch((err) => {
    if (err?.code === PERMISSION_BLOCKED_ERROR) {
      console.log('error code:', err.code)
      showHideDiv(permissionBlockedDivId, true)
      showHideDiv(permissionDivId, false)
    } else {
      console.log('An error occurred while retrieving token. ', err);
      // some other error will send to server
      // POST /status { status: failed, data: err }
    }

    setTokenSentToServer(false);
  });
}

// Send the registration token your application server, so that it can:
// - send messages back to this app
// - subscribe/unsubscribe the token from topics
function sendTokenToServer(currentToken: string) {
  if (!isTokenSentToServer()) {
    console.log('Sending token to server...', currentToken);
    // TODO(developer): Send the current token to your server.
    // POST /status { status: success, data: { userId, refId, token } }

    // window.postMessage(`fcm token|${currentToken}`,'*')
    postMessage(`fcm token|${currentToken}`)

    setTokenSentToServer(true);
  } else {
    // POST /ping. {userId, tokenFSM}
    console.log('send /ping with userId and tokenFSM ');
  }
}

function isTokenSentToServer() {
  return window.localStorage.getItem('sentToServer') === '1';
}

function setTokenSentToServer(sent: boolean) {
  window.localStorage.setItem('sentToServer', sent ? '1' : '0');
}

function showHideDiv(divId: string, show: boolean) {
  const div = document.querySelector('#' + divId)! as HTMLDivElement;
  if (show) {
    div.style.display = 'block';
  } else {
    div.style.display = 'none';
  }
}

function requestPermission() {
  console.log('Requesting permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // TODO(developer): Retrieve a registration token for use with FCM.
      // In many cases once an app has been granted notification permission,
      // it should update its UI reflecting this.
      requestTokenFCM();
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

document.getElementById('request-permission-button')!.addEventListener('click', requestPermission);

requestPermission();

const queryParams = window.location.search.substring(1).split("&");
for (let i = 0; i < queryParams.length; i++) {
   let pair = queryParams[i].split("=");
   if (pair[0] === "uid") {
       userId = decodeURIComponent(pair[1]);
       break;
   }

  if (pair[0] === "rid") {
    refId = decodeURIComponent(pair[1]);
    break;
  }
}
