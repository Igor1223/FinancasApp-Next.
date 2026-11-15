export const isValidDateOnly = value => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
};

export const todayISO = () => {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
};

export const parseAmount = value => {
  if (typeof value === 'number') return Number.isFinite(value) ? value : NaN;
  let normalized = String(value ?? '').trim().replace(/R\$/gi, '').replace(/\s/g, '');
  if (!normalized) return NaN;
  const comma = normalized.lastIndexOf(',');
  const dot = normalized.lastIndexOf('.');
  if (comma !== -1 && dot !== -1) {
    normalized = comma > dot
      ? normalized.replace(/\./g, '').replace(',', '.')
      : normalized.replace(/,/g, '');
  } else if (comma !== -1) {
    normalized = normalized.replace(',', '.');
  }
  const amount = Number(normalized);
  return Number.isFinite(amount) ? amount : NaN;
};

export const monthKey = value => {
  if (value instanceof Date && Number.isFinite(value.getTime())) {
    return value.getFullYear() + '-' + String(value.getMonth() + 1).padStart(2, '0');
  }
  return isValidDateOnly(value) ? value.slice(0, 7) : '';
};

export const normalizeStoredData = (raw, fallback) => {
  const source = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {};
  const transactions = Array.isArray(source.transactions) ? source.transactions.filter(item =>
    item && typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.description === 'string' &&
    Number.isFinite(item.amount) && item.amount > 0 &&
    (item.type === 'income' || item.type === 'expense') &&
    typeof item.category === 'string' &&
    isValidDateOnly(item.date)
  ) : [];
  const goals = Array.isArray(source.goals) ? source.goals.filter(item =>
    item && typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    Number.isFinite(item.target) && item.target > 0 &&
    Number.isFinite(item.saved) && item.saved >= 0
  ) : [];
  const budgets = {};
  if (source.budgets && typeof source.budgets === 'object' && !Array.isArray(source.budgets)) {
    Object.entries(source.budgets).forEach(([category, limit]) => {
      if (Number.isFinite(limit) && limit > 0) budgets[category] = limit;
    });
  }
  const profile = source.profile && typeof source.profile === 'object' ? source.profile : {};
  return {
    ...fallback,
    transactions,
    goals,
    budgets,
    profile: {
      name: typeof profile.name === 'string' ? profile.name : fallback.profile.name,
      email: typeof profile.email === 'string' ? profile.email : ''
    },
    dark: typeof source.dark === 'boolean' ? source.dark : fallback.dark
  };
};
