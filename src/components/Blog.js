
import { useRef, useEffect, useState } from "react"


const BlogPost = () => {

    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Months are 0-based, so adding 1
    const year = today.getFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
  
    console.log(formattedDate); // Output: 19/8/2023


    const greet = ()=>{
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
      
        if (currentHour >= 5 && currentHour < 12) {
          return "Good Morning";
        } else if (currentHour >= 12 && currentHour < 17) {
          return "Good Afternoon";
        } else if (currentHour >= 17 && currentHour < 21) {
          return "Good Evening";
        } else {
          return "Good Night";
        }
       }

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


    return (
        <div className="grid mb-10 md:mb-12 md:grid-cols-1">

            <div className=" grid mb-12 border shadow-gray-400 md:mb-12 md:grid-cols-1">
                <div className="grid mb-12 md:mb-12 md:grid-cols-1 px-4">
                    <h1 className='text-center mb-2 text-2xl font-bold text-gray-900 dark:text-white py-4'>{greet()} Readers!</h1>
                </div>
                <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                  <h2 class="mb-2 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Blog</h2>
              </div> 
            </div>

            {listdata?.map((row, index) => (
                <section class="bg-white dark:bg-gray-900">
                    <div key={index} class="mx-auto max-w-screen-xllg:px-6">

                        <div class="grid gap-8 lg:grid-cols-2">
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
                </section>
            ))}
        </div>

    )
}

export default BlogPost