//'use client';
import { useRouter } from 'next/navigation'; 
import { RiHome2Line } from "react-icons/ri";
const Navigation = () =>{
    const router = useRouter();

    return(
        <div className="flex justify-center space-x-4 my-4">
        <button
          className="p-2 text-xl hover:bg-gray-200 rounded"
          onClick={() => router.push('/')}
        >
          <RiHome2Line />
        </button>
      </div>
    )
};

export default Navigation;