export const requireRole = (requiredRole) => (req, res, next) => {
  if (!req.user || req.user.role !== requiredRole) {
    return res.status(403).json({ error: 'Forbidden: admin access required' });
  }

  return next();
};

export default requireRole;
