"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _multer = _interopRequireDefault(require("multer"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = _multer.default.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },

  filename(req, file, cb) {
    cb(null, file.originalname);
  }

});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('You can upload only image files!'), false);
  }

  cb(null, true);
};

const upload = (0, _multer.default)({
  storage,
  fileFilter: imageFileFilter
});

const uploadRouter = _express.default.Router();

uploadRouter.post('/', _utils.isAuth, _utils.isAdmin, upload.single('image'), (req, res) => {
  res.status(201).send({
    image: `/${req.file.path}`
  });
});
var _default = uploadRouter;
exports.default = _default;