import { useEffect, useState } from "react"
import Userheader from "../component/Userheader"
import Userpost from "../component/Userpost"
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import tokenAuth from "../atoms/tokenAtoms";
import { Divider, Flex, Spinner } from "@chakra-ui/react";
import { getDecade } from "date-fns";
import Posts from "../component/Posts";
import postAtom from "../atoms/postsAtoms.js";
const UserPages = () => {
  const [user ,setUser] = useState(null);
  const {username} = useParams()
  const [posts,setPosts] = useRecoilState(postAtom)
  const [postLoading,setPostLoading] = useState(true)
  console.log(username)
  const token = useRecoilValue(tokenAuth)
  const [loading,setLoadng] = useState(true)

 useEffect(()=>{

  const getUser = async()=>{
    try {
      const res = await fetch(`http://localhost:5000/api/users/profile/${username}`,{
      headers:{
        "Content-Type":"application/json",
        "authorisation":`${token}`
      }  
    })
    const data = await res.json()
    console.log(data,"data of fetch possts")

    if(data.error){
      alert("can't get user now ")
      return
    }
    setUser(data.user)
      
    } catch (error) {
      console.log("error during fetching data userPage")
    }finally{
      setLoadng(false)
    }
  }

  const getPost = async()=>{
    
    try {
      const res = await fetch(`http://localhost:5000/api/posts/user/${username}`,{
        headers:{
          "Content-Type":"application/json",
          "authorisation":token
        }
      })

      const data = await res.json();
     setPosts(data.post)
      console.log(data,"data from get post funtion")
      
    } catch (error) {
      alert("error in geting the post")
      
    }finally{
      setPostLoading(false)
    }
  }

  getUser()
  getPost()


 },[username])
 console.log(user,"user daata to parse")

 if(!user && loading){
  return(
   <Flex justifyContent={"center"}>
     <Spinner size={"xl"}>

</Spinner>
   </Flex>
  )
 }

 if(!user) return <h1>User not find</h1>


  return (
    <>
    <Userheader user={user}/>

    {
      !postLoading && posts.length===0 &&(
        <h1>User have  not posted yet </h1>
      )
    }
      {
        postLoading && (
          <Flex justifyContent={"center"}>
            <Spinner/>
          </Flex>
        )
      }
      {
        posts.map((post)=>{
          return (<><Posts key={post._id} post={post} postedBy={post.postedBy}/>
          <Divider my={4}/>
          </>)
        })
      }
    </>
  )
}

export default UserPages
