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
import { useRecoilState, useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/authAtoms'
import userAtom from '../atoms/userAtoms'
import tokenAuth from '../atoms/tokenAtoms'
  
  export default function LoginCarrd() {
    const [showPassword, setShowPassword] = useState(false)
          const setAuthscreen =  useSetRecoilState(authScreenAtom);
          const setUser = useSetRecoilState(userAtom)
          const [loading,setLoadng]= useState(false)
          const [input ,setInput] = useState({
            username:"",
            password:""
          })
          const setToken = useSetRecoilState(tokenAuth)
       
  


          const handelLogin = async()=>{
            // console.log(input)
            if(loading) return
            
            setLoadng(true)
            try {
              const res = await fetch("http://localhost:5000/api/users/login",{
                credentials:'include',
                method:"POST",
                headers:{
                  "Content-Type":"application/json",
                  
                },
                body:JSON.stringify(input)
              })

              const dataa = await res.json();
              console.log(dataa,"printing data here")

              if(dataa.error){
                alert(dataa.error)
                return;
              }
              localStorage.setItem("token",JSON.stringify(dataa.token))
              setToken(dataa.token)
              localStorage.setItem("user-threads",JSON.stringify(dataa));

              setUser(dataa)
              
            } catch (error) {
              alert("log in error please try after 1 min")
            }finally{
              setLoadng(false)
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
              Login
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl  isRequired>
                <FormLabel>User Name</FormLabel>
                <Input type="text" 
                value={input.username}
                onChange={(e)=>setInput({...input,username:e.target.value})}/>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} value={input.password} onChange={(e)=>setInput({...input,password:e.target.value})}/>
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
                  loadingText="Logging in"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={handelLogin} isLoading={loading}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Don't have a user? <Link color={'blue.400'}
                  onClick={()=>setAuthscreen("signup")}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    )
  }