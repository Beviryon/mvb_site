import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  role?: string;
  image: {
    url: string;
    alt: string;
  };
  rating: number;
  content: string;
  date: string;
}

export default function TestimonialCard({
  name,
  role,
  image,
  rating,
  content,
  date,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header with Profile Image and Info */}
      <div className="flex items-center mb-4">
        <div className="relative h-12 w-12 rounded-full overflow-hidden">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {role && <p className="text-sm text-gray-600">{role}</p>}
        </div>
      </div>

      {/* Rating Stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`h-5 w-5 ${
              index < rating ? 'bg-[#800000]' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
              clipRule="evenodd"
            />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <div className="relative">
        <svg
          className="absolute -top-2 -left-2 h-8 w-8 text-gray-200"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <blockquote className="text-gray-600 italic mb-4">
          {content}
        </blockquote>
      </div>

      {/* Date */}
      <p className="text-sm text-gray-500">
        {new Date(date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>
    </div>
  );
} 