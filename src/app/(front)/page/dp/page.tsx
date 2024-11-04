import Link from "next/link"
import { MoveLeft } from "lucide-react"
import React from "react"

const Blog: React.FC = () =>{


      return(
            <>
      <div className="ml-16 mt-12">
            <Link className="flex gap-2" href="/"><MoveLeft />Home</Link>
            <div className="w-full h-full mt-5 flex-wrap ">
                  <h1>On Developer Products</h1>
                  <p className="ml-32 font-semibold mt-10">You should embrace open-source</p>
                  <p>Experienced developers love open-source products because they've seen the opposite. They've struggled to debug a “black box” closed-source tool, or worse, had a previously open tool change licenses or close its source code.</p>
                  <p className="ml-32 mt-10">New developers love open-source products because they're learning skills that help them advance in their career—their knowledge transfers from company to company. Open-source tools often have better documentation, as well.</p>
                  <h1 className="ml-32 mt-16">You should have a free tier</h1>
                  <p className="ml-32 mt-10">Developers don't want to talk to your sales team. They want to try out the product with as little friction as possible. Start free, then grow, once they've validated the product works and will solve their needs.</p>
                  <p className="ml-32 mt-10">There are exceptions to this rule. You might have procured software that required months of negotiations, license keys to get access, and hand guided provisioning of resources from a human. But ask your developer—they would have preferred if they could have started self-serve.</p>
            </div>
      </div>

            
            </>
      )
}
export default Blog;


