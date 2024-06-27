import authScreenAtom from "../atoms/authAtoms"
import LoginCarrd from "../component/LoginCard"
import SignupCard from "../component/SignupCart"
import {useRecoilValue} from "recoil"

const AuthPages = () => {
    const authScreenState = useRecoilValue(authScreenAtom);

    

  return (
    <div>
        {/* <SignupCard/>
        <LoginCarrd/> */}
       
        {authScreenState ==="login" ? <LoginCarrd/> : <SignupCard/>}
      
    </div>
  )
}

export default AuthPages
