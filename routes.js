const express = require("express")
const Post = require("./models/Post") // new
const router = express.Router()

// Get all posts
router.post("/posts", async (req, res) => {
	console.log("REQ::", req.body)
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	})
	await post.save()
	res.send(post)
})

router.get("/posts/:id", async (req, res) => {
	try {
		const post = await Post.findOne({ _id: req.params.id })
		res.send(post)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.patch("/posts", async (req, res) => {
	try {
		const post = await Post.findOne({ title: req.body.title })
		console.log("MASUKK::", post)
		if (req.body.title) {
			post.title = req.body.title
		}

		if (req.body.content) {
			post.content = req.body.content
		}

		await post.save()
		res.send(post)
	} catch (error) {
		console.log("err::", error)
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.delete("/posts/:id", async (req, res) => {
	try {
		await Post.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

module.exports = router