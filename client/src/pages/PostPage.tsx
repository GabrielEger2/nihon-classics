import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { getPostByID, reset } from "../features/posts/postSlice";
import profilePicture from "../assets/imgs/profilePicture.jpg"
import { toast } from "react-toastify"

const PostPage = () => {
    const dispatch = useAppDispatch();
    const [userEmail, setUserEmail] = useState('Contact');
    const { user } = useAppSelector((state: any) => state.auth);

    const { postId } = useParams<{ postId: string }>();

    const { posts, isLoading, isError, message } = useAppSelector(
      (state: any) => state.posts
    );

    useEffect(() => {
      if (isError) {
        console.log(message);
      }
      
      dispatch(getPostByID(postId));

      return () => {
        dispatch(reset());
      };
    }, [dispatch]);

    const getUserEmail = async() => {
      axios.get(`https://ri-ben-classics.onrender.com/api/users/${posts.user}`)
      .then(response => {
        setUserEmail(response.data.email);
        toast.success("The post creator's email has been saved to your clipboard")

        const tempInput = document.createElement("input");
        tempInput.value = response.data.email;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
    }

  return (
    <section className='flex justify-center pt-24 pb-24'>
      <div className="max-w-7xl px-10">
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between w-full lg:space-x-10">
          <div className="pt-3">
            <img className="w-[800px] h-96 object-cover" src={posts.carPhoto} alt={posts.carModel}/>
            <p className="pt-6 text-lg">
              <span className="font-bold">Car Details:</span> {posts.carDetails}
            </p>
          </div>
          <div className="flex justify-center pb-10 lg:pb-0">
            <div className="card w-[350px] sm:w-[470px] bg-base-100 shadow-xl border border-gray-200">
              <h2 className="flex justify-center bg-primary py-4 rounded-t-2xl font-bold text-5xl text-base-100">{posts.price}</h2>
              <div className="card-body">
                <h2 className="card-title text-5xl font-bold justify-center">{posts.postType} Post</h2>
                <div className="pt-10">
                  <h2 className="text-xl font-semibold">
                    {posts.carBrand}, {posts.carModel}
                  </h2>
                  <h2 className="text-xl pt-10 font-bold">
                    Car Information:
                  </h2>
                  <h2 className="pt-4 font-semibold">
                    Release Year: <span className="font-normal">{posts.releaseYear}</span>
                  </h2>
                  <h2 className="pt-4 font-semibold">
                    Car Color: <span className="font-normal">{posts.carColor}</span>
                  </h2>
                  <h2 className="pt-4 font-semibold">
                    Car Mileage: <span className="font-normal">{posts.carMileage}</span>
                  </h2>
                  <h2 className="pt-4 font-semibold">
                    License Plate Last Digit: <span className="font-normal">{posts.licensePlate}</span>
                  </h2>
                </div>
                <div className="card-actions justify-center pt-10">
                  <button onClick={getUserEmail} className="btn btn-primary text-xl font-bold">{userEmail}</button>
                </div>
              </div>
              <div className="stats shadow border-t border-gray-300 rounded-t-none hidden sm:flex">
                <div className="stat">
                  <div className="stat-figure text-primary translate-y-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  </div>
                <div className="stat-title">Total Likes</div>
                <div className="stat-value text-primary">32</div>
                </div>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <div className="avatar">
                      <div className="w-16 rounded-full">
                        {user ? (
                          user.profilePicturePath !== "" ? (
                            <img src={user.profilePicturePath} />
                        ) : (
                            <img src={profilePicture} />
                        )
                        ) : (
                          <img src={profilePicture} />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="stat-value">4</div>
                  <div className="stat-title">Posts published in <br /> this website</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostPage;