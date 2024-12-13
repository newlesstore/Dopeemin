import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div
			className='min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white'
			style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.1)), url('/SignupBG.jpg')` }}
		>
			<header className='absolute top-0 left-0 p-4 bg-black w-full '>
				<Link to='/'>
					<div>
						<h1 className="font-bold text-xl md:text-3xl text-emerald-400">
							Dopee
						</h1>
					</div>
				</Link>
			</header>
			<main className='text-center error-page--content z-10'>
				<h1 className='text-7xl font-semibold mb-4'>Lost your way?</h1>
				<p className='mb-6 text-xl'>
					Sorry, we can't find that page. You'll find lots to explore on the home page.
				</p>
				<Link to={"/"} className='bg-white text-black py-2 px-4 rounded font-semibold text-xl md:text-lg'>
					Dopeemin 
				</Link>
			</main>
		</div>
	);
};
export default NotFoundPage;
