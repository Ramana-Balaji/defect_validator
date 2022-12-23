const express = require("express");
const router = express.Router();
const {
  saveDefectValidatorSheet,
  fetchDefectValidatorSheet,
} = require("../controller/defectValidatorController");

router.post("/defect-validator", saveDefectValidatorSheet);
router.get("/defect-validator", fetchDefectValidatorSheet);

module.exports = router;
