import { Link } from 'react-router-dom'
import { Candy, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 animate-gradient"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-4 rounded-3xl animate-bounce-slow">
                <Candy className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Welcome to Sweet Shop
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Discover a magical world of delicious treats and candies. 
              Your one-stop destination for all things sweet! 🍬
            </p>

            <div className="inline-block px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold text-lg shadow-lg">
              💰 Best Prices in Rupees (₹)
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                to="/register"
                className="group flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/login"
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-bold text-lg hover:bg-purple-50 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Sweet Shop?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center space-y-4 card-hover">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Wide Selection</h3>
              <p className="text-gray-600">
                Browse through hundreds of delicious sweets from chocolates to gummies
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center space-y-4 card-hover">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Premium Quality</h3>
              <p className="text-gray-600">
                Only the finest and freshest sweets make it to our collection
              </p>
            </div>

            <div className="glass rounded-2xl p-8 text-center space-y-4 card-hover">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto">
                <Candy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Easy Shopping</h3>
              <p className="text-gray-600">
                Simple and intuitive interface for a delightful shopping experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto glass rounded-3xl p-12 text-center space-y-6">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Ready to Satisfy Your Sweet Tooth?
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of happy customers enjoying our premium sweets collection
          </p>
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            Create Your Account
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
