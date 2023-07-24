import { useState } from "react";
import { motion } from "framer-motion";

import "../index.css";

const CreatePost = () => {
    const [isOn, setIsOn] = useState(false);
    const PostOption = isOn ? "Buy" : "Sell";

    const toggleSwitch = () => setIsOn(!isOn);
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    };

  return (
    <section className='max-w-7xl lg:mx-auto pt-32 px-10 xl:px-0'>
        <div className="flex flex-col md:flex-row md:justify-between w-full">
            <h2 className="text-4xl sm:text-5xl font-bold">
                Create a New <span className="text-primary">{PostOption}</span> Post:
            </h2>
            <div className="switch translate-y-1 mt-6 md:mt-0" data-isOn={isOn} onClick={toggleSwitch}>
                <motion.div className="handle flex select-none" layout transition={spring} >
                    <p className="text-base-100 text-2xl font-bold">{PostOption}</p>
                </motion.div>
            </div>
        </div>
        <form className="pt-16 w-full" action="">
            <div className="flex w-full lg:space-x-10 md:space-x-6 sm:space-x-2 space-x-1 items-end">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-xl sm:text-2xl">Car Brand:</span>
                    </label>
                    <input type="text" placeholder="車のブランド" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-xl sm:text-2xl">Car Model:</span>
                    </label>
                    <input type="text" placeholder="車のモデル" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-xl sm:text-2xl">Release Year:</span>
                    </label>
                    <input type="text" placeholder="発売年度" className="input input-bordered w-full" />
                </div>
            </div>
            <div className="flex w-full pt-6 lg:space-x-10 md:space-x-6 sm:space-x-2 space-x-1 items-end">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-xl sm:text-2xl">Car Color:</span>
                    </label>
                    <input type="text" placeholder="車の色" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-xl sm:text-2xl">Car Mileage:</span>
                    </label>
                    <input type="text" placeholder="車の走行距離" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-xl sm:text-2xl">License Plate's Last Digit:</span>
                    </label>
                    <input type="text" placeholder="ナンバープレートの最後の数字" className="input input-bordered w-full" />
                </div>
            </div>
            <div className="flex w-full pt-6 lg:space-x-10 md:space-x-6 sm:space-x-2 space-x-1 items-end">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-xl sm:text-2xl">Car price:</span>
                    </label>
                    <input type="text" placeholder="車の価格" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text text-xl sm:text-2xl">Car Photo:</span>
                    </label>
                    <input type="file" className="file-input file-input-bordered file-input-primary w-full" />
                </div>
            </div>
            <div className="form-control pt-6 w-full">
                <label className="label w-full justify-center">
                    <span className="text-center text-xl sm:text-2xl">Car Details:</span>
                </label>
                <textarea className="textarea textarea-bordered h-52" placeholder="車の詳細 "></textarea>
            </div>
            <div className="flex justify-center py-14">
                <button className="btn btn-lg text-2xl text-base-100 btn-primary">Create {PostOption} Post</button>
            </div>
        </form>
        
    </section>
  )
}

export default CreatePost