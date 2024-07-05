import React from 'react';
import Image from 'next/image';
import LoadingGif from '@/assets/images/loading.gif';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center flex-col items-center my-8">
    <Image src={LoadingGif} alt="Loading..." width={50} height={50} />
    <div className="ml-2 dark:text-gray-100">
      Fetching . . .
    </div>
  </div>
);

export default LoadingSpinner;
