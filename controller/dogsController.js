const express = require("express");
const router = express.Router();
const dogSchema = require("../schema/dogSchema");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 강아지 리스트 조회
router.get("/", async (req, res) => {
	try {
		const dogs = await prisma.dogs.findMany();
		res.json(dogs);
	} catch (error) {
		res.status(500).json({ message: "강아지 리스트를 가져오는 중 오류가 발생했습니다.", error });
	}
});

// 강아지 추가
router.post("/", async (req, res) => {
	const { error } = dogSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const { name, breed, age } = req.body;
	try {
		const newDog = await prisma.dogs.create({
			data: { name, breed, age },
		});
		res.status(201).json({ message: "강아지가 등록되었습니다.", data: newDog });
	} catch (error) {
		res.status(500).json({ message: "강아지를 추가하는 중 오류가 발생했습니다.", error });
	}
});

// 강아지 삭제
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await prisma.dogs.delete({ where: { id: parseInt(id) } });
		res.status(204).send();
	} catch (error) {
		res.status(500).json({ message: "강아지를 삭제하는 중 오류가 발생했습니다.", error });
	}
});

// 강아지 수정
router.put("/:id", async (req, res) => {
	const { error } = dogSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const { id } = req.params;
	const { name, breed, age } = req.body;
	try {
		const updatedDog = await prisma.dogs.update({
			where: { id: parseInt(id) },
			data: { name, breed, age },
		});
		res.json(updatedDog);
	} catch (error) {
		res.status(500).json({ message: "목록을 수정하는 중 오류가 발생했습니다.", error });
	}
});

module.exports = router;
