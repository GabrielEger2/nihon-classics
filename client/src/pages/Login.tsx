import { useState, useEffect } from 'react'
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, login, reset } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const registerSchema = yup.object().shape({
    userName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
  });
  
  const loginSchema = yup.object().shape({
    userName: yup.string().required("required"),
    password: yup.string().required("required"),
  });
  
  const initialValueRegister = {
    userName: "",
    email: "",
    password: ""
  };
  
  const initialValueLogin = {
    userName: "",
    email: "",
    password: ""
  };

const Login = () => {
    const [isRegister, setIsRegister] = useState(false);
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { user, isLoading, isError, isSuccess, message } = useAppSelector(
        (state : any) => state.auth
      )
    
      useEffect(() => {
        if (isError) {
          toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
            toast.success('Register Successfully')
          }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])

    const registerUser = async (values : any) => {
        // @ts-ignore
        dispatch(register(values))
    }

    if (isLoading) {
        return (
            <span className="loading loading-dots loading-lg"></span>
        )
      }

    const loginUser = async (values : any) => {
        // @ts-ignore
        dispatch(login(values))
        toast.success('Login Successfully')
      };

    const handleFormSubmit = async (values : any) => {
        if (isRegister === false) await loginUser(values);
        if (isRegister === true) await registerUser(values);
      };

  return (
    <section className='max-w-7xl lg:mx-auto pt-36'>
        <div className={`flex justify-center text-center text-6xl w-full font-bold ${isRegister ? 'hidden' : ''}`}>
        Login/ログイン:
        </div>
        <div className={`flex justify-center text-center text-6xl w-full font-bold ${isRegister ? '' : 'hidden'}`}>
        Register/登録する:
        </div>
        <div className="flex justify-center pt-20 pb-20 w-full">
        <div className="card w-96 md:w-[600px] bg-base-100 shadow-xl">
            <Formik
            onSubmit={handleFormSubmit}
            initialValues={isRegister ? initialValueRegister : initialValueLogin}
            validationSchema={isRegister ? registerSchema : loginSchema}
            >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                resetForm
            }) => (
                <form onSubmit={handleSubmit} className="card-body">
                <h2 className={`card-title ${isRegister ? 'hidden' : ''}`}>Login Form/ログインフォーム</h2>
                <h2 className={`card-title ${isRegister ? '' : 'hidden'}`}>Register Form/登録フォーム</h2>
                <div className={`form-control w-full ${isRegister ? 'hidden' : ''}`}>
                    <label className="label">
                    <span className="label-text pt-6 text-xl sm:text-2xl">E-mail:</span>
                    </label>
                    <input
                    type="text"
                    placeholder="メールアドレス"
                    className="input input-bordered w-full"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="userName"
                    />
                    {touched.userName && errors.userName && (
                    <div className="text-red-500">{errors.userName}</div>
                    )}
                </div>
                <div className={`form-control w-full ${isRegister ? 'hidden' : ''}`}>
                    <label className="label">
                    <span className="label-text pt-2 text-xl sm:text-2xl">Password:</span>
                    </label>
                    <input
                    type="password"
                    placeholder="パスワード"
                    className="input input-bordered w-full"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    />
                    {touched.password && errors.password && (
                    <div className="text-red-500">{errors.password}</div>
                    )}
                </div>
                <div className={`form-control w-full ${isRegister ? '' : 'hidden'}`}>
                    <label className="label">
                    <span className="label-text pt-6 text-xl sm:text-2xl">E-mail:</span>
                    </label>
                    <input
                    type="text"
                    placeholder="メールアドレス"
                    className="input input-bordered w-full"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="email"
                    />
                    {touched.email && errors.email && (
                    <div className="text-red-500">{errors.email}</div>
                    )}
                </div>
                <div className={`form-control w-full ${isRegister ? '' : 'hidden'}`}>
                    <label className="label">
                    <span className="label-text pt-2 text-xl sm:text-2xl">User Name:</span>
                    </label>
                    <input
                    type="text"
                    placeholder="ユーザー名"
                    className="input input-bordered w-full"
                    value={values.userName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="userName"
                    />
                    {touched.userName && errors.userName && (
                    <div className="text-red-500">{errors.userName}</div>
                    )}
                </div>
                <div className={`form-control w-full ${isRegister ? '' : 'hidden'}`}>
                    <label className="label">
                    <span className="label-text pt-2 text-xl sm:text-2xl">Password:</span>
                    </label>
                    <input
                    type="password"
                    placeholder="パスワード"
                    className="input input-bordered w-full"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="password"
                    />
                    {touched.password && errors.password && (
                    <div className="text-red-500">{errors.password}</div>
                    )}
                </div>
                <p className={`pt-4 ${isRegister ? 'hidden' : ''}`}>DEMO EMAIL: HayaoMiyazaki@hotmail.com</p>
                <p className={`pt-2 ${isRegister ? 'hidden' : ''}`}>DEMO PASSWORD: HayaoMiyazaki</p>
                <a className="pt-4 link">Forgot Password?</a>
                <a className={`pt-4 link ${isRegister ? 'hidden' : ''}`} onClick={() => { setIsRegister(true); resetForm(); }}>
                    Don't Have an Account?
                </a>
                <a className={`pt-4 link ${isRegister ? '' : 'hidden'}`} onClick={() => { setIsRegister(false); resetForm(); }}>
                    Already Have an Account?
                </a>
                <div className="card-actions justify-center pt-6">
                    <button type="submit" className={`btn btn-primary text-lg text-base-100 ${isRegister ? 'hidden' : ''}`}>
                    Login
                    </button>
                    <button type="submit" className={`btn btn-primary text-lg text-base-100 ${isRegister ? '' : 'hidden'}`}>
                    Register
                    </button>
                </div>
                </form>
            )}
            </Formik>
        </div>
        </div>
    </section>
    );
};
    
export default Login;