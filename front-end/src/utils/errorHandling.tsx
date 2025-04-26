import axios from 'axios'
import { toast } from 'react-toastify'

const handleError = (error:any)=>{
  
  if(axios.isAxiosError(error)){

    const errors = error.response?.data?.error
    const status = error.response?.status

    if(Array.isArray(errors)){
      errors.forEach((err)=>{
        toast.warning(err?.description || 'Something went wrong')
      })
      }else if(typeof errors === 'object' && errors!= null){
        Object.values(errors).forEach((err)=>{
          toast.warning(String(err))
        })
      }else if(status === 401){
        toast.error('Unauthorized!')
      }else{
        toast.error('An unexpected error occured')
      }
    }else{
      console.error('uknown error: ',error)
      toast.error('Something went wrong please try again')
    }
  
}

export { handleError }
