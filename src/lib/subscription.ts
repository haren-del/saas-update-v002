import { prisma } from './prisma';

export async function checkSubscription(userId: string) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (!subscription) {
      return { hasAccess: false, plan: 'free' };
    }

    const isActive = subscription.status === 'active';
    
    return {
      hasAccess: isActive,
      plan: subscription.name,
      status: subscription.status,
    };
  } catch (error) {
    return { hasAccess: false, plan: 'free' };
  }
}

export async function getInvoiceLimit(plan: string) {
  const limits: { [key: string]: number } = {
    free: 3,
    starter: 10,
    professional: -1, // unlimited
    enterprise: -1,
  };

  return limits[plan.toLowerCase()] || 0;
}