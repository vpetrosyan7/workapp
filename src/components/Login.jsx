import { useEffect } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import GoogleLogin from './GoogleLogin';

function Login1()
{
    return (
        <div className="center">
            <h2 class="chakra-heading showcase-b89764">Create an account</h2>
            <div className="child-center">
                <label for="txtName">Name</label>
                <Input id="txtName" style={{width: "30vw"}}/>
            </div>
            <div className="child-center">
                <label for="txtEmail">Email</label>
                <Input id="txtEmail" style={{width: "30vw"}}/>
            </div>
            <div className="child-center">
                <label for="txtPassword">Password</label>
                <Input id="txtPassword" style={{width: "30vw"}}/>
            </div>
            <div className="child-center">
                <label for="txtConfirmPassword">Confirm Password</label>
                <Input id="txtConfirmPassword" style={{width: "30vw"}}/>
            </div>
        </div>
    );  
}

function Login({addUser})
{
    const loadFacebookSDK = () => {
        // Check if the SDK is already loaded
        if (window.FB) {
            return;
        }
        
        // Create a script element and load the Facebook SDK
        (function(d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            const js = d.createElement(s); 
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        // Once the SDK is loaded, initialize it with your App ID
        window.fbAsyncInit = function() {
            window.FB.init({
                appId: '8788719901138062',
                cookie: true,
                xfbml: true,
                version: 'v20.0'
            });
        };
    };

    // const loadGoogleSDK = () => {
    //     const script = document.createElement('script');
    //     script.src = 'https://accounts.google.com/gsi/client';
    //     script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);

    //     // Initialize the Google Sign-In button after the script loads
    //     script.onload = () => {
    //         /* global google */
    //         google.accounts.id.initialize({
    //             client_id: '729882394972-jbg5mv2n6bircehuivu4sf3s5qlcrsn2.apps.googleusercontent.com',
    //             callback: handleCredentialResponse, // Function to handle login response
    //         });

    //         // Render the Google Sign-In button
    //         google.accounts.id.renderButton(
    //             document.getElementById('googleSignInDiv'),
    //             { theme: 'outline', size: 'large' }
    //         );

    //         google.accounts.id.prompt(); // Display the One Tap prompt
    //     };
    // };

    useEffect(() => {
        loadFacebookSDK();
        //loadGoogleSDK();
    }, []);

    const handleFBLogin = () => {
        window.FB.login(response => {
          if (response.authResponse) {
            console.log('Logged in successfully:', response);

            window.FB.api('/me', { fields: 'id, first_name, last_name, picture, email' }, (data) => {
              console.log('User information:', data);

              addUser({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    email: data.email,
                    provider: "Facebook"
                });
            });
          } 
          else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'email' });
    };

    // const handleGoogleLogin = () => {
    //     const auth2 = window.gapi.auth2.getAuthInstance();

    //     auth2.signIn().then((data) => {
    //       const profile = data.getBasicProfile();
    //       console.log('ID: ' + profile.getId()); // Do not send to backend! Use ID token.
    //       console.log('Name: ' + profile.getName());
    //       console.log('Email: ' + profile.getEmail());
          
    //       const idToken = data.getAuthResponse().id_token;
    //       console.log('ID Token: ' + idToken);
          
    //       // You can send the idToken to your server for validation/authentication
    //     });
    // };

    return(
        <form>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Login to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name="Email" />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input type="password" name="Password" />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    type="submit"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                    bg: 'blue.500',
                                    }}>
                                    Login
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleFBLogin}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                    bg: 'blue.500',
                                    }}>
                                    Login With Facebook
                                </Button>
                                <GoogleLogin />
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}

export default Login