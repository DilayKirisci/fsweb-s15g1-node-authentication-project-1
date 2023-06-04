const mw = require("../auth/auth-middleware");
const router = require("express").Router();
const userModel = require("./users-model");

router.get("/", mw.sinirli, async (req, res, next) => {
	try {
		const users = await userModel.bul();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
