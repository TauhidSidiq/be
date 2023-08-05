const router = require("express").Router()
const cors = require("cors")

const auth = require("./auth")

router.use(cors())
router.use("/api/", auth)

module.exports = router
