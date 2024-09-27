import React, { useEffect } from 'react';

const GoogleLogin = () => {
  useEffect(() => {
    // Load the Google Identity Services script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize the Google Sign-In button after the script loads
    script.onload = () => {
      /* global google */
      google.accounts.id.initialize({
        client_id: '729882394972-jbg5mv2n6bircehuivu4sf3s5qlcrsn2.apps.googleusercontent.com',
        callback: (response) => {
            console.log('Encoded JWT ID token: ' + response.credential);
            // You can send this token to your server for authentication and validation
          },
      });

      // Render the Google Sign-In button
      google.accounts.id.renderButton(
        document.getElementById('googleSignInDiv'),
        { theme: 'filled', size: 'large' }
      );

      google.accounts.id.prompt(); // Display the One Tap prompt
    };
  }, []);

  return (
    <div>
      <div id="googleSignInDiv"></div>
    </div>
  );
};

export default GoogleLogin;
