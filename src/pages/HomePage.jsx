import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Package, Tag, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { featuredProducts } from '@/data/products'; // Sẽ cập nhật data này sau

const HomePage = () => {
  const categories = [
    { name: 'Bao Cao Su', slug: 'bao-cao-su', image: 'Hộp bao cao su các loại trên nền tối', color: 'from-rose-500 to-pink-600' },
    { name: 'Đồ Lót Gợi Cảm', slug: 'do-lot', image: 'Bộ đồ lót ren đen quyến rũ', color: 'from-purple-500 to-indigo-600' },
    { name: 'Dụng Cụ Hỗ Trợ', slug: 'dung-cu', image: 'Các loại dụng cụ hỗ trợ tế nhị', color: 'from-teal-500 to-cyan-600' },
    { name: 'Phụ Kiện Khác', slug: 'phu-kien', image: 'Các phụ kiện như tất lưới, thắt lưng da', color: 'from-amber-500 to-orange-600' }
  ];

  const features = [
    {
      icon: Lock,
      title: 'Mua Sắm Kín Đáo',
      description: 'Đóng gói không tên sản phẩm, bảo mật thông tin tuyệt đối.'
    },
    {
      icon: ShieldCheck,
      title: 'Chất Lượng Đảm Bảo',
      description: 'Sản phẩm chính hãng, an toàn cho sức khỏe.'
    },
    {
      icon: Package,
      title: 'Giao Hàng Nhanh Chóng',
      description: 'Vận chuyển hỏa tốc, nhận hàng trong ngày tại TP.HCM & Hà Nội.'
    },
    {
      icon: Tag,
      title: 'Ưu Đãi Hấp Dẫn',
      description: 'Nhiều chương trình khuyến mãi, quà tặng đặc biệt.'
    }
  ];

  // Lấy 4 sản phẩm đầu tiên từ danh sách đã được cập nhật (sẽ làm ở bước sau)
  const currentFeaturedProducts = featuredProducts.slice(0, 4);


  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-rose-900 to-pink-900 text-white">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Khám Phá
                <span className="block bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  Niềm Vui Thầm Kín
                </span>
                Của Bạn
              </h1>
              <p className="text-lg lg:text-xl text-rose-100 leading-relaxed">
                SecretVibe mang đến những sản phẩm chất lượng, giúp bạn tự tin thể hiện cá tính và tận hưởng những khoảnh khắc riêng tư trọn vẹn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <Button size="lg" className="bg-white text-pink-600 hover:bg-rose-50 font-semibold px-8 py-3 text-md w-full sm:w-auto">
                    Xem Tất Cả
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-pink-600 font-semibold px-8 py-3 text-md w-full sm:w-auto">
                  Ưu Đãi Hot
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 aspect-[4/3] lg:aspect-square">
                <img 
                  className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  alt="Người mẫu quyến rũ với sản phẩm tế nhị" src="https://images.unsplash.com/photo-1652715256456-d151ce3cd7dd" />
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl opacity-30 transform rotate-[-3deg]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Danh Mục Kín Đáo</h2>
            <p className="text-lg text-gray-600">Lựa chọn sản phẩm phù hợp với sở thích của bạn</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link key={category.slug} to={`/products?category=${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer aspect-square overflow-hidden rounded-xl shadow-lg"
                >
                  <img 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    alt={category.name}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-40 group-hover:opacity-50 transition-opacity`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-sm">
                    <h3 className="text-md lg:text-lg font-semibold text-white text-center">{category.name}</h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-rose-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Được Yêu Thích Nhất</h2>
            <p className="text-lg text-gray-600">Những sản phẩm bán chạy và được đánh giá cao</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {currentFeaturedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 lg:mt-16">
            <Link to="/products">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 text-md">
                Xem Thêm Sản Phẩm
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">Tại Sao Chọn SecretVibe?</h2>
            <p className="text-lg text-gray-600">Cam kết mang đến trải nghiệm mua sắm tốt nhất</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-rose-50 to-pink-100 hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-gray-800 via-rose-800 to-pink-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Nhận Tin Tức Kín Đáo</h2>
            <p className="text-lg text-rose-100 mb-8">
              Đăng ký để nhận thông tin về sản phẩm mới, ưu đãi độc quyền và mẹo hay.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Địa chỉ email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-pink-500"
                aria-label="Email for newsletter"
              />
              <Button type="submit" className="bg-white text-pink-600 hover:bg-rose-50 font-semibold px-6 py-3 text-md">
                Đăng Ký Ngay
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;