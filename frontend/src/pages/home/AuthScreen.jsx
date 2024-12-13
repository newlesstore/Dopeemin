import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const AuthScreen = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		navigate("/signup?email=" + email);
	};

	return (
		<div className='hero-bg relative'>
			{/* Navbar */}
			<header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 text-emerald-400">
				<Link to='/'>
					<div>
						<h1 className="font-bold text-xl md:text-3xl">
							Dopee
						</h1>
					</div>
				</Link>
			</header>
			{/* hero section */}
			<div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
				<h1 className="text-2xl md:text-6xl font-bold mb-4">Unlimited Movies, Tv Shows, and Exclusive content</h1>
				<p className="text-sm md:text-xl mb-4 max-w-4xl">Experience the magic of Dopeemin. Watch, stream, and enjoy unlimited movies, Shows, and exclusive content.</p>

				<form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
					<input
						type='email'
						placeholder='Email address'
						className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
						Get Started
						<ChevronRight className='size-8 md:size-10' />
					</button>
				</form>
			</div>

			{/* separator */}
			<div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

			{/* 1st section */}
			<div className='py-10 bg-black text-white'>
				<div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
					{/* left side */}
					<div className='flex-1 text-center md:text-left'>
						<h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Free Access but Less Ads</h2>
						<p className='text-lg md:text-xl'>
							You&apos;ll have access to the full range of all platform&apos;s streaming features without ever having to pay
						</p>
					</div>
					{/* right side */}
					<div className='flex-1 relative'>
						<img src='/tv.png' alt='Tv image' className='mt-4 z-20 relative' />
						<video
							className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-10'
							playsInline
							autoPlay={true}
							muted
							loop
						>
							<source src='/hero-vid.m4v' type='video/mp4' />
						</video>
					</div>
				</div>
			</div>

			{/* separator */}
			<div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

			{/* 3rd section */}
			<div className='py-10 bg-black text-white'>
				<div className='flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2'>
					{/* left side */}
					<div className='flex-1 text-center md:text-left'>
						<h2 className='text-4xl md:text-5xl font-extrabold mb-4'>Watch everywhere</h2>
						<p className='text-lg md:text-xl'>
						You can stream on any device with an internet connection. Watch movies, shows, and videos at your convenience, without missing a beat.
						</p>
					</div>

					{/* right side */}
					<div className='flex-1 relative overflow-hidden'>
						<img src='/device-pile.png' alt='Device image' className='mt-4 z-20 relative' />
						<video
							className='absolute top-2 left-1/2 -translate-x-1/2  h-4/6 z-10
               max-w-[63%] 
              '
							playsInline
							autoPlay={true}
							muted
							loop
						>
							<source src='/video-devices.m4v' type='video/mp4' />
						</video>
					</div>
				</div>
			</div>

			<div className='h-2 w-full bg-[#232323]' aria-hidden='true' />

			<div className='py-10 bg-black text-white'>
				<div
				className='flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2
        '
				>

				
				</div>
					<div className="h-1/2 lg:h-screen w-full flex justify-center items-center flex-col my-32 lg:my-0">
						<h2 className='text-4xl md:text-8xl font-extrabold mb-4'>Exclusive Content</h2>
						<h2 className='text-4xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>Cooming Soon</h2>
					</div>
					<div className='h-1/2 lg:h-screen w-full flex justify-center items-center flex-col my-5 lg:my-0'>
						<h2 className="text-4xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text mb-5">
						What&apos;s Coming?
						</h2>
						<p className="text-lg md:text-2xl max-w-4xl text-center">
						We&apos;re bringing you fresh, original content created just for you. Whether it&apos;s new series, behind-the-scenes footage, or special features, our exclusive content will take your experience to the next level.
						</p>
					</div>
			</div>
		</div>
	);
};
export default AuthScreen;
