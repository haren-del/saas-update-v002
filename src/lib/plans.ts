export interface PlanLimits {
  name: string;
  price: string;
  invoicesPerMonth: number;
  quotationsPerMonth: number;
  templates: number;
  hasWatermark: boolean;
  features: string[];
}

export const PLANS: { [key: string]: PlanLimits } = {
  free: {
    name: 'Free',
    price: '$0',
    invoicesPerMonth: 3,
    quotationsPerMonth: 2,
    templates: 1,
    hasWatermark: true,
    features: [
      '3 invoices per month',
      '2 quotations per month',
      '1 basic template',
      'PDF with watermark',
      'Email support'
    ]
  },
  starter: {
    name: 'Starter',
    price: '$9',
    invoicesPerMonth: 10,
    quotationsPerMonth: 5,
    templates: 3,
    hasWatermark: false,
    features: [
      '10 invoices per month',
      '5 quotations per month',
      '3 templates',
      'No watermark',
      'Email sending',
      'Priority support'
    ]
  },
  professional: {
    name: 'Professional',
    price: '$29',
    invoicesPerMonth: -1, // -1 = unlimited
    quotationsPerMonth: -1,
    templates: -1,
    hasWatermark: false,
    features: [
      'Unlimited invoices',
      'Unlimited quotations',
      'All templates',
      'No watermark',
      'Email sending',
      'Priority support',
      'Custom branding',
      'Analytics dashboard'
    ]
  },
  enterprise: {
    name: 'Enterprise',
    price: '$99',
    invoicesPerMonth: -1,
    quotationsPerMonth: -1,
    templates: -1,
    hasWatermark: false,
    features: [
      'Everything in Professional',
      'Team members',
      'API access',
      'Custom integrations',
      'Dedicated support',
      'White-label solution'
    ]
  }
};

export function getPlanLimits(planName: string): PlanLimits {
  return PLANS[planName] || PLANS.free;
}

export function canCreateInvoice(plan: string, currentCount: number): boolean {
  const limits = getPlanLimits(plan);
  if (limits.invoicesPerMonth === -1) return true; // unlimited
  return currentCount < limits.invoicesPerMonth;
}

export function canCreateQuotation(plan: string, currentCount: number): boolean {
  const limits = getPlanLimits(plan);
  if (limits.quotationsPerMonth === -1) return true; // unlimited
  return currentCount < limits.quotationsPerMonth;
}