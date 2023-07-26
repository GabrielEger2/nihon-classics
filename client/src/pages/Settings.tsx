import { useAppSelector } from "../app/hooks";
import { updateuserName, updateUserEmail, updateUserPassword } from "../features/auth/authSlice";
import * as yup from "yup"
import { Formik } from "formik";
import { toast } from 'react-toastify'
import profilePicture from "../assets/imgs/profilePicture.jpg"
import { useAppDispatch } from "../app/hooks";

const updateUserNameSchema = yup.object().shape({
    userName: yup.string().required("required"),
})

const initialUserName = {
    userName: ''
}

const updateUserEmailSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required")
})

const initialEmail = {
    email: ''
}

const updateUserPasswordSchema = yup.object().shape({
    oldPassword: yup.string().required("required"),
    password: yup.string().required("required"),
})

const initialPassword = {
    oldPassword: '',
    password: ''
}

const Settings = () => {
    const { user } = useAppSelector((state : any) => state.auth);
    const dispatch = useAppDispatch();

    const handleUserNameUpdate = async (values : any) => {
        dispatch(updateuserName(values));
        window.location.reload();
    };

    const handleUserEmailUpdate = async (values : any) => {
        dispatch(updateUserEmail(values));
        window.location.reload();
    };

    const handleUserPassword = async (values : any) => {
        if (values.oldPassword === values.password) {
            console.log(values)
            dispatch(updateUserPassword(values));
            window.location.reload();
        } else {
            toast.error('Invalid old password')
        }   
    };


  return (
    <section className='max-w-7xl lg:mx-auto pt-36 px-10 pb-20'>
        <h1 className="text-4xl sm:text-5xl font-bold flex justify-center">
            Settings/設定:
        </h1>
        <div className="flex flex-col lg:flex-row mt-20 lg:space-x-10 items-center">
            <div className="w-44">
                <p className="-translate-y-8 text-2xl font-bold">Profile Picture:</p>
                <p className="-translate-y-8 text-lg">プロフィール画像</p>
            </div>
            <label className="avatar h-40 flex justify-center mb-10 lg:mb-0 lg:justify-normal">
                <div className="rounded-full">
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
            </label>
            <div className="flex flex-col space-y-4">
            <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <button className="btn btn-primary">Remove Profile Picture</button>
            </div>
        </div>
        <Formik
            onSubmit={handleUserNameUpdate}
            initialValues={initialUserName}
            validationSchema={updateUserNameSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
        }) => (
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row mt-10 lg:mt-20 lg:space-x-10 items-center text-center space-y-6 lg:text-left lg:space-y-0">
                <div className="w-44">
                    <p className="text-2xl font-bold">User Name:</p>
                    <p className="text-lg">ユーザー名</p>
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="ユーザー名" 
                        className="input input-bordered lg:w-[400px] w-[300px]"
                        value={values.userName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="userName" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update name</button>
            </form>
        )}
        </Formik>
        <Formik
            onSubmit={handleUserEmailUpdate}
            initialValues={initialEmail}
            validationSchema={updateUserEmailSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
        }) => (
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row mt-10 lg:mt-20 lg:space-x-10 items-center text-center space-y-6 lg:text-left lg:space-y-0">
                <div className="w-44">
                    <p className="text-2xl font-bold">Email:</p>
                    <p className="text-lg">メール</p>
                </div>
                <div>
                    <input 
                        type="text" 
                        placeholder="メール" 
                        className="input input-bordered lg:w-[400px] w-[300px]"
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        name="email"  
                    />
                </div>
                <button type="submit" className="btn btn-primary">Update EMAIL</button>
            </form>
        )}
        </Formik>
        <Formik
            onSubmit={handleUserPassword}
            initialValues={initialPassword}
            validationSchema={updateUserPasswordSchema}
        >
        {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
        }) => (
            <form onSubmit={handleSubmit} className="mt-10 lg:mt-20 items-center space-y-10">
                <div className="flex flex-col lg:flex-row mt-10 lg:mt-20 lg:space-x-10 items-center text-center space-y-6 lg:text-left lg:space-y-0">
                    <div className="w-44">
                        <p className="text-2xl font-bold">Old Password:</p>
                        <p className="text-lg">旧パスワード</p>
                    </div>
                    <div>
                        <input 
                            type="text" 
                            placeholder="旧パスワード " 
                            className="input input-bordered lg:w-[400px] w-[300px]" 
                            value={values.oldPassword}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="oldPassword"  
                        />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row mt-4 lg:mt-10 lg:space-x-10 items-center text-center space-y-6 lg:text-left lg:space-y-0">
                    <div className="w-44">
                        <p className="text-2xl font-bold">New Password:</p>
                        <p className="text-lg">新しいパスワード</p>
                    </div>
                    <div className="lg:space-x-10">
                        <input 
                            type="text" 
                            placeholder="新しいパスワード" 
                            className="input input-bordered lg:w-[400px] w-[300px]" 
                            value={values.password}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="password"  
                        />
                        <button type="submit" className="btn btn-primary mt-10 lg:mt-0">Update Password</button>
                    </div>
                </div>
            </form>
        )}
        </Formik>
    </section>
  )
}

export default Settings