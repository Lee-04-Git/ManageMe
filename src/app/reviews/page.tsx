"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import {
  Star,
  ThumbsUp,
  MessageCircle,
  Filter,
  Search,
  MoreVertical,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      client: "TechCorp Solutions",
      project: "E-commerce Platform",
      rating: 5,
      review:
        "Exceptional work! The team delivered beyond our expectations. The platform is fast, secure, and user-friendly. Highly recommend for any web development projects.",
      date: "Oct 20, 2024",
      avatar: "TC",
      helpful: 12,
      verified: true,
    },
    {
      id: 2,
      client: "StartupXYZ",
      project: "Mobile Banking App",
      rating: 4,
      review:
        "Great experience working with this team. Professional, timely, and the final product exceeded our requirements. Minor issues with initial communication but overall fantastic.",
      date: "Oct 18, 2024",
      avatar: "SX",
      helpful: 8,
      verified: true,
    },
    {
      id: 3,
      client: "InnovateTech",
      project: "CRM Dashboard",
      rating: 5,
      review:
        "Outstanding quality and attention to detail. The dashboard is intuitive and powerful. The team was responsive and implemented all our feedback perfectly.",
      date: "Oct 15, 2024",
      avatar: "IT",
      helpful: 15,
      verified: true,
    },
    {
      id: 4,
      client: "DigitalFirst Agency",
      project: "AI Analytics Tool",
      rating: 4,
      review:
        "Solid work on the analytics platform. The AI integration works seamlessly and the insights are valuable. Would work with them again for future projects.",
      date: "Oct 12, 2024",
      avatar: "DF",
      helpful: 6,
      verified: false,
    },
    {
      id: 5,
      client: "GrowthCo",
      project: "Social Media App",
      rating: 5,
      review:
        "Incredible team! They transformed our vision into reality. The app is beautiful, fast, and our users love it. Communication was excellent throughout the project.",
      date: "Oct 10, 2024",
      avatar: "GC",
      helpful: 20,
      verified: true,
    },
    {
      id: 6,
      client: "EduTech Solutions",
      project: "Learning Management System",
      rating: 4,
      review:
        "Professional team with great technical skills. The LMS is feature-rich and meets all our educational requirements. Delivery was on time and within budget.",
      date: "Oct 8, 2024",
      avatar: "ES",
      helpful: 9,
      verified: true,
    },
  ];

  const stats = {
    totalReviews: reviews.length,
    averageRating: (
      reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    ).toFixed(1),
    fiveStars: reviews.filter((r) => r.rating === 5).length,
    fourStars: reviews.filter((r) => r.rating === 4).length,
    threeStars: reviews.filter((r) => r.rating === 3).length,
    twoStars: reviews.filter((r) => r.rating === 2).length,
    oneStar: reviews.filter((r) => r.rating === 1).length,
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingPercentage = (stars: number) => {
    return ((stars / reviews.length) * 100).toFixed(0);
  };

  return (
    <div className="min-h-screen bg-[#1a1d23] flex">
      <Sidebar />

      <motion.main
        className="flex-1 p-8 overflow-auto"
        initial={{ opacity: 0.98 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.05 }}
      >
        <Header />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Reviews & Ratings
          </h1>
          <p className="text-gray-400">Client feedback and project reviews</p>
        </div>

        {/* Review Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Total Reviews
            </h3>
            <p className="text-3xl font-bold text-white">
              {stats.totalReviews}
            </p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Average Rating
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-yellow-400">
                {stats.averageRating}
              </p>
              <div className="flex">
                {renderStars(Math.round(parseFloat(stats.averageRating)))}
              </div>
            </div>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              5-Star Reviews
            </h3>
            <p className="text-3xl font-bold text-green-400">
              {stats.fiveStars}
            </p>
          </div>
          <div className="bg-[#2a2d35] p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-2">
              Verified Reviews
            </h3>
            <p className="text-3xl font-bold text-blue-400">
              {reviews.filter((r) => r.verified).length}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Rating Breakdown */}
          <div className="lg:col-span-1">
            <div className="bg-[#2a2d35] p-6 rounded-lg">
              <h3 className="text-white font-semibold text-lg mb-4">
                Rating Breakdown
              </h3>

              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count =
                    stars === 5
                      ? stats.fiveStars
                      : stars === 4
                        ? stats.fourStars
                        : stars === 3
                          ? stats.threeStars
                          : stars === 2
                            ? stats.twoStars
                            : stats.oneStar;
                  return (
                    <div key={stars} className="flex items-center gap-3">
                      <span className="text-gray-400 text-sm w-6">{stars}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${getRatingPercentage(count)}%` }}
                        ></div>
                      </div>
                      <span className="text-gray-400 text-sm w-8">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  className="w-full bg-[#2a2d35] text-white placeholder-gray-400 pl-10 pr-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-[#ff6b6b] focus:outline-none"
                />
              </div>

              <button className="bg-[#2a2d35] hover:bg-[#3a3d45] text-gray-300 px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#2a2d35] p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#ff6b6b] flex items-center justify-center text-white font-semibold">
                        {review.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-white font-semibold">
                            {review.client}
                          </h3>
                          {review.verified && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">
                          {review.project}
                        </p>
                      </div>
                    </div>

                    <button className="text-gray-400 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(review.rating)}
                    <span className="text-gray-400 text-sm ml-2">
                      {review.date}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {review.review}
                  </p>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">
                        Helpful ({review.helpful})
                      </span>
                    </button>

                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">Reply</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
