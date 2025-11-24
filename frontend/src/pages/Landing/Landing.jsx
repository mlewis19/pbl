import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content fade-in">
            <div className="hero-text">
              <h1>
                Fresh from <span className="highlight">Farm</span> to Your <span className="highlight">Table</span>
              </h1>
              <p>
                Connect directly with local farmers in Mangalore. Get fresh produce, 
                support local agriculture, and eliminate the middleman.
              </p>
              <div className="hero-buttons">
                <Link to="/consumer/products" className="btn btn-primary btn-lg">
                  🛒 Shop Now
                </Link>
                <Link to="/register?role=producer" className="btn btn-outline btn-lg">
                  🌾 Sell Your Produce
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-main">🥬</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about">
        <div className="container">
          <div className="section-header">
            <h2>About Kisan Kart</h2>
            <p>Revolutionizing the way you buy fresh produce</p>
          </div>
          <div className="about-content">
            <div className="about-image">
              🚜
            </div>
            <div className="about-text">
              <h3>Empowering Farmers, Delighting Consumers</h3>
              <p>
                Kisan Kart is a revolutionary platform that connects farmers directly 
                with consumers in Mangalore. We believe in fair prices for farmers 
                and fresh produce for families.
              </p>
              <p>
                By removing intermediaries, we ensure that farmers get better value 
                for their hard work, and consumers get the freshest produce at 
                competitive prices.
              </p>
              <p>
                Join us in supporting local agriculture and building a sustainable 
                food ecosystem.
              </p>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Farmers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">2000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Fresh & Organic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Kisan Kart?</h2>
            <p>Experience the difference of farm-fresh produce</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>100% Fresh</h3>
              <p>
                Get produce directly from farms. No storage, no preservatives, 
                just pure freshness delivered to your doorstep.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Fair Prices</h3>
              <p>
                No middlemen means better prices for both farmers and consumers. 
                Everyone wins in this direct trade model.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Support Local</h3>
              <p>
                Every purchase directly supports local farmers and their families. 
                Build a stronger community together.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Quick Delivery</h3>
              <p>
                Choose between convenient home delivery or pickup options. 
                Track your order in real-time.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Quality Assured</h3>
              <p>
                All produce is verified for quality. Rate and review to help 
                maintain our high standards.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy to Use</h3>
              <p>
                Simple, intuitive platform. Browse, order, and track - all in 
                a few taps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of happy customers and farmers today!</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-lg">
              Create Account
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg" style={{borderColor: 'white', color: 'white'}}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;