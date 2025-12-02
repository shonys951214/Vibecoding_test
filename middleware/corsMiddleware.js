const cors = require("cors");

const corsMiddleware = cors({
	origin: "*", // 모든 도메인 허용 (필요에 따라 수정 가능)
	methods: ["GET", "POST", "PUT", "DELETE"],
});

module.exports = corsMiddleware;
