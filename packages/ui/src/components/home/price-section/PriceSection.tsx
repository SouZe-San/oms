import "./style.css";

const PriceSection = () => {
  return (
    <section className="under-section membership-section home-section" id="price">
      <div className="container">
        <h2 className="section-title">Subscription Plans</h2>
        <p className="section-subtitle">Choose the plan that fits your lifestyle and future goals</p>

        <div className="plans-container">
          <div className="plan-card">
            <div className="plan-header">
              <h3 className="plan-name">premium</h3>
              <div className="plan-price font-roboto-flex">
                $9<span>/month</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>Weekly Assistance</li>
              <li>Order shift within 2-3 days</li>
              <li>Weekly report Generation</li>
              <li>Weekly Filter in Graph Generation</li>
            </ul>
            <button className="plan-btn">Get Started</button>
          </div>

          <div className="plan-card featured">
            <div className="plan-badge">Most Popular</div>
            <div className="plan-header">
              <h3 className="plan-name">Basic</h3>
              <div className="plan-price font-roboto-flex">
                $00<span>/month</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>Monthly Assistance</li>
              <li>Order shift within 3-5 days</li>
              <li>Monthly report Generation</li>
              <li>Monthly Filter in Graph Generation</li>
            </ul>
            <button className="plan-btn">Get Started</button>
          </div>

          <div className="plan-card">
            <div className="plan-header">
              <h3 className="plan-name">Elite</h3>
              <div className="plan-price font-roboto-flex">
                $79<span>/month</span>
              </div>
            </div>
            <ul className="plan-features">
              <li>24/7 Assistance</li>
              <li>Order shift within 1 Day</li>
              <li>Daily report generation</li>
              <li>Daily Filter in Graph</li>
            </ul>
            <button className="plan-btn">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
