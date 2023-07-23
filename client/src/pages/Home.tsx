import ReactTyped from "react-typed"

import OldJapaneseTempleImage from '../assets/imgs/oldJapaneseTemple.png'
import BannerDivision from '../assets/imgs/BannerDivision.png'

const Home = () => {
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
                        <button className="btn btn-lg btn-primary text-base-100 text-4xl">Search</button>
                    </div>
                </div>
                <div className='-translate-x-32 bg-primary w-[1000px] min-h-screen hidden xl:block z-50'>
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
                <img className="-translate-x-28 w-[600px] -translate-y-48 hidden xl:block" src={BannerDivision} alt="" />
            </div>
        </div>
    </section>
  )
}

export default Home