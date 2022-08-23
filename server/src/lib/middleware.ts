async function verifyLoginSession(req: any, res: any, next: any) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

async function verifyAdminSession(req: any, res: any, next: any) {
  if (req.user && req.user.permission >= 3) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

export { verifyLoginSession, verifyAdminSession };
