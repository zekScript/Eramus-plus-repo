import Link from "next/link"



const Page: React.FC = () => {

  


  return (
    <>
    <div className="ml-10 mt-24 h-full flex justify-center w-full flex-col">
  <h1>Armandas Latanauskas</h1><br></br>
    <p className="w-5/12 ml-16">I'm a frontend developer, motivated, optimist programmer. I'm currently unemployed, and looking to learn more about programming and discover new things </p>
    {/* Content to blogs */}
    <h1 className="font-semibold text-2xl mr-4 relative mt-4">My Portfolio</h1>
      <ul className="ml-32 mt-10 g">
        {/* Placeholder */}
        <Link href="/page/dx"><li>On developer experience</li></Link>
        <Link href="/page/dm"><li>On Developer Marketing</li></Link>
        <Link href="/page/dr"><li>On Developer Relations</li></Link>
        <Link href="/page/dp"><li>On Developer Products</li></Link>
        <Link href="/page/cm"><li>On Community Moderation</li></Link>
        <Link href="/page/risej"><li>Rust is Eating JavaScript</li></Link>

      </ul>
    </div>
    </>
  )
}
export default Page
