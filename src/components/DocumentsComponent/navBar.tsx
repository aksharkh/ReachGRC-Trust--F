


const navBar = () => {

    return (
 <div className="bg-[#ffffff] border-b border-[#dee3ea] w-full h-full px-4 overflow-hidden">

    <div className="flex justify-between items-center h-10 w-full">

        <div className="flex gap-3 items-center h-full">
            <p className="text-[#ff611a] font-bold text-xl" >ReachGRC</p>
            <p className="text-sm  font-bold">DOCUMENTATION</p>
        </div>

        <div className="flex items-center gap-3 ml-auto h-[86%]">

            <input
    placeholder="search...!"
    className="w-64 h-[85%] bg-[#f7f7f7] border rounded-md border-[#dee3ea] text-sm px-2 focus:outline-none focus:shadow-2xl"
/>

            <button className="px-4 cursor-pointer h-[90%] bg-zinc-800 text-white rounded-3xl">
                
            </button>

        </div>

    </div>

</div>
    )
}

export default navBar