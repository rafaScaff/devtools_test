// Initialize the SDK (loaded via script tag in index.html)
window.TestSDK.init('root');

// Set up event listeners
window.addEventListener('ipStateChange', (event) => {
  const { loading, ip, error } = event.detail;
  console.log('State changed in the SDK:', { loading, ip, error });

  document.getElementById('ip-address').textContent = ip || 'N/A';
  document.getElementById('loading-status').textContent = loading ? 'Loading...' : 'Finished';
  document.getElementById('error-message').textContent = error ? error.message : 'No error';
});

// Request permission on user gesture (needed for iOS Safari)
document.getElementById('request-gyro').addEventListener('click', () => {
  window.dispatchEvent(new Event('requestGyroPermission'));
});

// Listen for permission state changes
window.addEventListener('gyroPermissionState', (event) => {
  const { state } = event.detail;
  document.getElementById('gyro-permission').textContent = state;
});

// Listen for orientation updates
window.addEventListener('gyroStateChange', (event) => {
  const { alpha, beta, gamma } = event.detail;
  document.getElementById('gyro-alpha').textContent = alpha ?? '-';
  document.getElementById('gyro-beta').textContent = beta ?? '-';
  document.getElementById('gyro-gamma').textContent = gamma ?? '-';
});