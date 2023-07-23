import {useState, useEffect} from "react";
import styles from './index.module.css';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import {useNavigate} from "react-router";
import { FaUserCircle } from "react-icons/fa"




const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate()
	const [storedToken,setToken] = useState(null);

  const loadToken = () => {
    localStorage.getItem('accessToken') ? (
      setToken(localStorage.getItem('accessToken'))
      ) : (
        setToken(null)
      )
  }

  const removeToken = () => {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
  }

  useEffect(()=>{
    loadToken()
   },[])

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-primary sticky">
			<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center justify-between w-full cursor-pointer">
						<div className="flex items-center justify-start gap-x-2" onClick={() => navigate('/')}>
							<img src="./logo.svg" alt="#" height={40} width={40}/>
							<p className='text-2xl font-bold'>Rocket Type</p>
						</div>
						<p className="text-lg cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</p>
					</div>
					{
					storedToken === null ? (
					<button
					onClick={() => navigate("/login")}
					className="text-white bg-indigo-900 block mx-2 px-3 py-2 rounded-md font-medium">
					 SignIn
					</button>
					):(
					<button onClick={() => {
					removeToken();
					navigate("/login");
					}} className="text-white bg-indigo-900 block mx-2 px-3 py-2 rounded-md font-medium">
					
					<FaUserCircle/>
					</button>
					)
					}
					<div className="mr-2 flex md:hidden justify-end">
						<button
							onClick={() => toggleMenu()}
							type="button"
							className={styles.butt_menu}
							aria-expanded="false"
						>
							<AiOutlineMenu className={`${isOpen ? 'hidden' : 'block'}`}/>
							<AiOutlineClose className={`${isOpen ? 'block' : 'hidden'}`}/>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
