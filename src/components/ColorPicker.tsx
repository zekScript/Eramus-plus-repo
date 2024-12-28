import ColorPalletes from "./colorPalletes";



const ColorPicker = () => {
      

      return(
            <>
            <div className="flex flex-col">
            <p className="font-normal text-sm mt-12 mb-3 ">Portfolio colors</p>
            {/* Color Template boxes */}
            <div className="grid grid-cols-3 gap-1 lg:grid-cols-7 md:grid-cols-4 md:gap-4 lg:gap-1">
                  {/* Color boxes */}
                  <ColorPalletes></ColorPalletes>
            </div>
            </div>
            </>
      )
}

export default ColorPicker;