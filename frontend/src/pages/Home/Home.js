import React from "react";
import IconChat from "../../assets/icon-chat.png";
import IconMoney from "../../assets/icon-money.png";
import IconSecurity from "../../assets/icon-security.png";
import HomeBanner from "../../components/HomeBanner/HomeBanner";
import HomeFeatures from "../../components/HomeFeatures/HomeFeatures";

function Home() {
  return (
    <div className="Home">
      <main>
        <HomeBanner />
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <HomeFeatures
            icon={IconChat}
            alt="Chat Icon"
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes."
          />
          <HomeFeatures
            icon={IconMoney}
            alticon="Money Icon"
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
          />
          <HomeFeatures
            icon={IconSecurity}
            alticon="Security Icon"
            title="Security you can trust"
            description="We use top of the line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
    </div>
  );
}

export default Home;
