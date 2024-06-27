import { Avatar, Box, Button, Divider, Flex, Image, Spinner, Text,Link } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "../component/Actions"
import { useEffect, useState } from "react"
import Coment from "../component/Coment"
import { useRecoilValue } from "recoil"
import tokenAuth from "../atoms/tokenAtoms"
import { useParams } from "react-router-dom"
import { formatDistanceToNow } from "date-fns"
import userAtom from "../atoms/userAtoms"
import { Link as lo } from "react-router-dom"

const PostPage = () => {
  const token = useRecoilValue(tokenAuth)
  const currentUser = useRecoilValue(userAtom)
  const {pid} = useParams()
  const [loading,setLoading]=useState(true)
  const [post,setPost]= useState("")

  const getUser = async()=>{
    try {
    const res =  await fetch("http://localhost:5000/api/posts/"+pid,{
      headers:{
        "Content-Type":"application/json",
        "authorisation":token
      }
    })
    const data =await res.json();
    if(data.error){
      alert(data.error)
    }

    setPost(data.post)
    console.log("data of post pages",data)
      
    } catch (error) {
      console.log("can't fetch data error ")
      
    }finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getUser()
  },[pid])

  if(!post) return null

  return (
    <>

    {

    }
    <Flex>
      <Flex w={"full"} alignItems={"center"} gap={3}>
        <Link as={lo} to={`/${post.postedBy.username}`}>
        <Avatar src={post?.postedBy.profilePic} name={post?.postedBy.username}/>
        </Link>
        <Flex alignItems={"center"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
          {post?.postedBy.username}
          </Text>
          <Image src="/verified.png" w={4} h={4} ml={2}/>
        </Flex>

      </Flex>

      <Flex gap={4} alignItems={"center"}>
        <Text fontSize={"sm"} whiteSpace={"nowrap"} color={"gray.light"}> {formatDistanceToNow(new Date(post.createdAt)) } ago</Text>
        <BsThreeDots/>
      </Flex>
    </Flex>

    <Text fontSize={"large"} mt={10}>
      {post?.text}
    </Text>

    {
      post?.img &&(
        <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image
                src="/post1.png"
                />
                
            </Box>
      )
    }

            <Flex gap={3} my={3}>
           <Actions post={post} postedBy={post.postedBy}/>
            </Flex>
            
            <Flex gap={3} alignItems={"center"}>
              <Text>
               {/* {post?.replies.length} {" "}replies */}
              </Text>
              {/* <Box w={2} h={2} borderRadius={"full"} bg={"gray"}></Box> */}
              <Box>
                <Text>
                  {/* {post.likes.length +" "} likes */}
                </Text>
              </Box>

            </Flex>
      <Divider my={4}/>

      <Flex justifyContent={"space-between"} >
        { !currentUser ? (<>
          <Flex gap={2} alignItems={"center"}><Text fontSize={"2xl"}>✌️</Text><Text color={"gray.light"}>Create a account to like ,reply,and post</Text></Flex>
          <Button>
              Get
          </Button>
          </> ) :(
            <>
            <Flex gap={2} alignItems={"center"}><Text fontSize={"2xl"}>✌️</Text><Text color={"gray.light"}>Read and Write the comments</Text></Flex>
            <Button>
                Get
            </Button>
            </> 
            

          )}
      </Flex>
      <Divider my={4}/>
      {
        post.replies.map((reply)=>{
          return <Coment key={reply._id} reply={reply} />
        })
      }
    </>
  )
}

export default PostPage
