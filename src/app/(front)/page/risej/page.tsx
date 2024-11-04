import Link from "next/link"
import { MoveLeft } from "lucide-react"
import React from "react"

const Blog: React.FC = () =>{


      return(
            <>
      <div className="ml-16 mt-12">
            <Link className="flex gap-2" href="/"><MoveLeft />Home</Link>
            <div className="w-full h-full mt-5 flex-wrap ">
                  <h1>On developer experience</h1>
                  <p className="ml-32 font-semibold mt-10">Here's what I believe creates a great Developer Experience:</p>
                  <p>Make onboarding fast: You should be able to try a new tool in one command. For example, npx create-next-app or brew install bat. Then, should it quick to iterate and see the value of the tool, with fast feedback loops to the developer.</p>
                  <p></p>
            </div>
      </div>

            
            </>
      )
}
export default Blog;


