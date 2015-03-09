if (req.session.user) {
  // 获取 user 并进行下一步
  next()
} else if (req.signedCookies['username']) {
  // 如果存在则从数据库中获取这个 username 的信息，并保存到 session 中
  getuser(function (err, user) {
    req.session.user = user;
    next();
  });
} else {
  // 当做为登陆用户处理
  next();
}
