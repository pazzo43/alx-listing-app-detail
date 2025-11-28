Step-by-Step Implementation
Step 1: Duplicate the Repository
# Navigate to your projects directory
cd /path/to/your/projects

# Duplicate the repository
cp -r alx-listing-app-00 alx-listing-app-01

# Navigate to the new project
cd alx-listing-app-01

Step 2: Create the Folder Structure
# Create the property components directory structure
mkdir -p components/property

# Create the required component files
touch components/property/PropertyDetail.tsx
touch components/property/BookingSection.tsx
touch components/property/ReviewSection.tsx

# Create the dynamic route directory
mkdir -p pages/property
touch pages/property/[id].tsx

Step 3: Set Up TypeScript Interfaces
First, let's create the necessary TypeScript interfaces. Create or update interfaces/index.ts:
  // interfaces/index.ts
export interface PropertyProps {
  id: string;
  name: string;
  rating: number;
  address: {
    city: string;
    country: string;
  };
  image: string;
  description: string;
  category: string[];
  price: number;
  reviews: ReviewProps[];
}

export interface ReviewProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

Step 4: Create Mock Data
Update or create constants/index.ts with sample data:
// constants/index.ts
export const PROPERTYLISTINGSAMPLE = [
  {
    id: '1',
    name: 'beach-house',
    rating: 4.8,
    address: {
      city: 'Malibu',
      country: 'United States'
    },
    image: '/images/beach-house.jpg',
    description: 'Beautiful beach house with stunning ocean views. Perfect for a relaxing getaway with family or friends. Features modern amenities and direct beach access.',
    category: ['WiFi', 'Pool', 'Ocean View', 'Parking', 'Air Conditioning', 'Kitchen'],
    price: 250,
    reviews: [
      {
        id: '1',
        name: 'Sarah Johnson',
        avatar: '/avatars/user1.jpg',
        rating: 5,
        comment: 'Amazing location and the house was spotless! Will definitely come back.',
        date: '2024-01-15'
      },
      {
        id: '2',
        name: 'Mike Chen',
        avatar: '/avatars/user2.jpg',
        rating: 4,
        comment: 'Great property with beautiful views. The pool was fantastic!',
        date: '2024-01-10'
      }
    ]
  },
  {
    id: '2',
    name: 'mountain-cabin',
    rating: 4.9,
    address: {
      city: 'Aspen',
      country: 'United States'
    },
    image: '/images/mountain-cabin.jpg',
    description: 'Cozy mountain cabin surrounded by nature. Perfect for skiing enthusiasts and nature lovers.',
    category: ['Fireplace', 'Mountain View', 'Hot Tub', 'WiFi', 'Parking'],
    price: 180,
    reviews: [
      {
        id: '1',
        name: 'Emily Davis',
        avatar: '/avatars/user3.jpg',
        rating: 5,
        comment: 'Absolutely magical! The views were breathtaking.',
        date: '2024-01-20'
      }
    ]
  }
];

Step 5: Implement the Dynamic Property Page
Create pages/property/[id].tsx:
// pages/property/[id].tsx
import { PROPERTYLISTINGSAMPLE } from "@/constants/index";
import { useRouter } from "next/router";
import PropertyDetail from "@/components/property/PropertyDetail";

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  const property = PROPERTYLISTINGSAMPLE.find((item) => item.name === id);

  if (!property) return <p className="text-center mt-8">Property not found</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <PropertyDetail property={property} />
    </div>
  );
}

Step 6: Implement the PropertyDetail Component
Create components/property/PropertyDetail.tsx:
// components/property/PropertyDetail.tsx
import { PropertyProps } from "@/interfaces/index";
import BookingSection from "./BookingSection";
import ReviewSection from "./ReviewSection";
import { useState } from "react";

const PropertyDetail: React.FC<{ property: PropertyProps }> = ({ property }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-gray-900">{property.name}</h1>
        <div className="flex items-center space-x-2 mt-2">
          <span className="flex items-center text-yellow-500">
            ⭐ {property.rating}
          </span>
          <span className="text-gray-600">
            {property.address.city}, {property.address.country}
          </span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:w-2/3">
          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <img 
              src={property.image} 
              alt={property.name} 
              className="col-span-2 w-full h-96 object-cover rounded-lg shadow-md"
            />
            {/* Additional images would go here */}
            <img 
              src={property.image} 
              alt={`${property.name} 2`} 
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
            <img 
              src={property.image} 
              alt={`${property.name} 3`} 
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Description Tabs */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'description' 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('description')}
              >
                What we offer
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'host' 
                    ? 'border-b-2 border-blue-500 text-blue-600' 
                    : 'text-gray-500'
                }`}
                onClick={() => setActiveTab('host')}
              >
                About host
              </button>
            </div>

            {activeTab === 'description' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed">{property.description}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection reviews={property.reviews} />
            )}

            {activeTab === 'host' && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">About your host</h2>
                <p className="text-gray-700">Your host is dedicated to providing an exceptional experience for all guests.</p>
              </div>
            )}
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.category.map((amenity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Booking Section */}
        <div className="lg:w-1/3">
          <div className="sticky top-6">
            <BookingSection price={property.price} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
Step 7: Implement the BookingSection Component
Create components/property/BookingSection.tsx:
// components/property/BookingSection.tsx
import { useState } from "react";

const BookingSection: React.FC<{ price: number }> = ({ price }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  
  // Calculate number of nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const timeDiff = end.getTime() - start.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const nights = calculateNights();
  const total = price * nights;

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
      <h3 className="text-2xl font-semibold mb-4">${price} <span className="text-lg font-normal text-gray-600">night</span></h3>
      
      {/* Date Pickers */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input 
            type="date" 
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input 
            type="date" 
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Total Payment */}
      {nights > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">${price} × {nights} nights</span>
            <span className="font-medium">${price * nights}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-semibold mt-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

      {/* Reserve Button */}
      <button 
        className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold transition-colors ${
          nights > 0 
            ? 'bg-green-500 hover:bg-green-600 text-white' 
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={nights === 0}
      >
        Reserve now
      </button>
    </div>
  );
};

export default BookingSection;

Step 8: Implement the ReviewSection Component
Create components/property/ReviewSection.tsx:
// components/property/ReviewSection.tsx
import { ReviewProps } from "@/interfaces/index";

const ReviewSection: React.FC<{ reviews: ReviewProps[] }> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`text-lg ${
              index < rating ? 'text-yellow-500' : 'text-gray-300'
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">Guest Reviews</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start space-x-4">
                {/* Placeholder for avatar - you can replace with actual images */}
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-gray-500 text-sm">{review.date}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;

Step 9: Test the Application
# Run the development server
npm run dev

# Or if using a specific port
npm run dev -- -p 3000

Step 10: Test the Dynamic Routes
Open http://localhost:3000/property/beach-house

Open http://localhost:3000/property/mountain-cabin

Test the responsive design by resizing your browser

Key Features Implemented
✅ Dynamic Routing - Properties accessible via /property/[id]
✅ Responsive Layout - Mobile-first design with Tailwind CSS
✅ Tabbed Interface - Description, Reviews, and Host info
✅ Interactive Booking - Date selection with total calculation
✅ Review System - Star ratings and user comments
✅ Type Safety - Full TypeScript implementation

Next Steps for Enhancement
Once this basic implementation is working, you could:

Add image carousel functionality

Implement actual date validation

Add loading states

Connect to a real backend API

Add map integration for location

Implement booking confirmation
