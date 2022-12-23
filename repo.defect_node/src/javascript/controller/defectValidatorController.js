const {
  saveDefectValidatorService,
  getDefectValidatorService,
} = require("../services/defectValidatorService");

const saveDefectValidatorSheet = async (req, res) => {
  try {
    const data = await saveDefectValidatorService(req.body);
    res.status(200).json({ flag: "success", data });
  } catch (error) {
    res.status(500).json({ flag: "error", error: error.message });
  }
};

const fetchDefectValidatorSheet = async (req, res) => {
  try {
    const data = await getDefectValidatorService();
    res.status(200).json({ flag: "success", data });
  } catch (error) {
    res.status(500).json({ flag: "error", error: error.message });
  }
};

module.exports = {
  saveDefectValidatorSheet,
  fetchDefectValidatorSheet,
};