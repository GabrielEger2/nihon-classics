import { useState } from "react";
import { motion } from "framer-motion";
import { Formik } from "formik";
import { toast } from 'react-toastify'
import { UploadWidget } from "../components";
import { createNewPost } from "../features/posts/postSlice";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import "../index.css";

const createPostSchema = yup.object().shape({
    carBrand: yup.string().required("required"),
    carModel: yup.string().required("required"),
    releaseYear: yup.string().required("required").matches(/^\d{4}$/, "Release year must be a four-digit number"),
    carColor: yup.string().required("required"),
    carMileage: yup.string().required("required").matches(/^\d+$/, "Car mileage must be a number"),
    licensePlate: yup.string().required("required").length(1, "License plate should be exactly one character"),
    price: yup.string().required("required").matches(/^\d+$/, "Car price must be a number"),
    carPhoto: yup.string(),
    carDetails: yup.string()
})

const initialValuePost = {
    carBrand: "",
    carModel: "",
    releaseYear: "",
    carColor: "",
    carMileage: "",
    licensePlate: "",
    price: "",
    carPhoto: "",
    carDetails: ""
};
  

const CreatePost = () => {
    const [isOn, setIsOn] = useState(false);
    const PostOption = isOn ? "Buy" : "Sell";
    const [carPhotoPath, setcarPhotoPath] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const toggleSwitch = () => setIsOn(!isOn);
    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
    };

    const handleFormSubmit = async (values: any) => {
        if (carPhotoPath === '') {
            toast.error('Please add the car Image')
        } else {
            values.postType = PostOption;
            values.carPhoto = carPhotoPath;
            const formattedCarMileage = Number(values.carMileage).toLocaleString("en-US") + " Km";
            values.carMileage = formattedCarMileage;
            const carPrice = Number(values.price).toLocaleString("en-US", { style: 'currency', currency: 'USD' })
            values.price =carPrice
    
            // Dispatch the action to create a new post
            dispatch(createNewPost(values));
            navigate("/")
            window.scrollTo(0, 0);
            toast.success('New post added')
        }
    };

    const handleCarPhotoChange = (secureUrl : any) => {
        setcarPhotoPath(secureUrl)
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
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuePost}
            validationSchema={createPostSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
        }) => (
            <form className="pt-16 w-full" onSubmit={handleSubmit}>
                <div className="flex w-full lg:space-x-10 md:space-x-6 sm:space-x-2 space-x-1">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl sm:text-2xl h-10 items-end flex">Car Brand:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="車のブランド" 
                            className="input input-bordered w-full" 
                            value={values.carBrand}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="carBrand"
                        />
                        {touched.carBrand && errors.carBrand && (
                            <div className="text-red-500">{errors.carBrand}</div>
                        )}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl sm:text-2xl h-10 items-end flex">Car Model:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="車のモデル" 
                            className="input input-bordered w-full"
                            value={values.carModel}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="carModel"
                        />
                        {touched.carModel && errors.carModel && (
                            <div className="text-red-500">{errors.carModel}</div>
                        )}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl sm:text-2xl h-10 items-end flex">Release Year:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="発売年度" 
                            className="input input-bordered w-full" 
                            value={values.releaseYear}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="releaseYear"
                        />
                        {touched.releaseYear && errors.releaseYear && (
                            <div className="text-red-500">{errors.releaseYear}</div>
                        )}
                    </div>
                </div>
                <div className="flex w-full pt-6 lg:space-x-10 md:space-x-6 sm:space-x-2 space-x-1">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl sm:text-2xl h-20 sm:h-10 items-end flex">Car Color:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="車の色" 
                            className="input input-bordered w-full" 
                            value={values.carColor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="carColor"
                        />
                        {touched.carColor && errors.carColor && (
                            <div className="text-red-500">{errors.carColor}</div>
                        )}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl sm:text-2xl h-20 sm:h-10 items-end flex">Car Mileage:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="車の走行距離" 
                            className="input input-bordered w-full" 
                            value={values.carMileage}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="carMileage"
                        />
                        {(errors.carMileage && touched.carMileage)? (
                            <div className="text-red-500">{errors.carMileage}</div>
                        ) : (
                            <div className="text-gray-400">{Number(values.carMileage).toLocaleString("en-US") + " Km"}</div>
                        )}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl sm:text-2xl h-20 sm:h-10 items-end flex">License Plate's Last Digit:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="ナンバープレートの最後の数字" 
                            className="input input-bordered w-full" 
                            value={values.licensePlate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="licensePlate"
                        />
                        {touched.licensePlate && errors.licensePlate && (
                            <div className="text-red-500">{errors.licensePlate}</div>
                        )}
                    </div>
                </div>
                <div className="flex w-full pt-6 lg:space-x-10 md:space-x-6 sm:space-x-2 space-x-1">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl sm:text-2xl h-10 items-end flex">Car price:</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder="車の価格" 
                            className="input input-bordered w-full" 
                            value={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="price"
                        />
                        {(errors.price && touched.price)? (
                            <div className="text-red-500">{errors.price}</div>
                        ) : (
                            <div className="text-gray-400">{Number(values.price).toLocaleString("en-US", { style: 'currency', currency: 'USD' })}</div>
                        )}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text text-xl sm:text-2xl h-10 items-end flex">Car Photo:</span>
                        </label>
                        <UploadWidget onChange={(secureUrl : any ) => {
                            setFieldValue('carPhoto', secureUrl);
                            handleCarPhotoChange(secureUrl);
                        }} />
                        {touched.carPhoto && errors.carPhoto && carPhotoPath === '' && (
                            <div className="text-red-500">{errors.carPhoto}</div>
                        )}
                    </div>
                </div>
                <div className="form-control pt-6 w-full">
                    <label className="label w-full justify-center">
                        <span className="text-center text-xl sm:text-2xl">Car Details:</span>
                    </label>
                    <textarea 
                        className="textarea textarea-bordered h-52" 
                        placeholder="車の詳細 "
                        value={values.carDetails}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="carDetails"
                       />
                        {touched.carDetails && errors.carDetails && (
                            <div className="text-red-500">{errors.carDetails}</div>
                        )}
                </div>
                <div className="flex justify-center py-14">
                    {/* @ts-ignore */}
                    <button type="button" className="btn btn-lg text-2xl text-base-100 btn-primary" onClick={handleSubmit}>
                        Create {PostOption} Post
                    </button>
                </div>
            </form>
        )}
        </Formik>
        
    </section>
  )
}

export default CreatePost