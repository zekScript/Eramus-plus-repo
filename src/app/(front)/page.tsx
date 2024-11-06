


const Page: React.FC = () => {

  
  const text = "LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem LOREMLorem emipsum dolor sit amet consectetur, adipisicing elit. Atque facere voluptatem culpa? Nesciunt placeat reprehenderit incidunt, amet animi id numquam non, quam debitis dolorum ea accusantium aspernatur, impedit obcaecati corporis"

  

  return (
    <>
    
    {/* Main text */}
    <div className="mt-20 mb-20 ">
    <h1 className=" [text-shadow:_1px_2px_3px_rgba(0,0,0,0.2);] text-5xl font-medium text-center text-wrap"><span className="text-7xl text-blue-600">Hello</span> <span className="text-3xl">To my</span> <span className="text-7xl text-emerald-500 ">World</span></h1>
    </div>
    {/* Line */}
    <div className="w-4/12 [height:_0.4px] bg-black flex justify-center m-auto"></div>
    <div className="w-9/12 flex justify-center m-auto mt-4 ">
    {/* Content about me */}
    <p>{text}</p>
    </div>
    <h1 className="ml-12 mt-24 mb-4 text-4xl font-bold">Media</h1>
    <div className="w-56 mb-24 ml-12 [height:_0.4px] bg-black flex justify-center"></div>
    {/* Container for blog post */}

    <div className="w-9/12 m-auto  h-full grid grid-cols-3 gap-4 text-white">
    {/* Placeholder blog post  */}
      {/* Blog Post */}
      <div className="w-72 h-96 [border:_2px_solid_black] rounded-lg bg-neutral-500">
        
        <h1 className="text-center mt-3 [font-family: cursive] text-2xl font-bold [text-shadow:_1px_2px_3px_rgba(0,0,0,0.3);]">Blog 1</h1>
        {/* Posted User*/}
        <p className="ml-6  font-medium text-xs mt-3 [text-shadow:_1px_2px_2px_rgba(0,0,0,0.2);]">By Armandas</p>
        {/* Text Box */}
        <div className="text-black h-3/4 [border:_2px_solid_black] w-5/6 m-auto mt-1 mb-3 rounded-3xl text-sm font-extralight bg-gray-100">
        <p className="m-2">{text}</p>
        </div>
      </div>

      <div className="w-72 h-96 [border:_2px_solid_black] rounded-lg bg-neutral-500">
        
        <h1 className="text-center mt-3 [font-family: cursive] text-2xl font-bold [text-shadow:_1px_2px_3px_rgba(0,0,0,0.3);]">Blog 1</h1>
        {/* Posted User*/}
        <p className="ml-6  font-medium text-xs mt-3 [text-shadow:_1px_2px_2px_rgba(0,0,0,0.2);]">By Armandas</p>
        {/* Text Box */}
        <div className="text-black h-3/4 [border:_2px_solid_black] w-5/6 m-auto mt-1 mb-3 rounded-3xl text-sm font-extralight bg-gray-100">
        <p className="m-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, blanditiis hic eos nihil odit culpa alias quaerat esse animi voluptates accusantium facilis labore perferendis laborum? Pariatur corrupti voluptatem sit aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quidem similique, quasi quisquam alias reiciendis est odit! Nam deserunt accusamus reprehenderit cumque debitis modi aperiam doloremque repellendus! Doloremque, assumenda ab!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis voluptates nostrum cumque quia debitis pariatur enim commodi libero inventore, earum deserunt sunt ducimus illum, accusantium a veniam magnam provident eos.</p>
        </div>
      </div>

      <div className="w-72 h-96 [border:_2px_solid_black] rounded-lg bg-neutral-500">
        
        <h1 className="text-center mt-3 [font-family: cursive] text-2xl font-bold [text-shadow:_1px_2px_3px_rgba(0,0,0,0.3);]">Blog 1</h1>
        {/* Posted User*/}
        <p className="ml-6  font-medium text-xs mt-3 [text-shadow:_1px_2px_2px_rgba(0,0,0,0.2);]">By Armandas</p>
        {/* Text Box */}
        <div className="text-black h-3/4 [border:_2px_solid_black] w-5/6 m-auto mt-1 mb-3 rounded-3xl text-sm font-extralight bg-gray-100">
        <p className="m-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique, blanditiis hic eos nihil odit culpa alias quaerat esse animi voluptates accusantium facilis labore perferendis laborum? Pariatur corrupti voluptatem sit aspernatur. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae quidem similique, quasi quisquam alias reiciendis est odit! Nam deserunt accusamus reprehenderit cumque debitis modi aperiam doloremque repellendus! Doloremque, assumenda ab!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis voluptates nostrum cumque quia debitis pariatur enim commodi libero inventore, earum deserunt sunt ducimus illum, accusantium a veniam magnam provident eos.</p>
        </div>
      </div>

    </div>
    



    </>
  )
}
export default Page
