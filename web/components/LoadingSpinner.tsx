import React from 'react';
import Image from 'next/image';
import LoadingGif from '@/assets/images/loading.gif';

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center my-8">
    <Image src={LoadingGif} alt="Loading..." width={100} height={100} />
  </div>
);

export default LoadingSpinner;
