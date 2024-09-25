import axios from 'axios';
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
  import {
    LoginSocialFacebook,
  } from 'reactjs-social-login';
  
  import {
    FacebookLoginButton,
  } from 'react-social-login-buttons';

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
                                <LoginSocialFacebook
                                    appId="8788719901138062"
                                    fieldsProfile = {
                                        'id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender'
                                    }
                                    onLoginStart={() => {console.log("onLoginStart");}}
                                    onLogoutSuccess={() => {console.log("onLogoutSuccess");}}
                                    redirect_uri="/"
                                    onResolve={(provider, data) => {
                                        console.log("onResolve");
                                        console.log(provider);
                                        console.log(data);

                                        addUser({
                                            firstName: provider.data.first_name,
                                            lastName: provider.data.last_name,
                                            email: provider.data.email,
                                            provider: "Facebook"
                                        });
                                    }}
                                    onReject={err => {
                                        console.log(err);
                                    }}
                                    >
                                    <FacebookLoginButton />
                                </LoginSocialFacebook>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}

export default Login