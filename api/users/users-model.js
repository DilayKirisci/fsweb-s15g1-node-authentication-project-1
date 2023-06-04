const db = require("../../data/db-config");

function bul() {
	return db("users");
}

function goreBul(filtre) {
	return db("users").where(filtre); // dizi doner
	// ?????    filtrenin obje oldugunu nereden biliyoruz   ??????
}

async function idyeGoreBul(user_id) {
	return await db("users").where("user_id", user_id).first();
	// first yazdigimiz icin obje doner first yazmazsak eger array doner.
	//o zaman da => where("user_id", user_id)[0]
	// deconstrruct ilk eleman =>  const [blabla] = where("user_id", user_id)
}

async function ekle(user) {
	let user_id = await db("users").insert(user).first();
	return idyeGoreBul(user_id);
}

exports.module = {
	ekle,
	idyeGoreBul,
	goreBul,
	bul,
};
