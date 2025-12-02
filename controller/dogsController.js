const express = require("express");
const router = express.Router();
const dogSchema = require("../schema/dogSchema");

// 임시 데이터
let dogs = [
	{ id: 1, name: "Buddy", breed: "Golden Retriever", age: 3 },
	{ id: 2, name: "Charlie", breed: "Labrador", age: 2 },
];

// 강아지 리스트 조회
router.get("/", (req, res) => {
	res.json(dogs);
});

// 강아지 추가
router.post("/", (req, res) => {
	const { error } = dogSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const { name, breed, age } = req.body;
	const newDog = { id: dogs.length + 1, name, breed, age };
	dogs.push(newDog);
	res.status(201).json(newDog);
});

// 강아지 삭제
router.delete("/:id", (req, res) => {
	const { id } = req.params;
	dogs = dogs.filter((dog) => dog.id !== parseInt(id));
	res.status(204).send();
});

// 강아지 수정
router.put("/:id", (req, res) => {
	const { error } = dogSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ message: error.details[0].message });
	}

	const { id } = req.params;
	const { name, breed, age } = req.body;
	const dog = dogs.find((dog) => dog.id === parseInt(id));
	if (dog) {
		dog.name = name;
		dog.breed = breed;
		dog.age = age;
		res.json(dog);
	} else {
		res.status(404).send("Dog not found");
	}
});

module.exports = router;
