import { Link } from 'react-router-dom'
import { Candy, ShoppingBag, Sparkles, ArrowRight, Star, Heart, Package, Zap } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative overflow-hidden py-24 px-4">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            {/* Floating Candy Icon */}
            <div className="inline-block relative">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-6 rounded-3xl animate-bounce-slow shadow-2xl">
                <Candy className="w-20 h-20 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                NEW
              </div>
            </div>
            
            {/* Main Heading with Gradient */}
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-gradient">
                  Sweet Shop
                </span>
              </h1>
              <div className="flex items-center justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600 font-semibold">4.9/5.0 Rating</span>
              </div>
            </div>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              Your one-stop destination for <span className="text-pink-600 font-bold">premium sweets</span> and 
              <span className="text-purple-600 font-bold"> delicious treats</span>! 🍬✨
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                to="/register"
                className="group flex items-center space-x-2 px-10 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-110 animate-gradient"
              >
                <Sparkles className="w-6 h-6" />
                <span>Start Shopping</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="px-10 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-bold text-lg hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-12">
              <div className="glass rounded-2xl p-4">
                <p className="text-3xl font-bold text-purple-600">1000+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-3xl font-bold text-pink-600">500+</p>
                <p className="text-sm text-gray-600">Products</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-3xl font-bold text-indigo-600">4.9★</p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-600 text-lg">Experience the best sweet shopping journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass rounded-3xl p-8 text-center space-y-4 card-hover group">
              <div className="relative inline-block">
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Wide Selection</h3>
              <p className="text-gray-600">
                Browse through hundreds of delicious sweets from chocolates to gummies and more!
              </p>
              <div className="pt-2">
                <span className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold">
                  500+ Products
                </span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass rounded-3xl p-8 text-center space-y-4 card-hover group">
              <div className="relative inline-block">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-yellow-500 w-6 h-6 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Premium Quality</h3>
              <p className="text-gray-600">
                Only the finest and freshest sweets make it to our premium collection
              </p>
              <div className="pt-2">
                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-600 rounded-full text-sm font-semibold">
                  Top Rated
                </span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass rounded-3xl p-8 text-center space-y-4 card-hover group">
              <div className="relative inline-block">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                  <Package className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and secure delivery to your doorstep with care and love
              </p>
              <div className="pt-2">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                  Same Day
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="glass-dark rounded-3xl p-12 text-center space-y-6 backdrop-blur-xl">
            <div className="inline-block">
              <Candy className="w-16 h-16 text-white mx-auto animate-bounce-slow" />
            </div>
            <h2 className="text-5xl font-bold text-white">
              Ready to Satisfy Your Sweet Tooth?
            </h2>
            <p className="text-xl text-white/90">
              Join thousands of happy customers enjoying our premium sweets collection
            </p>
            <Link
              to="/register"
              className="inline-flex items-center space-x-2 px-12 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-110"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="pt-4">
              <p className="text-white/80 text-sm">✨ No credit card required • Free forever</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
