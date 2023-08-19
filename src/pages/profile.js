import { getSession, signOut } from "next-auth/react"
import { useRef, useState, useEffect } from "react";

export default function SignUp({ onFormSubmit }) {

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    // console.log(formattedDate); //Format  19/8/2023
 
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [listdata, setlistdata] = useState([])
  const [newitem, setnewitem] = useState(0)


  useEffect(() => {
    showDetails()
  }, [newitem])

  const showDetails = async () => {
    try {
      const response = await fetch("/api/blogs/");
      if (response.ok) {
        const data = await response.json();
        setlistdata(data);
        console.log("Fetched data:", data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    if(!title , !description){
      alert("Please Enter Title and Description to add Blog✅")
    }
    else if(title.length && description.length <= 50){
      alert("Pease Enter Atlease 50 Characters")
    }
    else{
      onSubmit(title, description)
      titleRef.current.value = ''
      descriptionRef.current.value = ''

    }
    
  }



  const onSubmit = async (title, description) => {
    try {
      const response = await fetch("/api/blogs/", {
        method: "POST",
        body: JSON.stringify({ title, description }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.ok) {
        
        let i = newitem + 1
        setnewitem(i)
      }
    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

<div className="grid mb-12 md:mb-12 md:grid-cols-1 px-1">
                <div className=" flex px-1 flex-row justify-between">
                    <h1 className='mb-2 text-2xl font-bold text-gray-900 dark:text-white py-2'>Dashboard</h1>
                    <button onClick={signOut}
            className="items-right text-white bg-purple-600 dark:text-white focus:ring-2 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-0  focus:outline-none">
              Log out</button>
                </div>

      
      </div>  


      <form onSubmit={onSubmitHandler} className="w-2/4" >
        <div className="mb-6">
          <label for="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
          <input
          placeholder="Enter Blog Title ..."
            type="text"
            id="default-input"
            ref={titleRef}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
            focus:shadow-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div className="mb-6">
          <label for="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
          <textarea style={{ resize: 'none' }}
            placeholder="What is in your mind"
            ref={descriptionRef}
            type="text" id="large-input" className="block pb-10 w-full p-4 text-gray-900 border border-gray-300 bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <button onClick={onSubmitHandler} className="text-white   my-2 bg-purple-600 dark:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none dark:focus:ring-gray-800">ADD Blog</button>


      </form>

      <div>
       
          <div>
              <h2 className="text-lg"></h2>

              <p></p>
          </div>

          <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                  <h2 class="mb-2 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
              </div> 
       
          {listdata?.map((row, index) => (
         
            <div  class="mx-auto max-w-screen-xllg:px-6">
              
                <div className="grid gap-8 lg:grid-cols-2">
                    <article class="my-3 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div class="flex justify-between items-center mb-5 text-gray-500">
                            <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                <svg class="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
                                Tutorial
                            </span>
                            <span class="text-sm">Date : {formattedDate}</span>
                        </div>
                        <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{row.title}</h2>
                        <p class="mb-5 font-light text-gray-500 dark:text-gray-400">{row.description}</p>
                        <div class="flex justify-between items-center">
                            <div class="flex items-center space-x-4">
                                <img class="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
                                <span class="font-medium dark:text-white">
                                    Jese Leos
                                </span>
                            </div>
                            <a href="#" class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                Read more
                                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </a>
                        </div>
                    </article> 
  
                </div>  
            </div>
          ))}
        </div>
    </div>
  )
};

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}