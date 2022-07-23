const jwt = require("jsonwebtoken");

exports.createToken = (user) => {
	const payload = {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		isAdmin: user.isAdmin,
	};
	return jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "1y",
		algorithm: "HS512",
	});
};

exports.verifyToken = (token) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return {
			id: decoded.id,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
			isAdmin: decoded.isAdmin,
		};
	} catch (error) {
		return null;
	}
};
