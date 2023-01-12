const validateMissionId = (req, res, next) => {
  const { id } = req.params;
  const idAsNumber = Number(id);
  if (Number.isNaN(idAsNumber)) {
    res.status(400).send({ message: 'Invalid ID! Need to be a number' });
  } else {
    next();
  }
};

module.exports = validateMissionId;