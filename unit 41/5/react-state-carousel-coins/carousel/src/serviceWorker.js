// Check if the app is being served on localhost
const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

// Register the service worker for production builds
export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // Construct the service worker URL
    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

    window.addEventListener("load", () => {
      if (isLocalhost) {
        // Check if a service worker still exists on localhost
        checkValidServiceWorker(swUrl, config);

        // Provide information for developers on localhost
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA"
          );
        });
      } else {
        // Register a valid service worker for non-localhost environments
        registerValidSW(swUrl, config);
      }
    });
  }
}

// Register a valid service worker
function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        // Handle service worker state changes
        const installingWorker = registration.installing;
        if (installingWorker && installingWorker.state === "installed") {
          // Handle the updated content
          console.log(
            "New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."
          );

          // Execute the update callback if provided
          if (config && config.onUpdate) {
            config.onUpdate(registration);
          }
        }
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

// Check if a service worker is valid
function checkValidServiceWorker(swUrl, config) {
  // Fetch the service worker and check its validity
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // No valid service worker found, reload the page
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Valid service worker found, proceed as normal
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

// Unregister the service worker
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
