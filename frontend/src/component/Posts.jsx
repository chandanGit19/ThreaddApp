import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import Actions from "./Actions"
import { useState } from "react"
import { formatDistanceToNow} from "date-fns"
import { DeleteIcon } from "@chakra-ui/icons"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtoms"
import tokenAuth from "../atoms/tokenAtoms"
import postAtom from "../atoms/postsAtoms"

const Posts = ({post,userId}) => {
    const navigate = useNavigate()
    const currentUser = useRecoilValue(userAtom)
    const token = useRecoilValue(tokenAuth)
    const [posts,setPost] = useRecoilState(postAtom)

    const handleDeletPost = async(e)=>{
        
        try {
            e.preventDefault();
            if(!window.confirm("are you sure you want to delet")) return
            const res = await fetch("http://localhost:5000/api/posts/"+post._id,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json",
                    "authorisation":token
                }
            })

            const data = await res.json()

            console.log("delete the data" ,data)
            alert("delete successfully")
            setPost(posts.filter((e)=> e._id !== post._id));

        } catch (error) {
            console.log("can't delet now")
        }
    }



  return (
    <Link to={`/${post.postedBy.username}/post/${post._id}`}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar
                size={"md"} name="mark-zuckerberg" src={post?.postedBy?.profilePic}
                onClick={(e)=>{
                    e.preventDefault();
                    navigate(`/${post.postedBy.username}`)
                }}
                />
                <Box w={"1px"} h={"full"} bg={"white"} my={2}>

                </Box>
                <Box position={"relative"} w={"full"}>
                    {
                        post.replies.length ===0 &&(
                            <Text textAlign={"center"}>
                                😒
                            </Text>
                        )
                    }
                   {
                    post.replies.length > 0 && (<>
                        <Avatar
                        size={"xs"} src="https://bit.ly/dan-abramov" position={"absolute"} top={"0px"} left={"13px"} padding={"2px"}
                        />
                        <Avatar
                        size={"xs"} src="https://bit.ly/sage-adebayo" position={"absolute"} bottom={"0px"} right={"-4px"} padding={"2px"}
                        />
                        <Avatar
                        size={"xs"} src="https://bit.ly/prosper-baba" position={"absolute"} bottom={"0px"} left={"0px"} padding={"2px"}
                        />
                        </>
                    )
                   }

                </Box>

            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"} w={"full"}>
                <Flex w={"full"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}
                     onClick={(e)=>{
                        e.preventDefault();
                        navigate(`/${post.postedBy.username}`)
                    }
                }
                    >
                        {post?.postedBy?.username}
                    </Text>
                    {
                        post.postedBy.followers.length > 2 && (<Image src="/verified.png" w={4} h={4} ml={1}/>)
                    }
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} whiteSpace={"nowrap"} color={"gray.light"}>
                       {formatDistanceToNow(new Date(post.createdAt)) } ago
                    </Text>
                    {
                        currentUser?._id ===post.postedBy._id && (
                            <DeleteIcon size={20} onClick={handleDeletPost}/>
                        )
                    }
                   

                </Flex>

            </Flex>

            <Text fontSize={"sm"} >
           {post?.text}
            </Text>
            {
                post?.img &&(
                    <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image
                w={"full"}
                src={post.img}
                />
                
            </Box>
                )
            }
            <Flex gap={3} my={1}>
                 <Actions post={post}/>
            </Flex>
            
            



            </Flex>

        </Flex>
      
    </Link>
  )
}

export default Posts
