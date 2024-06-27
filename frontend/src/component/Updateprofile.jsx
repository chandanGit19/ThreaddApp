import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
  } from '@chakra-ui/react'

import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtoms'
import { useRef, useState } from 'react'
import usePreviewimage from '../hooks/usePreviewimage'
import tokenAuth from '../atoms/tokenAtoms'
  
  export default function Updateprofile() {
    const [user,setUser] = useRecoilState(userAtom)
    const profileRef =useRef(null)
    const [loading,setLoading] =useState(false)
    const token = useRecoilState(tokenAuth);
    console.log(token[0])

    const [input,setInput]= useState({
        name:user.name,
        username:user.username,
        bio:user.bio,
        email:user.email,
        profilePic:user.profilePic,
    })

    const {handelImage ,imageUrl,uploadimg} = usePreviewimage()
    const handelUpdate = async(e)=>{
     
        e.preventDefault()
        if(loading) return
        setLoading(true)
        const header = new Headers({
            "Content-Type":"application/json",
            "authorisation" : token[0],

        })

        try {
            const res = await fetch(`https://threaddapp.onrender.com/api/users/update/${user._id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "authorisation" : token[0],
                },
                body:JSON.stringify({...input,profilePic:imageUrl})
            })

            const data = await res.json();

            if(data.error){
                alert("can't update right now")
                return
            }
            console.log("updated data is here", data.user)
            setUser(data.user);
            localStorage.setItem("user-threads",JSON.stringify(data.user))
            alert("profile updated successfuly")

            if(data.error){
                alert("can't update profile right now")
            }
            


        } catch (error) {
            alert("can't update right now")
        }finally{
          setLoading(false)
        }
    }
 
    console.log(user)
    return (
        <form onSubmit={handelUpdate}>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" src={ imageUrl ||user.profilePic}>
                </Avatar>
              </Center>
              <Center w="full">
                <Button w="full" onClick={()=>profileRef.current.click()}>Change avatar</Button>
                <input type='file' hidden ref={profileRef} onChange={handelImage}/>
              </Center>
            </Stack>
          </FormControl>
          <FormControl  isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={input.name}
              onChange={(e)=>setInput({...input,name:e.target.value})}
            />
          </FormControl>
          <FormControl  isRequired>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="UserName"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={input.username}
              onChange={(e)=>setInput({...input,username:e.target.value})}
            />
          </FormControl>
          <FormControl  isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Email"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={input.email}
              onChange={(e)=>setInput({...input,email:e.target.value})}
            />
          </FormControl>
          <FormControl  >
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Bio"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              value={input.bio}
              onChange={(e)=>setInput({...input,bio:e.target.value})}
            />
          </FormControl>
         
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'blue.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'blue.500',
              }}
              type='submit' isLoading={loading}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
      </form>
    )
  }