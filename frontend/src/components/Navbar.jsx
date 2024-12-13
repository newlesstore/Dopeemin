import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";
import { motion } from "framer-motion";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	const { setContentType } = useContentStore();

	const navigate = useNavigate();
	const handleLogout = () => {
        logout();
        window.location.href = "/";
    };

	const handleLogin = (e) => {
		e.preventDefault();
		navigate("/login");
	}

	return (
		<header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 text-emerald-400'>
			<div className='flex items-center gap-10 z-50'>
				<Link to='/'>
					<div>
						<h1 className="font-bold text-xl md:text-3xl">
							Dopee
						</h1>
					</div>
				</Link>

				{/* desktop navbar items */}
				<div className='hidden sm:flex gap-2 items-center'>
					<Link to='/' className='hover:underline' onClick={() => setContentType("movie")}>
						Movies
					</Link>
					<Link to='/' className='hover:underline' onClick={() => setContentType("tv")}>
						Tv Shows
					</Link>
					<Link to='/history' className='hover:underline'>
						Search History
					</Link>
				</div>
			</div>

			<div className='flex gap-2 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				{user ? 
				(<motion.button
				className='w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600
				hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
				focus:ring-offset-gray-900 transition duration-200'
				whileHover={{ scale: 1.02 }}
				whileTap={{ scale: 0.98 }}
				onClick={handleLogout}
						>
							<h1>
								Log Out
							</h1>
				</motion.button>): (
					<motion.button
					className='w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
					font-bold rounded-lg shadow-lg hover:from-green-600
					hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
					focus:ring-offset-gray-900 transition duration-200'
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={handleLogin}
							>
								<h1>
									Sign In
								</h1>
					</motion.button>
				)}
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>

			{/* mobile navbar items */}
			{isMobileMenuOpen && (
				<div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Movies
					</Link>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Tv Shows
					</Link>
					<Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Search History
					</Link>
				</div>
			)}
		</header>
	);
};
export default Navbar;
