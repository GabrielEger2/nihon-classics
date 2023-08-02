import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="px-4 lg:py-12">
          <div className="lg:gap-4 lg:flex">
            <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
              <h1 className="font-bold text-papasred text-9xl">404</h1>
              <p className="mb-2 text-2xl font-bold text-center md:text-3xl">
                <span className="text-primary">Oops!</span> Page not found
              </p>
              <p className="mb-8 text-center text-gray-500 md:text-lg">
                Your car is in another castle.
              </p>
              <Link
                to="/"
                className="px-6 py-2 text-sm font-semibold bg-papasred hover:px-10 hover:py-3 hover:text-lg rounded-lg ease-in-out duration-500"
              >
                Go home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page404