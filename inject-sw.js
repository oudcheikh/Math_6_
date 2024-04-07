// inject-sw.js
const { injectManifest } = require('workbox-build');

injectManifest({
  swSrc: 'src/service-worker.js', // Le chemin vers votre fichier source de Service Worker
  swDest: 'build/service-worker.js', // Le chemin vers où vous voulez que le SW fini soit écrit
  globDirectory: 'build',
  globPatterns: [
    '**/*.{js,css,html,png,jpg,jpeg,svg,gif}',
  ],
}).then(({count, size}) => {
  console.log(`Generated a new service worker with ${count} precached files, totaling ${size} bytes.`);
}).catch(err => {
  console.error('Error during the manifest injection:', err);
});
