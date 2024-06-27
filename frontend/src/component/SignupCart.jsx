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
    useColorModeValue,
    Link,
    
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtoms'
import userAtom from '../atoms/userAtoms'
import tokenAuth from '../atoms/tokenAtoms'
  
  export default function SignupCard() {

    // const toast =useToast()

    const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const [input,setInput] = useState({
    name:"",
    username:"",
    email:"",
    password:""
  });


  const setUser = useSetRecoilState(userAtom);

  const setToken = useSetRecoilState(tokenAuth)

  const handelSignup = async()=>{
    console.log(input)
    try {
        const res = await fetch("http://localhost:5000/api/users/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(input)
        })
        const data =await res.json();
        if(data.error){
          console.log("error occuring")
          alert(`${data.error}`)
        }

        // console.log("dadada")
        localStorage.setItem("token",JSON.stringify(data.token))
        setToken(data.token)
        localStorage.setItem("user-threads",JSON.stringify(data))
        setUser(data)

        console.log("data from backend ", data)
    } catch (error) {
        console.log("cac't sign in rignt now")
    }
  }


    return (
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
                  <FormControl  isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text"
                     onChange={(e)=>setInput({...input,name:e.target.value})}
                     value={input.name} />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl isRequired>
                    <FormLabel>User Name</FormLabel>
                    <Input type="text" 
                    onChange={(e)=>setInput({...input,username:e.target.value})}
                    value={input.username}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl  isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email"
                 onChange={(e)=>setInput({...input,email:e.target.value})}
                 value={input.email} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} 
                   onChange={(e)=>setInput({...input,password:e.target.value})}
                   value={input.password} />
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
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handelSignup}
                  >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} onClick={()=>setAuthScreen("login")}>
                  Already a user? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }