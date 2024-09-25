import { Link } from "react-router-dom"
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue
  } from '@chakra-ui/react'
import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

function Register({addUser})
{
    const [showPassword, setShowPassword] = useState(false);
    const [firstNameIsInvalid, setFirstNameIsInvalid] = useState(false);
    const [emailIsInvalid, setEmailIsInvalid] = useState(false);
    const [passwordIsInvalid, setPasswordIsInvalid] = useState(false);

    const submit = (e) => {
        const firstName = document.getElementsByName("FirstName")[0];
        const email = document.getElementsByName("Email")[0];
        const password = document.getElementsByName("Password")[0];

        const isFirstNameValid = firstName.checkValidity();
        const isEmailValid = email.checkValidity();
        const isPasswordValid = password.checkValidity();

        setFirstNameIsInvalid(!isFirstNameValid);
        setEmailIsInvalid(!isEmailValid);
        setPasswordIsInvalid(!isPasswordValid);

        if (isFirstNameValid && isEmailValid && isPasswordValid) {
            addUser({
                firstName: firstName.value,
                lastName: document.getElementsByName("LastName")[0].value,
                email: email.value,
                password: password.value
            });
        }
    }
    
    return (
        <form>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>
                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input type="text" name="FirstName" isInvalid={firstNameIsInvalid} />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input type="text" name="LastName"/>
                                    </FormControl>
                                </Box>
                            </HStack>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input type="email" name="Email" isInvalid={emailIsInvalid} />
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input type={showPassword ? 'text' : 'password'} name="Password" isInvalid={passwordIsInvalid} />
                                    <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={10} pt={2}>
                                <Button 
                                    onClick={submit}
                                    type="button"
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link to="/login" style={{color: 'var(--chakra-colors-blue-500)'}}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </form>
    );
}

export default Register