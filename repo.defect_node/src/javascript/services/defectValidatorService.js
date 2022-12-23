const { flattenDeep } = require("lodash");
const {
  findAllScript,
  getNextSequenceValue,
  insertManyScript,
  deleteManyScript,
} = require("./daoservice");

const saveDefectValidatorService = async (data) => {
  try {
    const test = data.map(async (item) => {
      const {
        description,
        summary,
        steps,
        results,
        testData,
        e2eId,
        caseId,
        coRelationId,
        transId, } =
        item;
      const id = await getNextSequenceValue("defect_validator_id");
      return {
        id,
        description,
        summary,
        steps,
        results,
        testData,
        e2eId,
        caseId,
        coRelationId,
        transId,
      };
    });
    const result = await Promise.all(test);
    await deleteManyScript('defect_validator', {})
    const finalData = await insertManyScript("defect_validator", flattenDeep(result));
    return finalData;
  } catch (error) {
    throw new Error(`Failed while saving details ${error}`);
  }
};

const getDefectValidatorService = async () => {
  try {
    const result = await findAllScript("defect_validator", {}, { _id: 0 });
    return result;
  } catch (error) {
    throw new Error(`Failed while getting details ${error}`);
  }
};

module.exports = {
  saveDefectValidatorService,
  getDefectValidatorService,
};
