import { Avatar, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"
import { formatDistanceToNow } from "date-fns"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtoms"
import { DeleteIcon } from "@chakra-ui/icons"
import tokenAuth from "../atoms/tokenAtoms"

const Coment = ({reply}) => {
    const [liked,setLiked]=useState(false)
    
    const currentUser = useRecoilValue(userAtom)
    const token = useRecoilValue(tokenAuth)

    const handleDeletPost = async()=>{
        try {
            const res = await fetch("http://localhost:5000/api/posts/")
        } catch (error) {
            
        }
    }


  return (
    <>
    <Flex gap={4} py={2} my={3} w={"full"}>
        <Avatar src={reply.profilePic} size={"sm"}/>
        <Flex gap={1} w={"full"} flexDirection={"column"}>
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                <Text>
                    {reply?.username}
                </Text>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} whiteSpace={"nowrap"} color={"gray.light"}>
                       few time ago
                    </Text>
                    {
                        currentUser?._id ===reply?._id && (
                            <DeleteIcon size={20} onClick={handleDeletPost}/>
                        )
                    }
                   

                </Flex>
            </Flex>

            <Text>
                {reply.text}
            </Text>

        </Flex>

    </Flex>
      
    </>
  )
}

export default Coment
