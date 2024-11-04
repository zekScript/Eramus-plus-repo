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
                  <p className="ml-32 font-semibold mt-10">What does great developer marketing look like?</p>
                  <h1 className="ml-32 font-sans mt-16">Teaches how to build great products</h1>
                  <p className="ml-32 font-sans mt-10">When developers use a great tool, they're curious about how it's built. The best developer marketing taps into this curiosity.</p>
                  <p className="ml-32 font-sans mt-10">What technology choices helped craft this product experience? It often comes down to the implementation (even great tools can be paired with skill issues), but they want to learn more.</p>
                  <p className="ml-32 font-sans mt-10">Your product is your best marketing. Explain how you built an exceptional product with your own technology. Share how your customers were able to do the same.</p>
                  <p className="ml-32 font-sans mt-10">Once you've captured their interest with your product, you keep developers engaged by focusing on the <Link href="/page/dx" className="text-blue-700">developer experience.</Link> Write docs worth sharing, filled with helpful diagrams and detailed descriptions. Create code examples and templates that help them get started quickly.</p>
                  

            </div>
      </div>

            
            </>
      )
}
export default Blog;


