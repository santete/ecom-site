import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
               <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">SV</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">SecretVibe</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Khám phá thế giới riêng tư của bạn với các sản phẩm chất lượng và kín đáo. Mua sắm an toàn và bảo mật.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Khám Phá</span>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Trang Chủ
              </Link>
              <Link to="/products" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Tất Cả Sản Phẩm
              </Link>
              <Link to="/products?category=bao-cao-su" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Bao Cao Su
              </Link>
              <Link to="/products?category=do-lot" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Đồ Lót
              </Link>
              <Link to="/products?category=dung-cu" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Dụng Cụ Hỗ Trợ
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Hỗ Trợ Khách Hàng</span>
            <div className="space-y-2">
              <span className="block text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                Câu Hỏi Thường Gặp
              </span>
              <span className="block text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                Chính Sách Giao Hàng Kín Đáo
              </span>
              <span className="block text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                Chính Sách Đổi Trả
              </span>
               <span className="block text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
                Hướng Dẫn Bảo Quản
              </span>
              <Link to="/cart" className="block text-gray-400 hover:text-white transition-colors text-sm">
                Theo Dõi Đơn Hàng (Giỏ Hàng)
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Liên Hệ Kín Đáo</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-pink-400" />
                <span className="text-gray-400 text-sm">hotro@secretvibe.vn</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-pink-400" />
                <span className="text-gray-400 text-sm">09XX XXX XXX (Zalo)</span>
              </div>
              <p className="text-gray-500 text-xs italic">Chúng tôi cam kết bảo mật thông tin của bạn.</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2024 SecretVibe. Mọi thông tin đều được bảo mật.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
              Chính Sách Bảo Mật
            </span>
            <span className="text-gray-400 hover:text-white transition-colors text-sm cursor-pointer">
              Điều Khoản Sử Dụng
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;