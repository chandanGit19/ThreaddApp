import { AddIcon } from "@chakra-ui/icons"
import { Button, CloseButton, Flex, FormControl, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import usePreviewimage from "../hooks/usePreviewimage"
import { BsFillImageFill } from "react-icons/bs"
import { useRecoilState, useRecoilValue } from "recoil"
import tokenAuth from "../atoms/tokenAtoms"
import userAtom from "../atoms/userAtoms"
import postAtom from "../atoms/postsAtoms"

const Createpost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText ,setPostText]= useState("")
    const [remaining,setRemaning] = useState(500)
    const token = useRecoilValue(tokenAuth);
    const user = useRecoilValue(userAtom)
    const [loading ,setLoadng] = useState(false)
    const [postss,setPostss] = useRecoilState(postAtom)

    const ImageRef = useRef(null);


    const {handelImage,imageUrl,setImageUrl} =usePreviewimage()

    const handelTextChange=(e)=>{
        const inputtext = e.target.value;

        if(inputtext.length > 500){
            const truncatedText = inputtext.slice(0,500);
            setPostText(truncatedText)
        }else{
            setPostText(inputtext)
            setRemaning(500-inputtext.length)
        }


    }

    const handleCreatePost= async()=>{
        if(loading) return
        setLoadng(true)
        try {
            const res = await fetch("http://localhost:5000/api/posts/create",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "authorisation":token
                },
                body:JSON.stringify({postedBy:user._id,text:postText ,img:imageUrl})
            })

            const data = await res.json()
           setPostss([data.postss,...postss])
            if(data.error){
                alert(`${data.error}`)
                return
            }
console.log(data,"post created")
            alert("post created successfuly")
            onClose()
            setPostText("")
            setImageUrl("")


        } catch (error) {
            
        }finally{
            setLoadng(false)
        }

    }

  return (
    <>
    <Button position={"fixed"} bottom={10} right={10} leftIcon={<AddIcon/>} onClick={onOpen}>
       Post
    </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
                <Textarea placeholder="post content here" 
                onChange={handelTextChange}
                value={postText}
                />
                <Text fontSize={'xs'} fontWeight={"bold"} textAlign={"right"}>
                    {remaining}/500
                </Text>

                <input type="file" hidden  onChange={handelImage} ref={ImageRef}/>

                <BsFillImageFill style={{marginLeft:"5px",cursor:"pointer",}} size={16} onClick={()=>ImageRef.current.click()}/>


            </FormControl>
            {imageUrl && (
                <Flex mt={5} w={"full"} position={"relative"} >
                    <img src={imageUrl} w="full"/>
                    <CloseButton
                    position={"absolute"}
                    top={2}
                    right={2}
                    onClick={()=>setImageUrl("")}
                    />

                </Flex>
            )}
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button  colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                Post
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </>
  )
}

export default Createpost
