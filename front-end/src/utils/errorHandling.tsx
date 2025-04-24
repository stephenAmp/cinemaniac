import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const handleError = (error:any)=>{
  
  const navigate = useNavigate()
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
        toast.error('Unauthorized! Please log in')
        navigate('/login')
      }else{
        toast.error('An unexpected error occured')
      }
    }
  
}

export { handleError }





// import axios from 'axios';

// export const handleLoginError = (err: unknown): string => {
//   if (axios.isAxiosError(err)) {
//     if (err.response) {
//       const message = err.response.data.message || 'An error occurred';
//       return message;
//     } else if (err.request) {
//       return 'No response received from server';
//     } else {
//       return 'An error occurred while processing the request';
//     }
//   } else if (err instanceof Error) {
//     return (err.message || 'An unexpected error occurred');
//   }
//   return 'An unknown error occurred';
// };
