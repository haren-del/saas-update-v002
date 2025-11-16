import { prisma } from './prisma';

export async function getOrCreateUsage(userId: string) {
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
  
  let usage = await prisma.usage.findUnique({
    where: { userId }
  });

  // If no usage record exists, create one
  if (!usage) {
    usage = await prisma.usage.create({
      data: {
        userId,
        invoicesCount: 0,
        quotationsCount: 0,
        currentMonth,
        lastResetDate: new Date()
      }
    });
  }

  // Check if we need to reset for new month
  if (usage.currentMonth !== currentMonth) {
    usage = await prisma.usage.update({
      where: { userId },
      data: {
        invoicesCount: 0,
        quotationsCount: 0,
        currentMonth,
        lastResetDate: new Date()
      }
    });
  }

  return usage;
}

export async function incrementInvoiceCount(userId: string) {
  const usage = await getOrCreateUsage(userId);
  
  return await prisma.usage.update({
    where: { userId },
    data: {
      invoicesCount: usage.invoicesCount + 1
    }
  });
}

export async function incrementQuotationCount(userId: string) {
  const usage = await getOrCreateUsage(userId);
  
  return await prisma.usage.update({
    where: { userId },
    data: {
      quotationsCount: usage.quotationsCount + 1
    }
  });
}

export async function getUserUsage(userId: string) {
  return await getOrCreateUsage(userId);
}

export async function canUserCreateInvoice(userId: string): Promise<{ allowed: boolean; message?: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return { allowed: false, message: 'User not found' };
  }

  const usage = await getOrCreateUsage(userId);
  const limits = require('./plans').getPlanLimits(user.plan);

  // Unlimited for paid plans
  if (limits.invoicesPerMonth === -1) {
    return { allowed: true };
  }

  // Check if under limit
  if (usage.invoicesCount < limits.invoicesPerMonth) {
    return { allowed: true };
  }

  return {
    allowed: false,
    message: `You've reached your limit of ${limits.invoicesPerMonth} invoices per month. Upgrade to create more!`
  };
}

export async function canUserCreateQuotation(userId: string): Promise<{ allowed: boolean; message?: string }> {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return { allowed: false, message: 'User not found' };
  }

  const usage = await getOrCreateUsage(userId);
  const limits = require('./plans').getPlanLimits(user.plan);

  // Unlimited for paid plans
  if (limits.quotationsPerMonth === -1) {
    return { allowed: true };
  }

  // Check if under limit
  if (usage.quotationsCount < limits.quotationsPerMonth) {
    return { allowed: true };
  }

  return {
    allowed: false,
    message: `You've reached your limit of ${limits.quotationsPerMonth} quotations per month. Upgrade to create more!`
  };
}