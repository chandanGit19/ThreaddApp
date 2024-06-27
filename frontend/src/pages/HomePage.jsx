import { Button, Flex, Spinner, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useRecoilValue } from "recoil"
import tokenAuth from "../atoms/tokenAtoms"
import Posts from "../component/Posts"

const HomePage = () => {
  const token = useRecoilValue(tokenAuth)
  const [post ,setPost] = useState();
  const [notFollowPost ,setNotFollowPost] = useState()
  // console.log(token,"in homepage")
  const [loading,setLoading] = useState(true)


  useEffect(()=>{
    const getPosts = async() =>{
      try {
        const res = await fetch("https://threaddapp.onrender.com/api/posts/All/feed",{
          headers:{
            "Content-Type":"application/json",
            "authorisation":token,
          }
        })

        const data = await res.json();
        if(data.error){
          alert("someThing is broken")
        }

        setPost(data.feedPost)
        setNotFollowPost(data.feedPostNotFolluw)

        console.log(data,"feeed post")
        
      } catch (error) {
        
      }finally{
        setLoading(false)
      }

    }

    getPosts()
  },[])

  if(!post) return
  return (
    <>
    {loading && (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl "}></Spinner>
      </Flex>
    )}

    {
      !loading && post.length ===0 &&(
       <Text color={"pink"} mb={"40px"}  textAlign={"center"} my={"9px"} fontSize={"20px"} fontWeight={"bold"}>
        Follow some user to see the feeds
       </Text>
      )
    }

    {
      post.map((post)=>{
        return(<Posts key={post._id} post={post} postedBy={post.postedBy}/>)
        
      })
    }
        {
              !loading && notFollowPost.length ===0 &&(
              <h1>
               There is no user that you don't Follow on this application
               </h1>
      )
    }

               {
              !loading && notFollowPost.length !==0 &&(
              <Text color={"pink"} textAlign={"center"} my={"9px"} fontSize={"20px"} fontWeight={"bold"} borderLeft={"2px solid pink"} borderBottom={"2px solid pink"} borderRadius={"20px"}>
                 News post from people you don't Follow
              </Text>
                    )
                }
    
    {
      notFollowPost.map((post)=>{
        return(<Posts key={post._id} post={post} postedBy={post.postedBy}/>)
        
      })


    }
      
    </>
  )
}

export default HomePage
