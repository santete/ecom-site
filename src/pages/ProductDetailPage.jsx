import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, Share2, Truck, Shield, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { allProducts } from '@/data/products';
import { toast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tìm thấy</h2>
          <Link to="/products">
            <Button>Quay Lại Trang Sản Phẩm</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const displayPrice = (price) => (price * 25000).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

  const categoryDisplay = (category) => {
    switch (category) {
      case "condoms": return "Bao Cao Su";
      case "lingerie": return "Đồ Lót";
      case "toys": return "Dụng Cụ Hỗ Trợ";
      case "accessories": return "Phụ Kiện";
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/products" className="flex items-center text-pink-600 hover:text-pink-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay Lại Trang Sản Phẩm
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img 
                className="w-full h-full object-cover"
                alt={product.name}
               src="https://images.unsplash.com/photo-1635865165118-917ed9e20936" />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, "Sản phẩm tương tự 1", "Sản phẩm tương tự 2", "Sản phẩm tương tự 3"].map((imgDesc, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-pink-600' : 'border-gray-200'
                  }`}
                >
                  <img 
                    className="w-full h-full object-cover"
                    alt={`${product.name} xem ${index + 1}`}
                   src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <span className="inline-block px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium mb-4 capitalize">
                {categoryDisplay(product.category)}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating}) • {Math.floor(Math.random() * 50 + 10)} đánh giá</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">{displayPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">{displayPrice(product.originalPrice)}</span>
                )}
                {product.discount && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô Tả</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || `Trải nghiệm chất lượng cao cấp với ${product.name.toLowerCase()} tuyệt vời này. Được chế tác tỉ mỉ và thiết kế cho lối sống hiện đại, sản phẩm này kết hợp chức năng với phong cách. Hoàn hảo cho sử dụng hàng ngày và bền bỉ.`}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold text-gray-900">Số Lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                size="lg"
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4"
              >
                Thêm vào Giỏ Hàng - {displayPrice(product.price * quantity)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-pink-600 text-pink-600 hover:bg-pink-50"
              >
                <Heart className="w-5 h-5 mr-2" />
                Yêu Thích
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-pink-600" />
                <span className="text-sm text-gray-600">Giao hàng kín đáo</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-pink-600" />
                <span className="text-sm text-gray-600">Đảm bảo chất lượng</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="py-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Sản Phẩm Tương Tự</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;