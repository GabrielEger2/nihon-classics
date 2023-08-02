import { useEffect, useState, useRef } from 'react'
import ReactTyped from "react-typed"
import { CarCard } from '../components';
import { motion, AnimatePresence } from 'framer-motion';
import { getPosts, reset } from "../features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

import OldJapaneseTempleImage from '../assets/imgs/oldJapaneseTemple.png'
import BannerDivision from '../assets/imgs/BannerDivision.png'

const Home = () => {
    const dispatch = useAppDispatch();
    const [active, setActive] = useState('All');
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const searchOptionsRef = useRef<HTMLDivElement>(null);
    const [searchText, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;

    const { posts, isError, message } = useAppSelector(
        (state : any) => state.posts
    );

    useEffect(() => {
        if (isError) {
          console.log(message);
        }
    
        dispatch(getPosts());
    
        return () => {
          dispatch(reset());
        };
    }, [isError, message, dispatch]);

    useEffect(() => {
    if (!Array.isArray(posts)) {
        return; // Return early if posts is not an array
    }

    const filteredPosts = posts.filter((post: any) => {
    const title = `${post.carBrand} ${post.carModel} ${post.releaseYear}`;
    const isActiveMatch = active === "All" || post.postType.includes(active);
    const isSearchMatch =
      searchText.trim() === "" ||
      title.toLowerCase().includes(searchText.toLowerCase());
    return isActiveMatch && isSearchMatch;
    });

    setFilteredPosts(filteredPosts);
    setCurrentPage(1);
}, [active, posts, searchText]);

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;

    const totalPages = Math.ceil(filteredPosts.length / perPage);

  return (
    <section className='flex justify-center pt-20'>
        <div className=" max-w-7xl xl:-translate-y-[95px]">
            <div className="min-h-screen hero-content space-y-20 xl:space-y-0 flex-col xl:flex-row-reverse">
                <div className="text-center lg:text-left justify-center">
                    <h1 className="text-6xl font-bold leading-tight text-center justify-center xl:text-left xl:justify-normal">
                        Best Buy/Sell Options For:&ensp;<br className="xl:hidden" />
                        <ReactTyped className="text-primary" strings={['トヨタ', '本田', 'ダイハツ', 'スズキ', '三菱', 'スバル', '日産', 'レクサス', 'いすゞ']} typeSpeed={140} backSpeed={170} loop/>
                    </h1>
                    <p className="pt-6 pb-12 px-8 xl:px-0 text-xl text-center justify-center xl:text-left xl:justify-normal text-gray-500">日本-Classics is an open network for buying and selling the most beautiful machines made by the land of the rising sun!</p>
                    <div className="flex space-x-6 justify-center xl:justify-normal">
                        <button
                            className="btn btn-lg btn-primary text-base-100 text-4xl"
                            onClick={() =>
                                searchOptionsRef.current?.scrollIntoView({
                                    behavior: 'smooth',
                                    block: 'start',
                                  })
                            }
                            >
                            Search
                        </button>
                    </div>
                </div>
                <div className='-translate-x-32 bg-primary w-[1002px] min-h-screen hidden xl:block z-50'>
                    <h1 className='right-0 px-10 py-32 text-9xl text-base-100 space-y-4 font-bold absolute'>
                        <p>日</p>
                        <p>本</p>
                        <p>車</p>
                    </h1>
                    <img className="bottom-0 absolute" src={OldJapaneseTempleImage} alt="White drawing of an old japanese temple" />
                </div>
                <div className="w-screen h-48 bg-primary xl:hidden flex justify-center items-center text-base-100 font-bold text-8xl">
                    日本車
                </div>
            </div>
            <div>
                <div ref={searchOptionsRef}></div>
                <img className="-translate-x-28 w-[600px] -translate-y-48 hidden xl:block" src={BannerDivision} alt="Banner Division" />
            </div>
            <div className='flex flex-col justify-center lg:-translate-y-24'>
                <h1 className='text-6xl font-bold leading-tight text-center justify-center px-4'>
                    Search For The Best Options: 
                </h1>
                <div className='pb-10 pt-20 flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 space-x-6 px-10'>
                    <div className='w-full flex'>
                        <input
                            type="text"
                            placeholder="Search for Brand, model, year..."
                            className="input input-bordered w-full"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <div className='flex space-x-2 items-center justify-center'>
                        <motion.div 
                            className={`items-center justify-center cursor-pointer font-bold rounded-lg px-4 py-1.5 text-2xl ${
                                active === 'All' ? 'bg-primary text-gray-50' : 'border text-gray-900 border-primary'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                            onClick={() => setActive('All')} 
                        >
                            All
                        </motion.div>        
                        <motion.div 
                            className={`items-center justify-center cursor-pointer font-bold rounded-lg px-4 py-1.5 text-2xl ${
                            active === 'Buy' ? 'bg-primary text-gray-50' : 'border text-gray-900 border-primary'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                            onClick={() => setActive('Buy')} 
                        >
                            Buy
                        </motion.div>
                        <motion.div 
                            className={`items-center justify-center cursor-pointer font-bold rounded-lg px-4 py-1.5 text-2xl ${
                            active === 'Sell' ? 'bg-primary text-gray-50' : 'border text-gray-900 border-primary'
                            }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ type: "spring", stiffness: 200, damping: 12 }}
                            onClick={() => setActive('Sell')} 
                        >
                            Sell
                        </motion.div>  
                    </div>    
                </div>
                <div className='flex justify-center space-x-2 pb-2'>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`text-primary text-lg ${
                            currentPage === index + 1
                            ? 'link'
                            : ''
                        }`}
                        >
                        {index + 1}
                        </button>
                    ))}
                </div>  
                <div className='flex justify-center overflow-y-hidden'>
                    {posts.length > 0 ? (
                        <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3">
                            {filteredPosts.slice(startIndex, endIndex).map((post: any) => {
                                return (
                                    <motion.div key={post._id}
                                        layout
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                            <CarCard 
                                                postUserID={post.carPhoto}
                                                postType={post.postType}
                                                carBrand={post.carBrand}
                                                carModel={post.carModel}
                                                releaseYear={post.releaseYear}
                                                carColor={post.carColor}
                                                carMileage={post.carMileage}
                                                licensePlate={post.licensePlate}
                                                price={post.price}
                                                carPhoto={post.carPhoto}
                                                carDetails={post.carDetails}
                                                postID={post._id}
                                            />
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    ) : (
                        <span className="loading loading-bars loading-lg text-primary"></span>
                    )}
                </div>
            </div>
        </div>
    </section>
  )
}

export default Home