import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { logout, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import profilePicture from "../assets/imgs/profilePicture.jpg"

const Navbar = () => {
    const { user } = useAppSelector((state : any) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
        toast.success('Logout Successfully')
      }

  return (
    <section className='fixed top-0 right-0 w-full bg-base-100 z-50 shadow-lg'>
        <div className='flex justify-center border-b border-base-300'>
            <div className="navbar max-w-7xl px-4">
                <div className="flex-1">
                    <div className="h-[67px] w-[600px] -translate-x-32 absolute bg-[#b01e1e] z-10 hidden xl:block"></div>
                    <Link to="/" className="btn btn-ghost normal-case text-xl z-20 xl:text-base-100">日本-Classics</Link>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-32 sm:w-48 md:w-60 xl:w-72 " />
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img src={profilePicture} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link to="/">Messages</Link></li>
                            <li><Link to="/create-post">Create Post</Link></li>
                            <li><Link to="/settings">Settings</Link></li>
                            {user ? (
                                    <li><button onClick={onLogout}>Logout</button></li>
                                ) : (
                                    <li><Link to="/login">Login</Link></li>
                                )
                            }    
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Navbar