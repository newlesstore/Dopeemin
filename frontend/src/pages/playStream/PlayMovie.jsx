import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContentStore } from "../../store/content";
import WatchPageSkeleton from "../../components/skeletons/WatchPageSkeleton";
import Navbar from "../../components/Navbar";
import { formatReleaseDate } from "../../utils/dateFunction";
import { SMALL_IMG_BASE_URL } from "../../utils/constants";


const PlayMovie = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      }
    };

    getSimilarContent();
  }, [contentType, id]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContent(res.data.content);
      } catch (error) {
        if (error.message.includes("404")) {
          setContent(null);
        }
      } finally {
        setLoading(false);
      }
    };

    getContentDetails();
  }, [contentType, id]);

  if (loading)
    return (
      <div className='min-h-screen bg-black p-10'>
        <WatchPageSkeleton />
      </div>
    );

  if (!content) {
    return (
      <div className='bg-black text-white h-screen'>
        <Navbar />
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mx-auto px-4 py-8 h-full mt-40'>
            <h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
          </div>
        </div>
      </div>
    );
  }

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
  };

  return (
    <>
      <div className='text-white bg-black h-auto overflow-hidden'>
        <Navbar />
        {/* content */}
        <div className='flex flex-wrap w-full'>
          {/* video */}
          <div className='mx-auto container max-w-2xl'>
			<iframe src={`https://vidlink.pro/movie/${content?.id}primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=default&title=true&poster=true&autoplay=false&nextbutton=false`} frameBorder="0" allowFullScreen
			className="w-full h-[580px] lg:w-[720px] lg:h-[480px]"
			></iframe>
          </div>
        </div>

        {/* details per episode */}
        <div className="mx-12">
          {/* content details */}
          <div className="px-4 py-8 h-full max-w-4xl w-full overflow-hidden flex flex-col">
            <h2 className='text-5xl font-bold text-balance'>{content?.title || content?.name}</h2>
            <div className='flex gap-4 pt-3'>
              {content?.genres?.map((genre) => (
                <span key={genre.id} className='text-sm text-gray-500'>{genre.name}</span>
              ))}
            </div>
            <p className='mt-2 text-lg'>
              {formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
              {content?.adult ? (
                <span className='text-red-600'>18+</span>
              ) : (
                <span className='text-green-600'>PG-13</span>
              )}{" "}
            </p>
            <p className='mt-4 text-lg'>{content?.overview}</p>  
          </div>

		{/* episode and season */}
          <div className="px-4 py-8 mt-12 h-full w-full overflow-hidden flex flex-col">
            <h2 className="text-2xl font-bold text-center bg-emerald-500 rounded-lg">
              Dopee
            </h2>
          </div>


          {similarContent.length > 0 && (
            <div className='mt-12 max-w-5xl mx-auto relative'>
              <h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>

              <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
                {similarContent.map((content) => {
                  if (content.poster_path === null) return null;
                  return (
                    <Link key={content.id} to={`/watch/${content.id}`} className='w-52 flex-none'>
                      <img
                        src={SMALL_IMG_BASE_URL + content.poster_path}
                        alt='Poster path'
                        className='w-full h-auto rounded-md'
                      />
                      <h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
                    </Link>
                  );
                })}

                <ChevronRight
                  className='absolute top-1/2 -translate-y-1/2 right-2 w-12 h-12 lg:w-8 lg:h-8
                    opacity-100 transition-all duration-300 cursor-pointer
                    bg-emerald-400 text-white rounded-full'
                  onClick={scrollRight}
                />
                <ChevronLeft
                  className='absolute top-1/2 -translate-y-1/2 left-2 w-12 h-12 lg:w-8 lg:h-8 
                    opacity-100 transition-all duration-300 cursor-pointer bg-emerald-400 
                    text-white rounded-full'
                  onClick={scrollLeft}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PlayMovie;