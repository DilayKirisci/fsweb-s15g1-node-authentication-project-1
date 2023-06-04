// `checkUsernameFree`, `checkUsernameExists` ve `checkPasswordLength` gereklidir (require)
// `auth-middleware.js` deki middleware fonksiyonları. Bunlara burda ihtiyacınız var!

const {
	sifreGecerlimi,
	usernameVarmi,
	usernameBostami,
	checkPayload,
} = require("auth-middleware");
const credentials = req.body;
const hash = bcrypt.hashSync(credentials.password, 14);
credentials.password = hash;
const router = require("express").Router();
const bcrypt = require("bcryptjs");

router.post("/register", usernameBostami, sifreGecerlimi, (req, res, next) => {
	try {
		const { username, password } = credentials;
		const hash = bcrypt.hashSync(password, 14);
		password = hash;

		if (!usernameBostami) {
			res.send(422).json({ message: "Username kullaniliyor" });
		} else if (!passwordBostami) {
			res.send(422).json({ message: "Şifre 3 karakterden fazla olmalı" });
		} else {
			res.send(201).json({ username: username });
		}
	} catch (err) {
		next(err);
	}
});

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status: 200
  {
    "message": "Hoşgeldin sue!"
  }

  response geçersiz kriter:
  status: 401
  {
    "message": "Geçersiz kriter!"
  }
 */

/**
  3 [GET] /api/auth/logout

  response giriş yapmış kullanıcılar için:
  status: 200
  {
    "message": "Çıkış yapildi"
  }

  response giriş yapmamış kullanıcılar için:
  status: 200
  {
    "message": "Oturum bulunamadı!"
  }
 */

// Diğer modüllerde kullanılabilmesi için routerı "exports" nesnesine eklemeyi unutmayın.
