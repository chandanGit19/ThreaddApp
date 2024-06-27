import { Button } from "@chakra-ui/react"
import { useResetRecoilState, useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtoms"
import tokenAuth from "../atoms/tokenAtoms"

const Loginbutton = () => {

    const setUser=useSetRecoilState(userAtom)
    const setToken = useResetRecoilState(tokenAuth)

    const handleLogout = async()=>{
        try {
           
            const res = await fetch("https://threaddapp.onrender.com/api/users/logout",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
            })
            const data = await res.json()

            console.log(data)
            if(data.error){
                alert(`${data.error}`)
            }
            localStorage.removeItem("user-threads")
            localStorage.removeItem("token")
            setToken(null)
            setUser(null)
            
        } catch (error) {
            console.log("can't log out")
        }
    }

  return (
    <Button
    position={"fixed"}
    top={"50px"}
    right={"10px"} onClick={handleLogout}>
        Logout
      
    </Button>
  )
}

export default Loginbutton
