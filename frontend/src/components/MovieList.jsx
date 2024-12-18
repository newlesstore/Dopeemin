import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { useContentStore } from "../store/content";

// Custom hook for fetching content
const useFetchContent = (contentType, category) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await axios.get(`/api/data/all`);
        const fetchedContent = Array.isArray(response.data.content) 
          ? response.data.content 
          : (response.data.content ? [response.data.content] : []);
        setContent(fetchedContent);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to fetch content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType, category]);

  return { content, loading, error };
};

const MovieList = ({ category }) => {
  const { contentType } = useContentStore();
  const { content, loading, error } = useFetchContent(contentType, category);

  return (
    <>
    <h2 className=" bg-black text-3xl text-center font-bold text-white pb-8 pt-20">Update Movies and Tvs</h2>
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full flex justify-center items-center flex-wrap overflow-hidden gap-8 py-20 bg-black text-white"
    >
      {loading && <p className="text-white">Loading...</p>} {/* Loading state */}
      {error && <p className="text-red-500">{error}</p>} {/* Error message */}
      {content.map((item) => (
        <motion.div 
          key={item.id}
          whileHover={{ scale: 1.05 }} // Slightly scale on hover
          className='flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64'
        >
          <Link to={`/watch/${item.id}`} className='block'>
            <div className='rounded-lg overflow-hidden shadow-lg'>
              {item.poster_path !== null ? (<motion.img
                src={ORIGINAL_IMG_BASE_URL + item.poster_path}
                alt={item.title || item.name}
                className='w-full h-auto object-cover'
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />) : (<>
              <motion.img
                src="/404.png"
                alt={item.title || item.name}
                className='w-full h-auto object-cover'
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="max-w-xl gap-y-2 absolute translate-x-1 -translate-y-4 lg:translate-x-3 lg:-translate-y-32 h-auto">
                <h1 className="text-xl md:text-2xl lg:text-4xl font-bold leading-tight">
                  {item?.title || item?.name} | {" "} {content?.adult ? (
								<span className='text-red-600'>18+</span>
							) : (
								<span className='text-green-600'>PG-13</span>
							)}
              {" "}
                </h1>
                <p className="text-sm font-medium md:text-base lg:text-lg leading-loose text-white">
                {item?.first_air_date?.split('-')[0] || item?.release_date?.split('-')[0]}
                </p>
              </div>
              </>
              )}
            </div>
            <p className='mt-2 text-base lg:text-lg truncate font-semibold'>
              {item.title || item.name}
            </p>
            <p className='mt-1 text-sm lg:text-md truncate'>
              {item.first_air_date?.split('-')[0] || item.release_date?.split('-')[0]}
            </p>
          </Link>
        </motion.div>
      ))}
    </motion.div>
    </>
  );
}

MovieList.propTypes = {
  category: PropTypes.string.isRequired, // Define the expected type for category prop
};

export default MovieList;