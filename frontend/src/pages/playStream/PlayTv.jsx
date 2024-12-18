import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WatchPageSkeleton from "../../components/skeletons/WatchPageSkeleton";
import Navbar from "../../components/Navbar";
import { ORIGINAL_IMG_BASE_URL } from "../../utils/constants";
import { useContentStore } from "../../store/content";
import { formatReleaseDate } from "../../utils/dateFunction";

const PlayTv = () => {
  const { id, season, eps } = useParams();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState({});
  const [contentPerEps, setContentPerEps] = useState([]);
  const [ContentPerSeason, setContentPerSeason] = useState([]);
  const { contentType } = useContentStore();
  const sliderRef = useRef(null);
  
  useEffect(() => {
    const fetchContentDetails = async () => {
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

    fetchContentDetails();
  }, [contentType, id]);

  useEffect(() => {
    const fetchContentDetailsPerEps = async () => {
      try {
        const res = await axios.get(`/api/v1/tv/${id}/${season}/${eps}`);
        setContentPerEps( res.data.content );
      } catch (error) {
        if (error.message.includes("404")) {
          setContentPerEps([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetailsPerEps();
  }, [id, season, eps]);

  useEffect(() => {
    const fetchContentDetailsPerSeason = async () => {
      try {
        const res = await axios.get(`/api/v1/tv/${id}/${season}`);
        setContentPerSeason(res.data.content);
        
      } catch (error) {
        if (error.message.includes("404")) {
          setContentPerSeason([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContentDetailsPerSeason();
  }, [id, season]);

  if (loading) {
    return (
      <div className='min-h-screen bg-black p-10'>
        <WatchPageSkeleton />
      </div>
    );
  }

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
        <div className='flex flex-col items-center w-full'>
          <div className='container mx-auto max-w-2xl'>
            <iframe
              src={`https://vidlink.pro/tv/${id}/${season}/${eps}?primaryColor=63b8bc&secondaryColor=a2a2a2&iconColor=eefdec&icons=default&player=default&title=true&poster=true&autoplay=false&nextbutton=false`}
              frameBorder="0"
              allowFullScreen
              className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg"
            ></iframe>
          </div>
        </ div>

        <div className="mx-4 md:mx-12">
          <div className="px-4 py-8 h-full max-w-4xl w-full overflow-hidden flex flex-col">
            <h2 className='text-4xl md:text-5xl font-bold text-balance'>{contentPerEps?.title || contentPerEps?.name}</h2>
            <div className='flex gap-2 md:gap-4 pt-3 flex-wrap'>
              {content?.genres?.map((genre) => (
                <span key={genre.id} className='text-sm text-gray-500'>{genre.name}</span>
              ))}
            </div>
            <p className='mt-2 text-lg'>
              {formatReleaseDate(contentPerEps?.release_date || contentPerEps?.air_date)} |{" "}
              {content?.adult ? (
                <span className='text-red-600'>18+</span>
              ) : (
                <span className='text-green-600'>PG-13</span>
              )}
            </p>
            <p className='mt-4 text-lg'>{content?.overview}</p>  
          </div>

          {ContentPerSeason?.episodes?.length > 0 && (
            <div className="px-4 py-8 mt-12 w-full overflow-hidden flex flex-col">
              <h2 className="text-2xl font-bold text-center bg-emerald-500 rounded-lg">
                Episodes
              </h2>
              <div className="flex justify-center flex-wrap text-lg text-gray-500 pt-5">
                {ContentPerSeason?.episodes?.map((item) => (
                  <Link 
                  key={item?.id} 
                  to={`/watch-now/${content.id}/play/${item?.name}/season/${item?.season_number}/episode/${item?.episode_number}`}
                  className="text-white rounded-lg m-1 p-2 max-w-xl flex gap-2 mt-5">
                    <img 
                    src={ORIGINAL_IMG_BASE_URL + item?.still_path}
                    className="w-1/2 rounded-lg" />
                    <div className="flex flex-col">
                      <h1 className="font-bold text-base">
                        {item?.name}
                      </h1>
                      <p className="text-base text-gray-500">
                      {formatReleaseDate(item?.release_date || item?.air_date)} |{" "}
                      </p>
                      <p className="text-sm">
                      {item?.overview.length > 85 ? item?.overview.slice(0, 85) + "..." : item?.overview}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {contentPerEps?.guest_stars?.length > 0 && (
            <div className='mt-12 max-w-5xl mx-auto relative'>
              <h3 className='text-3xl font-bold mb-4'>Cast</h3>

              <div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
                {contentPerEps?.guest_stars?.map((content) => {
                  if (content.profile_path === null) return null;
                  return (
                    <div key={content.id} className='w-40 flex-none'>
                      <img
                        src={ORIGINAL_IMG_BASE_URL + content.profile_path}
                        alt='Poster path'
                        className='w-full h-auto rounded-md'
                      />
                      <h4 className='mt-2 text-lg font-semibold'>{content.title || content.name}</h4>
                    </div>
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
  );
}

export default PlayTv;