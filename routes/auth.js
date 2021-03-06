import express from 'express';
const router = express.Router();

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import {secret} from '../config/db';
import {use_jti as USE_JTI, jtiers_list} from '../config/auth';
import {_EUNEXP, _SUCC, _FAIL, _generate_jti, asyncWrap} from '../util';

import {jwtValidate} from '../middleware/jwt';

import User from '../models/user';

router.post('/login', asyncWrap(async (req, res, next) => {
  let found = await User.findOne({name: req.body.username})
  if (found) {
    let isMatch = await bcrypt.compare(req.body.password, found.password)
    if (isMatch) {
      let token_data = {
        authorization: found.position,
        username: found.username,
        id: found._id,
        login_time: new Date().toJSON()
      }
      if (USE_JTI && jtiers_list.includes(found.position)) {
        found._jti = _generate_jti();
        found.save();
        token_data['jti'] = found._jti;
      }
      let token = jwt.sign(token_data, secret, {
        algorithm: 'HS512',
        expiresIn: '12h'
      });
      return _SUCC(res, {
        token: token,
        username: found.name
      });
    } else {
      return _FAIL(res, 'WRONG_PWD');
    }
  } else {
    return _FAIL(res, 'U_NF');
  }
}));

router.get('/chk', jwtValidate('utype', ['admin', 'staff']), (req, res, next) => {
  return _SUCC(res, {
    name: req.user.name,
    position: req.user.position
  });
});

module.exports = router;
