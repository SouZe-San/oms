import "./style.css";

const PriceSection = () => {
  return (
    <section className="under-section membership-section home-section" id="price">
      <div className="container">
        <h2 className="section-title">Membership Plans</h2>
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
              <li>Access You Know ? I No</li>
              <li>Basic You Know ? I No</li>
              <li> You Know ? I No</li>
              <li> You Know ? I No</li>
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
              <li>Unlimited Product view</li>
              <li>All Features (Dream On)</li>
              <li>Unlimited Adding in Cart</li>
              <li> 10 Product add</li>
              <li>Baki Janina</li>
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
              <li>24/7 Help access</li>
              <li>Advanced Notification</li>
              <li>Unlimited Product Add</li>
              <li>4 mile Dekhte pabo</li>
              <li>Unlimited Quantity &_&</li>
            </ul>
            <button className="plan-btn">Get Started</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection;
