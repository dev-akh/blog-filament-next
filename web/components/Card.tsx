import Image from "next/image"
import Link from "next/link";
import { type Post } from "@/types/post";
import defaultBlogImage from '@/assets/images/blog-320x200.png';
import { formatDate } from "@/services/dateFormat";
import { FaClock } from "react-icons/fa";

function Card({ item }: { item: Post }) {

  const imageSrc: string = item.image ?? defaultBlogImage;
  const postDate: string = formatDate(item.created_at);
  return (

    <div className="max-w-full m-2 sm:m-0 bg-gray-100 shadow-sm transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 duration-300 rounded-md">
      <Link className="text-lg " href={`/${item.slug}`}>
      <Image className="rounded-lg p-3 " width={1000} height={250} src={imageSrc} alt="Blog Image" />
      <div className="p-3">
        <div className="flex mb-3 text-sm text-gray-500 dark:text-gray-400">
          <FaClock/> 
          <p className="px-2">
            {postDate}
          </p>
        </div>
          {item.title}
      </div>
      </Link>
    </div>

  )

}

export default Card
