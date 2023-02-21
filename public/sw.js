const CACHE_NAME = `test-firebase-pwa`;

// intercepter l'évènement install pour mettre en cache toutes les ressources nécessaires au fonctionnement de l'application.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/fonctions-firebase.js',
      '/styles.css'
    ]);
  })());
});

// Intercepte l'évènement fetch qui est envoyé par l'appli chaque fois qu'elle fait une requête au serveur
// Ce listener fait en sort que lors d'une requête vers le serveur, la fonction lui retourne ce qui est en cache
// et seulement si cela échoue, alors fait une requête vers le serveur.
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);

    // Get the resource from the cache.
    const cachedResponse = await cache.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    } else {
        try {
          // If the resource was not in the cache, try the network.
          const fetchResponse = await fetch(event.request);

          // Save la resource dans le cache et le place dans la réponse
          cache.put(event.request, fetchResponse.clone());
          return fetchResponse;
        } catch (e) {
          // The network failed.
        }
    }
  })());
});