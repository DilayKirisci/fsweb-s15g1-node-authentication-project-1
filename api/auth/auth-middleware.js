const db = require("../../data/db-config");

const userModel = require("../users/users-model");

/*
  Kullanıcının sunucuda kayıtlı bir oturumu yoksa

  status: 401
  {
    "message": "Geçemezsiniz!"
  }
*/
function sinirli() {}

/*
  req.body de verilen username halihazırda veritabanında varsa

  status: 422
  {
    "message": "Username kullaniliyor"
  }
*/
async function usernameBostami(req, res, next) {
	try {
		const { username } = req.body;
		const isValid = userModel.goreBul({ username: username });
		if (isValid && isValid > 0) {
			res.status(422).json({ message: "Username kullaniliyor" });
		} else {
			next();
		}
	} catch (e) {}
}

/*
  req.body de verilen username veritabanında yoksa

  status: 401
  {
    "message": "Geçersiz kriter"
  }
*/
async function usernameVarmi(req, res, next) {
	try {
		const { username } = req.body;
		const isValid = await userModel.goreBul({ username: username });
		if (isValid && isValid.length > 0) {
			req.dbUser = isValid[0];
			next();
		} else {
			res.status(401).json({ message: "Geçersiz kriter" });
		}
	} catch (e) {
		next(e);
	}
}

/*
  req.body de şifre yoksa veya 3 karakterden azsa

  status: 422
  {
    "message": "Şifre 3 karakterden fazla olmalı"
  }
*/
function sifreGecerlimi(req, res, next) {
	try {
		const { password } = req.body;
		if (!password || password.length < 3) {
			res.status(422).json({ message: "Şifre 3 karakterden fazla olmalı" });
		} else {
			next();
		}
	} catch (e) {}
}

function checkPayload(req, res, next) {
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			res.status(400).json({ message: "alanlar bos olamaz" });
		} else {
			next();
		}
	} catch (e) {
		{
			next(e);
		}
	}
}

exports.module = {
	sifreGecerlimi,
	usernameVarmi,
	usernameBostami,
	checkPayload,
};
