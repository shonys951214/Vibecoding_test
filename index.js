const express = require("express");
const app = express();
const PORT = 3000;

const dogsRouter = require("./controller/dogsController");
const corsMiddleware = require("./middleware/corsMiddleware");

app.use(express.json());
app.use("/dogs", dogsRouter);
app.use(corsMiddleware);

// 기본 라우트
app.get("/", (req, res) => {
	res.send("바이브코딩 테스트.");
});

app.listen(PORT, () => {
	console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
