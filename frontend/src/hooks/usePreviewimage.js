import { useState } from 'react'

const usePreviewimage = () => {
    const [imageUrl ,setImageUrl] = useState("")
    const [uploadimg,setUploadimg] = useState("")

    const handelImage=(e)=>{
        console.log('any thing')
        const file = e.target.files[0];
        setUploadimg(file)
        console.log(file)
        if(file && file.type.startsWith("image/")){
            var reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend=()=>{
                // console.log("readaaer dat",reader.result)
                setImageUrl(reader.result);
            }
            
            
        }else{
            alert("please provide correct file type/image")
            setImageUrl("")
        }
        
       
    }
    // console.log("image url is",imageUrl)
    console.log(uploadimg,"upload this")


  return {handelImage,imageUrl,setImageUrl}
}

export default usePreviewimage