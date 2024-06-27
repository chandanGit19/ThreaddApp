import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import { Link } from "react-router-dom"
import Actions from "./Actions"
import { useState } from "react"

const Userpost = () => {
    const [liked,setLiked]=useState(false)
  return (
    <Link to={"/mark/post/1"}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar
                size={"md"} name="mark-zuckerberg" src="/zuck-avatar.png"
                />
                <Box w={"1px"} h={"full"} bg={"white"} my={2}>

                </Box>
                <Box position={"relative"} w={"full"}>
                    <Avatar
                    size={"xs"} src="https://bit.ly/dan-abramov" position={"absolute"} top={"0px"} left={"13px"} padding={"2px"}
                    />
                    <Avatar
                    size={"xs"} src="https://bit.ly/dan-abramov" position={"absolute"} bottom={"0px"} right={"-4px"} padding={"2px"}
                    />
                    <Avatar
                    size={"xs"} src="https://bit.ly/dan-abramov" position={"absolute"} bottom={"0px"} left={"0px"} padding={"2px"}
                    />

                </Box>

            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"} w={"full"}>
                <Flex w={"full"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        MarkZuckerberg
                    </Text>
                    <Image src="/verified.png" w={4} h={4} ml={1}/>
                </Flex>
                <Flex gap={4} alignItems={"center"}>
                    <Text fontStyle={"sm"} color={"gray.light"}>
                        1d
                    </Text>
                    <BsThreeDots/>

                </Flex>

            </Flex>

            <Text fontSize={"sm"} >
           This is my first post
            </Text>
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image
                src="/post1.png"
                />
                
            </Box>
            <Flex gap={3} my={1}>
                 <Actions liked={liked} setLiked={setLiked}/>
            </Flex>
            
            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"} fontSize={"sm"}>
                 123 replies
                </Text>
                <Box w={2} h={2} borderRadius={"full"} bg={"gray"}></Box>
                <Text color={"gray.light"}>
                    456 Linkes
                </Text>
            </Flex>



            </Flex>

        </Flex>
      
    </Link>
  )
}

export default Userpost
