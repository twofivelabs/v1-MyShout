(window.webpackJsonp=window.webpackJsonp||[]).push([[203,223],{1054:function(e,t,n){"use strict";n.r(t),n.d(t,"FirebaseAuthenticationWeb",(function(){return l}));var r=n(55),o=n(1121),c=n(835);class l extends r.b{constructor(){super(),this.lastConfirmationResult=new Map;Object(o.getAuth)().onAuthStateChanged((e=>this.handleAuthStateChange(e)))}async applyActionCode(e){const t=Object(o.getAuth)();return Object(o.applyActionCode)(t,e.oobCode)}async createUserWithEmailAndPassword(e){const t=Object(o.getAuth)(),n=await Object(o.createUserWithEmailAndPassword)(t,e.email,e.password);return this.createSignInResult(n,null)}async confirmPasswordReset(e){const t=Object(o.getAuth)();return Object(o.confirmPasswordReset)(t,e.oobCode,e.newPassword)}async confirmVerificationCode(e){const{verificationCode:t,verificationId:n}=e,r=this.lastConfirmationResult.get(n);if(!r)throw new Error(l.ERROR_CONFIRMATION_RESULT_MISSING);const o=await r.confirm(t);return this.createSignInResult(o,null)}async deleteUser(){const e=Object(o.getAuth)().currentUser;if(!e)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return Object(o.deleteUser)(e)}async getCurrentUser(){const e=Object(o.getAuth)();return{user:this.createUserResult(e.currentUser)}}async getIdToken(e){const t=Object(o.getAuth)();if(!t.currentUser)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return{token:await t.currentUser.getIdToken(null==e?void 0:e.forceRefresh)||""}}async getRedirectResult(){const e=Object(o.getAuth)(),t=await Object(o.getRedirectResult)(e),n=t?o.OAuthProvider.credentialFromResult(t):null;return this.createSignInResult(t,n)}async getTenantId(){return{tenantId:Object(o.getAuth)().tenantId}}async isSignInWithEmailLink(e){const t=Object(o.getAuth)();return{isSignInWithEmailLink:Object(o.isSignInWithEmailLink)(t,e.emailLink)}}async linkWithApple(e){const t=new o.OAuthProvider(c.b.APPLE);this.applySignInOptions(e||{},t);const n=await this.linkCurrentUserWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.OAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async linkWithEmailAndPassword(e){const t=o.EmailAuthProvider.credential(e.email,e.password),n=await this.linkCurrentUserWithCredential(t);return this.createSignInResult(n,t)}async linkWithEmailLink(e){const t=o.EmailAuthProvider.credentialWithLink(e.email,e.emailLink),n=await this.linkCurrentUserWithCredential(t);return this.createSignInResult(n,t)}async linkWithFacebook(e){const t=new o.FacebookAuthProvider;this.applySignInOptions(e||{},t);const n=await this.linkCurrentUserWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.FacebookAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async linkWithGameCenter(){throw new Error("Not available on web.")}async linkWithGithub(e){const t=new o.GithubAuthProvider;this.applySignInOptions(e||{},t);const n=await this.linkCurrentUserWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.GithubAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async linkWithGoogle(e){const t=new o.GoogleAuthProvider;this.applySignInOptions(e||{},t);const n=await this.linkCurrentUserWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.GoogleAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async linkWithMicrosoft(e){const t=new o.OAuthProvider(c.b.MICROSOFT);this.applySignInOptions(e||{},t);const n=await this.linkCurrentUserWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.OAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async linkWithPhoneNumber(e){const t=Object(o.getAuth)().currentUser;if(!t)throw new Error(l.ERROR_NO_USER_SIGNED_IN);if(!e.phoneNumber)throw new Error(l.ERROR_PHONE_NUMBER_MISSING);if(!(e.recaptchaVerifier&&e.recaptchaVerifier instanceof o.RecaptchaVerifier))throw new Error(l.ERROR_RECAPTCHA_VERIFIER_MISSING);try{const n=await Object(o.linkWithPhoneNumber)(t,e.phoneNumber,e.recaptchaVerifier),{verificationId:r}=n;this.lastConfirmationResult.set(r,n);const c={verificationId:r};this.notifyListeners(l.PHONE_CODE_SENT_EVENT,c)}catch(e){const t={message:this.getErrorMessage(e)};this.notifyListeners(l.PHONE_VERIFICATION_FAILED_EVENT,t)}}async linkWithPlayGames(){throw new Error("Not available on web.")}async linkWithTwitter(e){const t=new o.TwitterAuthProvider;this.applySignInOptions(e||{},t);const n=await this.linkCurrentUserWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.TwitterAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async linkWithYahoo(e){const t=new o.OAuthProvider(c.b.YAHOO);this.applySignInOptions(e||{},t);const n=await this.linkCurrentUserWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.OAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async reload(){const e=Object(o.getAuth)().currentUser;if(!e)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return Object(o.reload)(e)}async sendEmailVerification(){const e=Object(o.getAuth)().currentUser;if(!e)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return Object(o.sendEmailVerification)(e)}async sendPasswordResetEmail(e){const t=Object(o.getAuth)();return Object(o.sendPasswordResetEmail)(t,e.email)}async sendSignInLinkToEmail(e){const t=Object(o.getAuth)();return Object(o.sendSignInLinkToEmail)(t,e.email,e.actionCodeSettings)}async setLanguageCode(e){Object(o.getAuth)().languageCode=e.languageCode}async setPersistence(e){const t=Object(o.getAuth)();switch(e.persistence){case c.a.BrowserLocal:await Object(o.setPersistence)(t,o.browserLocalPersistence);break;case c.a.BrowserSession:await Object(o.setPersistence)(t,o.browserSessionPersistence);break;case c.a.IndexedDbLocal:await Object(o.setPersistence)(t,o.indexedDBLocalPersistence);break;case c.a.InMemory:await Object(o.setPersistence)(t,o.inMemoryPersistence)}}async setTenantId(e){Object(o.getAuth)().tenantId=e.tenantId}async signInAnonymously(){const e=Object(o.getAuth)(),t=await Object(o.signInAnonymously)(e);return this.createSignInResult(t,null)}async signInWithApple(e){const t=new o.OAuthProvider(c.b.APPLE);this.applySignInOptions(e||{},t);const n=await this.signInWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.OAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async signInWithCustomToken(e){const t=Object(o.getAuth)(),n=await Object(o.signInWithCustomToken)(t,e.token);return this.createSignInResult(n,null)}async signInWithEmailAndPassword(e){const t=Object(o.getAuth)(),n=await Object(o.signInWithEmailAndPassword)(t,e.email,e.password);return this.createSignInResult(n,null)}async signInWithEmailLink(e){const t=Object(o.getAuth)(),n=await Object(o.signInWithEmailLink)(t,e.email,e.emailLink);return this.createSignInResult(n,null)}async signInWithFacebook(e){const t=new o.FacebookAuthProvider;this.applySignInOptions(e||{},t);const n=await this.signInWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.FacebookAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async signInWithGithub(e){const t=new o.GithubAuthProvider;this.applySignInOptions(e||{},t);const n=await this.signInWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.GithubAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async signInWithGoogle(e){const t=new o.GoogleAuthProvider;this.applySignInOptions(e||{},t);const n=await this.signInWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.GoogleAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async signInWithMicrosoft(e){const t=new o.OAuthProvider(c.b.MICROSOFT);this.applySignInOptions(e||{},t);const n=await this.signInWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.OAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async signInWithPhoneNumber(e){if(!e.phoneNumber)throw new Error(l.ERROR_PHONE_NUMBER_MISSING);if(!(e.recaptchaVerifier&&e.recaptchaVerifier instanceof o.RecaptchaVerifier))throw new Error(l.ERROR_RECAPTCHA_VERIFIER_MISSING);const t=Object(o.getAuth)();try{const n=await Object(o.signInWithPhoneNumber)(t,e.phoneNumber,e.recaptchaVerifier),{verificationId:r}=n;this.lastConfirmationResult.set(r,n);const c={verificationId:r};this.notifyListeners(l.PHONE_CODE_SENT_EVENT,c)}catch(e){const t={message:this.getErrorMessage(e)};this.notifyListeners(l.PHONE_VERIFICATION_FAILED_EVENT,t)}}async signInWithPlayGames(){throw new Error("Not available on web.")}async signInWithGameCenter(){throw new Error("Not available on web.")}async signInWithTwitter(e){const t=new o.TwitterAuthProvider;this.applySignInOptions(e||{},t);const n=await this.signInWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.TwitterAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async signInWithYahoo(e){const t=new o.OAuthProvider(c.b.YAHOO);this.applySignInOptions(e||{},t);const n=await this.signInWithPopupOrRedirect(t,null==e?void 0:e.mode),r=o.OAuthProvider.credentialFromResult(n);return this.createSignInResult(n,r)}async signOut(){const e=Object(o.getAuth)();await e.signOut()}async unlink(e){const t=Object(o.getAuth)();if(!t.currentUser)throw new Error(l.ERROR_NO_USER_SIGNED_IN);const n=await Object(o.unlink)(t.currentUser,e.providerId);return{user:this.createUserResult(n)}}async updateEmail(e){const t=Object(o.getAuth)().currentUser;if(!t)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return Object(o.updateEmail)(t,e.newEmail)}async updatePassword(e){const t=Object(o.getAuth)().currentUser;if(!t)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return Object(o.updatePassword)(t,e.newPassword)}async updateProfile(e){const t=Object(o.getAuth)().currentUser;if(!t)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return Object(o.updateProfile)(t,e)}async useAppLanguage(){Object(o.getAuth)().useDeviceLanguage()}async useEmulator(e){const t=Object(o.getAuth)(),n=e.port||9099,r=e.scheme||"http";e.host.includes("://")?Object(o.connectAuthEmulator)(t,`${e.host}:${n}`):Object(o.connectAuthEmulator)(t,`${r}://${e.host}:${n}`)}handleAuthStateChange(e){const t={user:this.createUserResult(e)};this.notifyListeners(l.AUTH_STATE_CHANGE_EVENT,t)}applySignInOptions(e,t){if(e.customParameters){const n={};e.customParameters.map((e=>{n[e.key]=e.value})),t.setCustomParameters(n)}if(e.scopes)for(const n of e.scopes)t.addScope(n)}signInWithPopupOrRedirect(e,t){const n=Object(o.getAuth)();return"redirect"===t?Object(o.signInWithRedirect)(n,e):Object(o.signInWithPopup)(n,e)}linkCurrentUserWithPopupOrRedirect(e,t){const n=Object(o.getAuth)();if(!n.currentUser)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return"redirect"===t?Object(o.linkWithRedirect)(n.currentUser,e):Object(o.linkWithPopup)(n.currentUser,e)}linkCurrentUserWithCredential(e){const t=Object(o.getAuth)();if(!t.currentUser)throw new Error(l.ERROR_NO_USER_SIGNED_IN);return Object(o.linkWithCredential)(t.currentUser,e)}createSignInResult(e,t){return{user:this.createUserResult((null==e?void 0:e.user)||null),credential:this.createCredentialResult(t),additionalUserInfo:this.createAdditionalUserInfoResult(e)}}createCredentialResult(e){if(!e)return null;const t={providerId:e.providerId};return e instanceof o.OAuthCredential&&(t.accessToken=e.accessToken,t.idToken=e.idToken,t.secret=e.secret),t}createUserResult(e){if(!e)return null;return{displayName:e.displayName,email:e.email,emailVerified:e.emailVerified,isAnonymous:e.isAnonymous,metadata:this.createUserMetadataResult(e.metadata),phoneNumber:e.phoneNumber,photoUrl:e.photoURL,providerData:this.createUserProviderDataResult(e.providerData),providerId:e.providerId,tenantId:e.tenantId,uid:e.uid}}createUserMetadataResult(e){const t={};return e.creationTime&&(t.creationTime=Date.parse(e.creationTime)),e.lastSignInTime&&(t.lastSignInTime=Date.parse(e.lastSignInTime)),t}createUserProviderDataResult(e){return e.map((data=>({displayName:data.displayName,email:data.email,phoneNumber:data.phoneNumber,photoUrl:data.photoURL,providerId:data.providerId,uid:data.uid})))}createAdditionalUserInfoResult(e){if(!e)return null;const t=Object(o.getAdditionalUserInfo)(e);if(!t)return null;const{isNewUser:n,profile:r,providerId:c,username:l}=t,h={isNewUser:n};return null!==c&&(h.providerId=c),null!==r&&(h.profile=r),null!=l&&(h.username=l),h}getErrorMessage(e){return e instanceof Object&&"message"in e&&"string"==typeof e.message?e.message:JSON.stringify(e)}}l.AUTH_STATE_CHANGE_EVENT="authStateChange",l.PHONE_CODE_SENT_EVENT="phoneCodeSent",l.PHONE_VERIFICATION_FAILED_EVENT="phoneVerificationFailed",l.ERROR_NO_USER_SIGNED_IN="No user is signed in.",l.ERROR_PHONE_NUMBER_MISSING="phoneNumber must be provided.",l.ERROR_RECAPTCHA_VERIFIER_MISSING="recaptchaVerifier must be provided and must be an instance of RecaptchaVerifier.",l.ERROR_CONFIRMATION_RESULT_MISSING="No confirmation result with this verification id was found."},1121:function(e,t,n){"use strict";n.r(t);n(856)}}]);