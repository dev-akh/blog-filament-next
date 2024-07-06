import Image from 'next/image';
import BannerImage from "@/assets/images/banner.jpg";

const HeroBanner = ({ children }: { children: JSX.Element[] | JSX.Element }) => {
  return (
    <section>
      <div className='container-xl m-auto '>
        <div className='grid grid-cols-1 relative '>
          <Image
            src={BannerImage}
            alt=''
            className='object-cover h-[400px] w-full'
            width={0}
            height={0}
            sizes='100vw'
            priority={true}
          />
        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
        <div className='relative text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center'>
            <h2 className='text-3xl font-extrabold sm:text-5xl md:text-5xl'>
               <b className="text-blue-600 "> Explore </b> <span className="text-white">Engaging Blog Posts</span> 
            </h2>
            <p className='my-4 text-2xl text-white'>
                Dive into insightful articles that inspire and inform.
            </p>
        </div>
        </div>

        </div>
        <div className="px-24">
            {children}
        </div>
      </div>
    </section>
  );
};
export default HeroBanner;
