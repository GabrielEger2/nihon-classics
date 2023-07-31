import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { logout, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import profilePicture from "../assets/imgs/profilePicture.jpg"

const Navbar = () => {
    const { user } = useAppSelector((state : any) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([])

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
        toast.success('Logout Successfully')
        window.scrollTo(0, 0);
    }

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearchDropdownToggle = () => {
        setSearchDropdownOpen(!searchDropdownOpen);
    };

    const handlePageSwitch = () => {
        // Scroll to the top of the page when the link is clicked
        window.scrollTo(0, 0);
        setDropdownOpen(false); // Close the dropdown when a link is clicked
    };

    const handleSearchPageSwitch = () => {
        // Scroll to the top of the page when the link is clicked
        window.scrollTo(0, 0);
        setDropdownOpen(false); // Close the dropdown when a link is clicked
        window.location.reload();
    };

    useEffect(() => {
        // Fetch data from the API and store it in the state
        axios.get('http://localhost:5000/api/posts/')
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
          });
      }, []);

    const handleSearch = (e : any) => {
        const query = e.target.value.toLowerCase();
      
        // Filter the posts based on the carBrand and carModel containing the search query
        const filteredPosts = data.filter(
          (data : any) =>
            data.carBrand.toLowerCase().includes(query) ||
            data.carModel.toLowerCase().includes(query)
        );
      
        // Limit the search results to a maximum of 5 posts
        const limitedResults = filteredPosts.slice(0, 5);
      
        setSearchQuery(query);
        setSearchResults(limitedResults);
    };

  return (
    <section className='fixed top-0 right-0 w-full bg-base-100 z-50 shadow-lg'>
        <div className='flex justify-center border-b border-base-300'>
            <div className="navbar max-w-7xl px-4">
                <div className="flex-1">
                    <div className="h-[67px] w-[600px] -translate-x-32 absolute bg-[#b01e1e] z-10 hidden xl:block"></div>
                    <Link onClick={handlePageSwitch} to="/" className="btn btn-ghost normal-case text-xl z-20 xl:text-base-100">日本-Classics</Link>
                </div>
                <div className="flex-none gap-2">
                    <div onClick={handleSearchDropdownToggle} className="form-control flex flex-col">
                        <input
                            type="text"
                            placeholder="Search"
                            className="input border border-gray-300 z-50 w-32 sm:w-48 md:w-60 xl:w-72"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <div>
                        {searchResults.length > 0 && searchQuery !== '' && (
                        <ul className={`bg-base-100 shadow border border-gray-300 absolute -translate-y-2 menu w-32 sm:w-48 md:w-60 xl:w-72 ${
                            dropdownOpen ? 'block' : 'block'
                        }`}>
                            <div className="pt-2">
                                {searchResults.map((result) => (
                                <li key={result._id}>
                                    <button onClick={handleSearchPageSwitch}><Link to={`/post/${result._id}`}>{result.carBrand} - {result.carModel}</Link></button>
                                </li>
                                ))}
                            </div>
                        </ul>
                    )}
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label onClick={handleDropdownToggle} tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                {user ? (
                                    user.profilePicturePath !== "" && user.profilePicturePath ? (
                                        <img src={user.profilePicturePath} />
                                    ) : (
                                        <img src={profilePicture} />
                                    )
                                    ) : (
                                    <img src={profilePicture} />
                                )}
                            </div>
                        </label>
                        <ul
                            className={`mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 ${
                                dropdownOpen ? 'block' : 'hidden'
                            }`}
                        >
                            {user ? (
                                    <li onClick={handlePageSwitch}><Link to="/create-post">Create Post</Link></li>
                                ) : (
                                    <li onClick={()=> {
                                        handlePageSwitch(); toast.error('You must be logged to create a post')
                                    }}><Link to="/login">Create Post</Link></li>
                            )}
                            {user ? (
                                    <li onClick={handlePageSwitch}><Link to="/settings">Settings</Link></li>
                                ) : (
                                    <li onClick={()=> {
                                        handlePageSwitch(); toast.error('You must be logged to change a user settings')
                                    }}><Link to="/login">Settings</Link></li>
                            )}
                            {user ? (
                                    <li><button onClick={onLogout}>Logout</button></li>
                                ) : (
                                    <li onClick={handlePageSwitch}><Link to="/login">Login</Link></li>
                            )}    
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Navbar