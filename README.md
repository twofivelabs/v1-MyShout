# Workflow/Build Deployment

```
nuxt [live reloading]
nuxt build [final build]
npm run build
npm run generate *Not needed here for SPA MODE, needed for server rendering*
npx cap copy android [ios/android]
npx cap open android [ios/android]
```
iOS Pod File Debug
- Might need to replace the `\\` to `/`
- Run `Pod Update`
- Run `Pod Install`

Vue Packages version Mismatch
Try to match it with the VUE version
- IE: npm i vue-server-renderer@2.6.14[version]
- IE: npm i vue-template-compiler@2.6.14[version]

Gradle File Missing
- `npx cap update`

# Development

https://capacitorjs.com/docs/guides/live-reload

```
npx cap run android -l [ios/android]
npx cap run android -l --external [ios/android]
```

Download your indexes to firestore.indexes.json for deployment

```
firebase firestore:indexes > firestore.indexes.json
```

# Node Version
* My Shout requires a specific node version. To install locally, run the following script then set your system to use.
nvm install v16.20.2
nvm use v16.20.2

To get a list of all node version installed locally, use the following command.
nvm list

# Live Editing

* Might run into issues, but possibly gets you in the right direction faster

``` javascript
// capacitor.config.json
"server": {
  "url": "http://192.168.1.64:3000"
}
```

``` javascript
// command
nuxt --hostname '192.168.1.64' --port 3000
npx cap copy android [android / ios]
npx cap open android [android / ios]
```

# Debugging

**General**
> Make sure you have updated the `google-services.json` file

**Web**
> As normally done through a browser.

**Android**
> Run the app through Android Studio. But you can use Chrome Dev Tools and inspect the remote target, [chrome://inspect/#devices](chrome://inspect/#devices).

**iOS**
> Similarly, use Safari/Xcode as an option.

# SSL (LocalHost)

``` javascript
// setup (chrome only)
brew install
mkcert
mkcert -install
// navigate to the dir you want the cert (other domains: mkcert mysite.example)
mkcert localhost [or ip]

// nuxt.config.js
import path from 'path'
import fs from 'fs'
const useSSL = true

config.server = {
  port: 8000, // default: 3000
  host: 'localhost', // default: localhost, 192.168.1.64
  timing: false,
  https: {
    key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost-key.pem')),
    cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.pem'))
  }
}
```

# Firebase Hosting

``` javascript
// First
npm run build

// Push to firebase hosting, careful with the prompt options
// Staging or add a feature before live
firebase hosting:channel:deploy beta --expires 7d

// Push to live
firebase deploy --only hosting
firebase deploy
```

## Change Fonts
- Go to https://fonts.google.com/
- Download Font Family
- Convert to web format at https://transfonter.org/ SELECT ALL FORMATS (ttf,woff,svg...)
- Export fonts into `/static/fonts`
- Adjust CSS at `/assets/css/general.scss`

## Nuxt

**Website**
https://nuxtjs.org/

**Modules**
https://nuxtjs.org/modules

**Vuetify**
https://vuetifyjs.com/en/getting-started/installation/

**Icons**
https://materialdesignicons.com/
https://fonts.google.com/icons
https://vuetifyjs.com/en/features/icon-fonts/#reusable-custom-icons

## Build Help

https://serversideup.net/packaging-a-nuxtjs-app-for-ios-and-android-with-capacitorjs/

https://capacitorjs.com/blog/integrating-capacitorjs-plugins-with-nuxtjs

## Design Elements

Icons
https://icon.kitchen

Web Icons / Favicon https://realfavicongenerator.net/

Make sure you have Cordova Res installed

`npm install -g cordova-res`

https://capacitorjs.com/docs/guides/splash-screens-and-icons

Now run this command to generate files
> `cordova-res ios --skip-config --copy`
>
> `cordova-res android --skip-config --copy`

## Push Notifications

https://capacitorjs.com/docs/guides/push-notifications-firebase
#### fcmPublicVapidKey
To generate a new API Key. Login to firebase, and go to project settings.
> Cloud Messaging > Web Configuration > Generate New Key Pair

## Changing App Versions

Android
`CTRL + ALT + SHIFT + S` Default Config tab, version increments 1, version name increments
with decimal.

## Duplicating

- Changing GitHub Projects After Clone
    - Windows: Run as Admin `del /F /S /Q /A .git` then `rmdir .git` in the folder you are starting fresh in.
    - Mac: Run `rm -rf .git*`
- Go to GitHub create repo [URL OF REPO]
- `git init`
- `git remote add origin https://github.com/stickypages/nuxt-app-accessability.git`
- `git add .`
- `git commit -m "This is a new commit for what I originally planned to be amended"`
- `git branch -M main`
- `git push -u origin main`
- `git reset --mixed origin/main`
- Create Firebase Project
- Setup firebase for your project `firebase use [project-id]`, firebase > Project Settings > General
- Update Firebase Project App Details Throughout Project
- Update `assets/serviceAccount.json`
- - Search and replace the project ID's
- - `cd functions` `npm install`
- - - `firebase deploy --only functions`
  - Update Firestore RULES
    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /ADMIN/Log {
          allow read, write;
        }
        match /{document=**} {
          allow read;
          allow write: if request.auth != null;
        }
      }
    }
- Update Nuxt Config
- Update Logos & Images
    - Also `/android/app/src/main`

## Firebase Structure
```
  ADMIN
    - Content
      - Pages
    - Log
    - UI
  Users
``` 

## Testing your remote config

`firebase use [project-id]`

`firebase functions:config:get`
