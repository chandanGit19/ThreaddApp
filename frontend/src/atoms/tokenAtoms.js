import { atom } from "recoil";

const tokenAuth = atom({
    key:"tokenAuth",
    default:JSON.parse(localStorage.getItem("token")),
})
export default tokenAuth;