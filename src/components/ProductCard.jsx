import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const displayPrice = (price) => price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  
  const categoryDisplayMap = {
    'bao-cao-su': 'Bao Cao Su',
    'do-lot': 'Đồ Lót',
    'dung-cu': 'Dụng Cụ',
    'tat-vo': 'Tất & Vớ',
    'that-lung': 'Thắt Lưng',
    'all': 'Sản phẩm'
  };
  
  const categoryName = categoryDisplayMap[product.categorySlug] || product.categorySlug;
  const productImage = product.images && product.images.length > 0 ? product.images[0] : (product.image || "Ảnh sản phẩm mặc định");


  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: "0 10px 20px rgba(0,0,0,0.08)" }}
        className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
      >
        <Link to={`/product/${product.id}`} className="flex flex-col sm:flex-row p-4 gap-4">
          <div className="w-full sm:w-32 h-32 sm:h-auto bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 aspect-square">
            <img 
              className="w-full h-full object-contain p-1"
              alt={product.name}
              src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
          </div>
          
          <div className="flex-1 space-y-2 sm:space-y-2.5">
            <div>
              <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-1.5 capitalize">
                {categoryName}
              </span>
              <h3 className="text-md lg:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">{product.name}</h3>
              
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.rating || 0})</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-pink-600">{displayPrice(product.price)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">{displayPrice(product.originalPrice)}</span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  className="border-gray-300 text-gray-600 hover:bg-rose-50 hover:border-pink-300 p-1.5 h-auto"
                  aria-label="Yêu thích"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddToCart}
                  className="bg-pink-600 hover:bg-pink-700 text-white px-3 py-1.5 h-auto text-xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                  Thêm vào Giỏ
                </Button>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden product-card group border border-transparent hover:border-pink-200"
    >
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <div className="aspect-square bg-gray-50 overflow-hidden">
            <img 
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              alt={product.name}
              src="https://images.unsplash.com/photo-1671376354106-d8d21e55dddd" />
          </div>
          
          {product.discount && (
            <div className="absolute top-2.5 left-2.5">
              <span className="discount-badge text-xs">-{product.discount}%</span>
            </div>
          )}
          
          <button
            aria-label="Thêm vào yêu thích"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
            className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-rose-50 text-gray-600 hover:text-pink-500 transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 space-y-2">
          <div>
            <span className="inline-block px-2 py-0.5 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold mb-1.5 capitalize">
              {categoryName}
            </span>
            <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2 h-10">{product.name}</h3>
            
            <div className="flex items-center gap-1 mb-1.5">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.rating || 0})</span>
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-pink-600">{displayPrice(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">{displayPrice(product.originalPrice)}</span>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity !mt-3"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" />
            Thêm vào Giỏ
          </Button>
           <div className="h-[38px] group-hover:hidden"></div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;