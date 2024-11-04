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
                  <p className="ml-32 font-semibold mt-10">Be kind</p>
                  <p>Always be kind, even when enforcing rules.</p>
                  <p className="ml-32 font-sans mt-10">This can be difficult. Address issues with empathy and understanding. This compassion can (and should) coexist with firmness. Clearly explain why moderation actions were taken, and if relevant, link back to the code of conduct.</p>
                  <p className="ml-32 font-sans mt-10">When addressing negative feedback, be exceptionally detailed in your response. Be calm, factual, and empathetic to their concerns.</p>

                  <h1 className="ml-32 font-sans mt-16">2. Build long-term relationships</h1>

                  <p className="ml-32 font-sans mt-10">Community trust is slowly built over time. There isn't a shortcut or hack.</p>
                  <p className="ml-32 font-sans mt-10">Give the community more than you take. For example, you should be adding value in 90% of the conversations or interactions you have (e.g., being helpful, answering questions) and only 10% asking for things (e.g., read our new blog post, try the product).</p>
                  <p className="ml-32 font-sans mt-10">When community members do wonderful things, celebrate them. Highlight their work, give them kudos, maybe even offer some swag.</p>
                  <h1 className="ml-32 font-sans mt-16">3. Don't stop the conversation too soon</h1>
                  <p className="ml-32 font-sans mt-10">Resist the temptation to overly moderate. Some tension is natural — it encourages open dialogue and different perspectives.</p>
                  <p className="ml-32 font-sans mt-10">If discussions turn into dogpiling, consider closing them and providing more focused next steps based on the feedback.</p>
                  <h1 className="ml-32 font-sans mt-16">Mostly mute, rarely block</h1>
                  <p className="ml-32 font-sans mt-10">If possible, mute before blocking — this minimizes escalations from upset members after being blocked and creates a less hostile environment. Blocking should be a last resort.</p>


            </div>
      </div>

            
            </>
      )
}
export default Blog;


