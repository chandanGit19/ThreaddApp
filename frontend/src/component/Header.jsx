import { Flex, Image, Link, useColorMode } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtoms"
import { Link as linkhai } from "react-router-dom"
import {AiFillHome} from 'react-icons/ai'
import {RxAvatar} from 'react-icons/rx'


const Header = () => {

           const {colorMode,toggleColorMode} = useColorMode()
           const currentUser = useRecoilValue(userAtom)

  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {currentUser && (
        <Link as={linkhai} to="/">
        <AiFillHome/>
        </Link>
      )}
        <Image
        cursor={"pointer"}
        alt="logo"
        w={6}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
        />

      {currentUser && (
        <Link as={linkhai} to ={`/${currentUser.username}`}>
        <RxAvatar/>
        </Link>
      )}

    </Flex>
  )
}

export default Header
