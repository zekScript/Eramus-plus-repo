import Link from "next/link"



const Page: React.FC = () => {

  


  return (
    <>
    <div className="ml-10 mt-24 h-full flex justify-center w-full flex-col">
  <h1>Armandas Latanauskas</h1><br></br>
    <p className="w-5/12 ml-16">I'm a frontend developer, motivated, optimist programmer. I'm currently unemployed, and looking to learn more about programming and discover new things </p>
    {/* Content to blogs */}
      <ul className="ml-32 mt-10">
        {/* Placeholder */}
        <h1>My Portfolio</h1>
        <Link href="/blog1"><li>On developer experience</li></Link>
        <Link href="/blog2"><li>On Developer Marketing</li></Link>
        <Link href="/blog3"><li>On Developer Relations</li></Link>
        <Link href="/blog4"><li>Blog 4</li></Link>
        <Link href="/blog5"><li>Blog 5</li></Link>
        <Link href="/blog6"><li>Blog 6</li></Link>

      </ul>
    </div>
    </>
  )
}
export default Page
