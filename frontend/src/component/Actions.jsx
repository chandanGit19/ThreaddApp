import {Box, Flex, Text , Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	useDisclosure,
	Input,} from "@chakra-ui/react"
import { useState } from "react"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtoms"
import tokenAuth from "../atoms/tokenAtoms"
const Actions = ({post}) => {
	const user = useRecoilValue(userAtom);
	const token = useRecoilValue(tokenAuth)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [comment ,setComment] = useState("")

	const [liked ,setLiked] = useState(post?.likes.includes(user?._id))
	
	
	const [likestate,setLikeState] = useState(post?.likes)
	const [liking ,setLiking]= useState(false)

	const handelLikeAndUnlike = async()=>{
		if(liking) return

		setLiking(true)

		try {
			const res = await fetch("https://threaddapp.onrender.com/api/posts/like/"+post._id,{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"authorisation":token
				},
			})

			const data = await res.json();

			if(data.error){
				alert(data.error);
				return
			}

			console.log(data)
			if(!liked){
				setLikeState([...likestate,user._id]);
				setLiked(true)
				alert("post liked")


			}else{
				setLikeState(likestate.filter((e)=>e!==user._id))
				setLiked(false)
				alert("unliked")

			}
			
		} catch (error) {
			
		}finally{
			setLiking(false)
		}
	}
	const handelInput= (e)=>{
		const text  = e.target.value;
		if(text.lenght > 60){
			const text1 = text.splice(0,200);
			setComment(text1)
		}else{
			setComment(text)
		}
	}

	const handelComment = async()=>{
		if(liking) return

		setLiking(true)
		try {
			const res =await fetch("http://localhost:5000/api/posts/reply/"+post._id,{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"authorisation":token
				},
				body:JSON.stringify({text:comment,})
			});

			const data = await res.json()

			if(data.error){
				alert(data.error)
			}
			onClose()
			setComment("")

			alert("comment added")
			

			console.log(data)
		} catch (error) {
			
		}finally{
			setLiking(false)
		}
	}



  return (
    <Flex flexDirection='column'>
			<Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
				<svg
					aria-label='Like'
					color={liked ? "rgb(237, 73, 86)" : ""}
					fill={liked ? "rgb(237, 73, 86)" : "transparent"}
					height='19'
					role='img'
					viewBox='0 0 24 22'
					width='20'
					onClick={handelLikeAndUnlike}
                    // onClick={()=>setLiked(!liked)}
				>
					<path
						d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
						stroke='currentColor'
						strokeWidth='2'
					></path>
				</svg>

				<svg
					aria-label='Comment'
					color=''
					fill=''
					height='20'
					role='img'
					viewBox='0 0 24 24'
					width='20'
					onClick={onOpen}
				>
					<title>Comment</title>
					<path
						d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
						fill='none'
						stroke='currentColor'
						strokeLinejoin='round'
						strokeWidth='2'
					></path>
				</svg>


				
			</Flex>
			
			<Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"} fontSize={"sm"}>
                 {post?.replies?.length} replies
                </Text>
                <Box w={2} h={2} borderRadius={"full"} bg={"gray"}></Box>
                <Text color={"gray.light"}>
                    {post?.likes?.length} Likes
                </Text>
            </Flex>
			<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add comment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Lorem count={2} /> */}
			<Input type="text" value={comment} onChange={handelInput} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handelComment}>Comment</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
		</Flex>
  )
}

export default Actions
