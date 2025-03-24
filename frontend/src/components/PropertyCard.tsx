import Image from 'next/image';
import Link from 'next/link';

interface PropertyCardProps {
  id: string;
  title: string;
  description: string;
  image: {
    url: string;
    alt: string;
  };
  price: number;
  location: string;
  features: {
    bedrooms?: number;
    bathrooms?: number;
    area: number;
  };
  type: 'vente' | 'location';
}

export default function PropertyCard({
  title,
  description,
  image,
  price,
  location,
  features,
  type,
}: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image Container */}
      <div className="relative h-48 w-full">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600 text-white">
            {type === 'vente' ? 'À vendre' : 'À louer'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Price */}
        <div className="mb-4">
          <p className="text-2xl font-bold text-blue-600">{formatPrice(price)}</p>
          {type === 'location' && <p className="text-sm text-gray-500">/ mois</p>}
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {features.bedrooms && (
            <div className="flex items-center text-gray-600">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span className="text-sm">{features.bedrooms} chambres</span>
            </div>
          )}
          {features.bathrooms && (
            <div className="flex items-center text-gray-600">
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span className="text-sm">{features.bathrooms} sdb</span>
            </div>
          )}
          <div className="flex items-center text-gray-600">
            <svg
              className="h-5 w-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            <span className="text-sm">{features.area} m²</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-6">
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span className="text-sm">{location}</span>
        </div>

        {/* Action Button */}
        <Link
          href={`/portfolio/${id}`}
          className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
} 