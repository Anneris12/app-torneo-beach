import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const ADMIN_UID = "93f4Gdnr1bX7vMbu6ih5cBTm3Mg2";

function getApp(firebaseConfig) {
  if (getApps().length) return getApps()[0];
  return initializeApp(firebaseConfig);
}

export function requireAdmin(firebaseConfig) {
  const app = getApp(firebaseConfig);
  const auth = getAuth(app);

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "login.html";
        return;
      }
      if (user.uid !== ADMIN_UID) {
        window.location.href = "index.html";
        return;
      }
      resolve(user);
    });
  });
}

export function requireLogged(firebaseConfig) {
  const app = getApp(firebaseConfig);
  const auth = getAuth(app);

  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        window.location.href = "login.html";
        return;
      }
      resolve(user);
    });
  });
}
