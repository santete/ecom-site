import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products'; // Sẽ cập nhật data

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [priceRange, setPriceRange] = useState([0, 5000000]); // Giá VND
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);


  const categories = [
    { name: 'Tất Cả', slug: 'all' },
    { name: 'Bao Cao Su', slug: 'bao-cao-su' },
    { name: 'Đồ Lót', slug: 'do-lot' },
    { name: 'Dụng Cụ Hỗ Trợ', slug: 'dung-cu' },
    { name: 'Tất & Vớ', slug: 'tat-vo' },
    { name: 'Thắt Lưng', slug: 'that-lung' }
  ];

  useEffect(() => {
    // Cập nhật URL khi category thay đổi
    if (selectedCategory === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', selectedCategory);
    }
    setSearchParams(searchParams);

    let productsToFilter = allProducts; // Sử dụng allProducts đã cập nhật

    // Lọc theo query tìm kiếm
    if (searchQuery) {
      productsToFilter = productsToFilter.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      productsToFilter = productsToFilter.filter(product => product.categorySlug === selectedCategory);
    }

    // Lọc theo khoảng giá
    productsToFilter = productsToFilter.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sắp xếp sản phẩm
    productsToFilter.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        default: // 'name'
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(productsToFilter);
  }, [searchQuery, selectedCategory, priceRange, sortBy, setSearchParams, searchParams]);


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Khám Phá Sản Phẩm</h1>
          <p className="text-lg text-gray-600">Tìm kiếm những điều thầm kín phù hợp với bạn.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar Trigger for Mobile */}
           <div className="lg:hidden mb-4">
            <Button 
              variant="outline" 
              className="w-full flex justify-between items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>{showFilters ? 'Ẩn Bộ Lọc' : 'Hiện Bộ Lọc'}</span>
              {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </Button>
          </div>


          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-72 space-y-6 ${showFilters ? 'block' : 'hidden'} lg:block`}
          >
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2 text-pink-600" />
                Bộ Lọc Sản Phẩm
              </h3>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tìm Kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tên sản phẩm..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Danh Mục</label>
                <div className="space-y-1.5">
                  {categories.map(category => (
                    <label key={category.slug} className="flex items-center cursor-pointer p-2 hover:bg-rose-50 rounded-md transition-colors">
                      <input
                        type="radio"
                        name="category"
                        value={category.slug}
                        checked={selectedCategory === category.slug}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-pink-600 border-gray-300 focus:ring-pink-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Khoảng Giá: {priceRange[0].toLocaleString()}đ - {priceRange[1].toLocaleString()}đ
                </label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="5000000" // Max 5 triệu
                    step="50000" // Bước nhảy 50k
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), Math.max(parseInt(e.target.value), priceRange[1])])}
                    className="w-full accent-pink-600"
                    aria-label="Giá tối thiểu"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000000"
                    step="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([Math.min(parseInt(e.target.value), priceRange[0]), parseInt(e.target.value)])}
                    className="w-full accent-pink-600"
                    aria-label="Giá tối đa"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-3.5 rounded-xl shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-center gap-3"
            >
              <span className="text-sm text-gray-600">
                Tìm thấy {filteredProducts.length} sản phẩm
              </span>
              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-1 focus:ring-pink-500 focus:border-pink-500 text-sm"
                >
                  <option value="name">Sắp xếp: Mặc định</option>
                  <option value="price-low">Giá: Thấp đến Cao</option>
                  <option value="price-high">Giá: Cao đến Thấp</option>
                  <option value="rating">Đánh giá cao</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    title="Xem dạng lưới"
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 ${viewMode === 'grid' ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 hover:bg-rose-50'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    title="Xem dạng danh sách"
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 ${viewMode === 'list' ? 'bg-pink-600 text-white' : 'bg-white text-gray-600 hover:bg-rose-50'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {filteredProducts.length > 0 ? (
              <div className={`grid gap-5 ${
                viewMode === 'grid' 
                  ? 'grid-cols-2 md:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-600">Vui lòng thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;