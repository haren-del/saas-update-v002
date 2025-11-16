'use client';

import { Check, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PricingPage() {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  const fetchCurrentPlan = async () => {
    try {
      const response = await fetch('/api/user/plan');
      const data = await response.json();
      setCurrentPlan(data.plan || 'free');
    } catch (error) {
      console.error('Error fetching plan:', error);
    } finally {
      setLoading(false);
    }
  };

  const allPlans = [
    {
      id: 'free',
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Perfect for trying out",
      features: [
        "3 invoices per month",
        "2 quotations per month",
        "1 basic template",
        "PDF with watermark",
        "Email support"
      ],
      cta: "Current Plan",
      buttonStyle: 'disabled'
    },
    {
      id: 'starter',
      name: "Starter",
      price: "$9",
      period: "/month",
      description: "Great for freelancers",
      features: [
        "10 invoices per month",
        "5 quotations per month",
        "3 templates",
        "No watermark",
        "Email sending",
        "Priority support"
      ],
      cta: "Upgrade to Starter",
      buttonStyle: 'secondary'
    },
    {
      id: 'professional',
      name: "Professional",
      price: "$29",
      period: "/month",
      description: "Best for growing businesses",
      features: [
        "Unlimited invoices",
        "Unlimited quotations",
        "All templates",
        "No watermark",
        "Email sending",
        "Priority support",
        "Custom branding",
        "Analytics dashboard"
      ],
      cta: "Upgrade to Professional",
      popular: true,
      buttonStyle: 'primary'
    },
    {
      id: 'enterprise',
      name: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large teams",
      features: [
        "Everything in Professional",
        "Multiple team members",
        "API access",
        "Custom integrations",
        "Dedicated support",
        "White-label solution"
      ],
      cta: "Contact Sales",
      buttonStyle: 'secondary'
    }
  ];

  const handleSubscribe = (planId: string) => {
    if (planId === currentPlan) {
      alert('This is your current plan!');
      return;
    }

    if (planId === 'free') {
      alert('You cannot downgrade to Free plan. Please contact support.');
      return;
    }
    
    if (planId === 'enterprise') {
      window.location.href = '/#contact';
      return;
    }

    alert(`Payment integration coming soon! Selected: ${planId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-[#464646]">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#464646]">Choose Your Plan</h1>
        <p className="text-[#bebebf] mt-2 text-lg">Upgrade to unlock more features</p>
        <div className="mt-4 inline-block bg-[#fae29b] px-4 py-2 rounded-full">
          <p className="text-sm text-[#464646]">
            Current Plan: <span className="font-bold capitalize">{currentPlan}</span>
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {allPlans.map((plan) => {
          const isCurrentPlan = plan.id === currentPlan;
          
          return (
            <div 
              key={plan.id} 
              className={`bg-white rounded-xl shadow-lg p-6 relative transition-all hover:shadow-xl ${
                plan.popular 
                  ? 'border-2 border-[#fcc425] lg:scale-105' 
                  : isCurrentPlan
                  ? 'border-2 border-[#fae29b]'
                  : 'border border-[#e9eaea]'
              }`}
            >
              {/* Badges */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#fcc425] text-[#464646] px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                    <Star className="w-3 h-3 fill-current" />
                    <span>MOST POPULAR</span>
                  </div>
                </div>
              )}

              {isCurrentPlan && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#fae29b] text-[#464646] px-3 py-1 rounded-full text-xs font-bold">
                    YOUR PLAN
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="text-center mb-6 mt-2">
                <h3 className="text-2xl font-bold text-[#464646]">{plan.name}</h3>
                <p className="text-xs text-[#bebebf] mt-1">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-[#464646]">{plan.price}</span>
                  <span className="text-[#bebebf]">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <Check className="w-4 h-4 text-[#fcc425] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-[#464646]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button 
                onClick={() => handleSubscribe(plan.id)}
                disabled={isCurrentPlan}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  isCurrentPlan
                    ? 'bg-[#e9eaea] text-[#bebebf] cursor-not-allowed'
                    : plan.buttonStyle === 'primary'
                    ? 'bg-[#fcc425] text-[#464646] hover:bg-[#fae29b]'
                    : 'bg-[#e9eaea] text-[#464646] hover:bg-[#bebebf]'
                }`}
              >
                {isCurrentPlan ? 'Current Plan' : plan.cta}
              </button>
            </div>
          );
        })}
      </div>

      {/* Comparison Table */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#464646] text-center mb-8">
          Compare Plans
        </h2>
        
        <div className="bg-white rounded-xl shadow-sm border border-[#e9eaea] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#fcfcfc]">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-[#464646]">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#464646]">Free</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#464646]">Starter</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#fcc425]">Professional</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-[#464646]">Enterprise</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e9eaea]">
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-6 py-4 text-sm font-medium text-[#464646]">Invoices/month</td>
                  <td className="px-6 py-4 text-center text-sm text-[#464646]">3</td>
                  <td className="px-6 py-4 text-center text-sm text-[#464646]">10</td>
                  <td className="px-6 py-4 text-center text-sm text-[#fcc425] font-bold">Unlimited</td>
                  <td className="px-6 py-4 text-center text-sm text-[#fcc425] font-bold">Unlimited</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-6 py-4 text-sm font-medium text-[#464646]">Quotations/month</td>
                  <td className="px-6 py-4 text-center text-sm text-[#464646]">2</td>
                  <td className="px-6 py-4 text-center text-sm text-[#464646]">5</td>
                  <td className="px-6 py-4 text-center text-sm text-[#fcc425] font-bold">Unlimited</td>
                  <td className="px-6 py-4 text-center text-sm text-[#fcc425] font-bold">Unlimited</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-6 py-4 text-sm font-medium text-[#464646]">Templates</td>
                  <td className="px-6 py-4 text-center text-sm text-[#464646]">1 Basic</td>
                  <td className="px-6 py-4 text-center text-sm text-[#464646]">3 Templates</td>
                  <td className="px-6 py-4 text-center text-sm text-[#464646]">All Templates</td>
                  <td className="px-6 py-4 text-center text-sm text-[#464646]">All + Custom</td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-6 py-4 text-sm font-medium text-[#464646]">PDF Watermark</td>
                  <td className="px-6 py-4 text-center text-sm text-red-600 font-semibold">Yes</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-6 py-4 text-sm font-medium text-[#464646]">Priority Support</td>
                  <td className="px-6 py-4 text-center text-[#bebebf]">-</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-6 py-4 text-sm font-medium text-[#464646]">Custom Branding</td>
                  <td className="px-6 py-4 text-center text-[#bebebf]">-</td>
                  <td className="px-6 py-4 text-center text-[#bebebf]">-</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                </tr>
                <tr className="hover:bg-[#fcfcfc]">
                  <td className="px-6 py-4 text-sm font-medium text-[#464646]">API Access</td>
                  <td className="px-6 py-4 text-center text-[#bebebf]">-</td>
                  <td className="px-6 py-4 text-center text-[#bebebf]">-</td>
                  <td className="px-6 py-4 text-center text-[#bebebf]">-</td>
                  <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-[#fcc425] mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}