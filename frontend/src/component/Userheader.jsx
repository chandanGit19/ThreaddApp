import { Avatar, Box, Button, Flex, Link, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from "@chakra-ui/react"
import {BsInstagram} from "react-icons/bs"
import {CgMoreO} from "react-icons/cg"
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtoms";
import { Link as chalo } from "react-router-dom";
import { useState } from "react";
import tokenAuth from "../atoms/tokenAtoms";

const Userheader = ({user}) => {
    const toast = useToast();
    console.log("user in headercomponent",user)

    const currentUser = useRecoilValue(userAtom);// loged in 
    const [following,setFollowing] = useState(user.followers.includes(currentUser?._id))
    const [updating,setUpdating]=useState(false);


    console.log(currentUser?._id,"current user")
    const token = useRecoilValue(tokenAuth);


    const copyUrl =()=>{
        const currentUrl =window.location.href;
        navigator.clipboard.writeText(currentUrl).then(()=>{
            console.log("hello")
            alert("link copied")
            // toast({
            //     title: 'link copied.',
            //     description: "profile link copies.",
            //     status: 'success',
            //     duration: 5000,
            //     isClosable: true,
            //   })
        })
    };

    const handelFollow = async()=>{
        setUpdating(true)
        try {
            const res = await fetch(`https://threaddapp.onrender.com/api/users/follow/${user?._id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorisation": token,
                }
            })
            const data =await res.json();
            if(data.error){
                alert(data.error)
                return
            }
            
            console.log(data)
            if(following){
                alert(`followed ${user?.name}`);
                user.followers.pop()
            }else{
                alert(`unfollow ${user.name}`);
                user.followers.push(user?._id)
        }
        setFollowing(!following)

            
        } catch (error) {
            alert("can't follow or unfolllow now")
        }finally{
            setUpdating(false)
        }
    }



  return (
   <VStack gap={4} alignItems={"start"}>
    <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
               {user?.name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"sm"}>
                {user?.username}
                </Text>
                <Text fontSize={"sm"} bg={"gray"} color={"gray.light"} p={1} borderRadius={"full"}>
                   thread.next
                </Text>

            </Flex>
        </Box>
        <Box>
            {
                user?.profilePic &&<Avatar
                name={user?.name}
                src={user?.profilePic}
                />
            }
            {
                !user?.profilePic && <Avatar
                name="Mark Zuckerberg"
                src="https://bit.ly/broken-link"
                />
            }
        </Box>

    </Flex>

    <Text>
    {user?.bio}
    </Text>
    
    {currentUser?._id === user?._id && (
        <Link as={chalo} to="/updateProfile">
            <Button size={"sm"}>
                Update profile
            </Button>
        </Link>
    )}

{currentUser?._id !== user?._id && (
            <Button size={"sm"} onClick={handelFollow} isLoading={updating}>
                {following ? "UnFollow" : "Follow"}
            </Button>
    )}




    <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>{user?.followers?.length} followers</Text>
            <Box w={1} h={1} bg={"gray"} borderRadius={"full"}></Box>
            <Link color={"gray.light"}>intagram.com</Link>
        </Flex>
        <Flex>
            <Box className="icon-container">
                <BsInstagram size={24} cursor={"pointer"}/> 
            </Box>
            <Box className="icon-container">
           <Menu>
            <MenuButton>
            <CgMoreO size={24} cursor={'pointer'}/>
            </MenuButton>
            <Portal>
                <MenuList>
                    <MenuItem onClick={copyUrl}>Copy Link</MenuItem>
                </MenuList>
            </Portal>
           </Menu>
            </Box>
        </Flex>
    </Flex>
    <Flex w={"full"}>
        <Flex flex={1} borderBottom={"2px solid #6e6d6d"} justifyContent={"center"}  pb={3} cursor={"pointer"}>
            <Text>
                Threads
            </Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"}  pb={3} cursor={"pointer"}>
            <Text>
                Thr
            </Text>
        </Flex>

    </Flex>
    {/* <Box>box1</Box>
    <Box>box1</Box>
    <Box>box1</Box> */}
   </VStack>
  )
}

export default Userheader
