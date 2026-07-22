import { useEffect, useState } from 'react'
import ProductCard from '../Components/ProductCard'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/product");
           console.log("Status:", res.status);
        const data = await res.json()
       console.log("Products:", data);
        setProducts(data.slice(0, 4))
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [])
  return (
    <div className='home-container'>
      <div className="hero-banner">
        <h1>Welcome to Shoplix</h1>
        <p>Discover the best products at unbeatable prices.</p>
      </div>
      <h2>Featured Products</h2>
      {loading ? (
        <div >Loading...</div>
      ) : (
        <div className='product-grid'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
