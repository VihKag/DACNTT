const bcrypt = require("bcryptjs");
const mongoose = require('mongoose');
const User = require("../models/User");
const Book = require("../models/Book");
const document = require("mongoose/lib/document");

exports.landing_page = (req, res, next) => {
  
  Book.find({}).limit(6)
    .then(books => res.render("landing", {
      books: books,
      title: 'Trang chủ',
    }))
    .catch(next);
};

exports.login_get = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("login", { err: error, title: 'Đăng nhập' });
};

exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    req.session.error = "Invalid Credentials";
    return res.redirect("/login",{title: 'Đăng nhập'});
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    req.session.error = "Invalid Credentials";
    return res.redirect("/login", {title: 'Đăng nhập'});
  }

  req.session.isAuth = true;
  req.session.username = user.username;
  res.redirect("/dashboard");
};

exports.register_get = (req, res) => {
  const error = req.session.error;
  delete req.session.error;
  res.render("register", { err: error, title: 'Đăng kí'});
};

exports.register_post = async (req, res) => {
  const { username, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    req.session.error = "User already exists";
    return res.redirect("/register");
  }

  const hasdPsw = await bcrypt.hash(password, 12);

  user = new User({
    username,
    email,
    password: hasdPsw,
  });

  await user.save();
  res.redirect("/login");
};

exports.dashboard_get = (req, res, next) => {
  const username = req.session.username;
  Book.find({}).limit(6)
    .then(books => res.render("dashboard", {
      name: username,
      books: books,
      title: 'User',
    }))
    .catch(next);
};

exports.logout_post = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/login",{title: 'Đăng nhập'});
  });
};

//collections
exports.collections_get = (req, res, next) => {
  Book.find({})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm"
    }))
    .catch(next);
};
exports.collections_getKG = (req, res, next) => {
  Book.find({theloai: 'Khoa giáo'})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm | Khoa giáo"
    }))
    .catch(next);
};
exports.collections_getVH = (req, res, next) => {
  Book.find({theloai: 'Văn học'})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm | Văn học"
    }))
    .catch(next);
};
exports.collections_getTT = (req, res, next) => {
  Book.find({theloai: 'Truyện tranh'})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm | Truyện tranh"
    }))
    .catch(next);
};
exports.collections_getKT = (req, res, next) => {
  Book.find({theloai: 'Kinh tế'})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm | Kinh tế"
    }))
    .catch(next);
};
exports.collections_getkd = (req, res, next) => {
  Book.find({nxb: 'NXB Kim Đồng'})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm | nxbKD"
    }))
    .catch(next);
};
exports.collections_gettr = (req, res, next) => {
  Book.find({nxb: 'NXB Trẻ'})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm | nxbTr"
    }))
    .catch(next);
};
exports.collections_gethn = (req, res, next) => {
  Book.find({nxb: 'NXB Hà Nội'})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm | nxbHN"
    }))
    .catch(next);
};
exports.collections_gettn = (req, res, next) => {
  Book.find({nxb: 'NXB Thanh Niên'})
    .then(books => res.render("collections", {
      books: books,
      title: "Danh mục sản phẩm | nxbTN"
    }))
    .catch(next);
};


//product
exports.product_get = async (req, res, next) => {
  await Book.find({}).limit(1)
    .then((books) => {
      res.render("product", {
        books: books,
        title: 'Sản phẩm',
      });
    })
    .catch(err => {
      console.log(err);
    });
};


//cart
exports.cart_get = (req, res) => {
  res.render("cart", { title: "Giỏ hàng" });
};

//order
exports.order_get = (req, res) => {
  res.render("order", { title: "Đơn hàng" });
};
exports.order_post = async (req, res) => {
  const { username, email, payment } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    req.session.error = "User already exists";
    return res.redirect("/register");
  }

  const hasdPsw = await bcrypt.hash(password, 12);

  user = new User({
    username,
    email,
    password: hasdPsw,
  });

  await user.save();
  res.redirect("/login");
};
