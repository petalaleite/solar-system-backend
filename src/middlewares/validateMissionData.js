const validateMissionData = (req, res, next) => {
  const requiredProperties = ['name', 'year', 'country', 'destination'];

  if (requiredProperties.every((property) => property in req.body)) {
    next();
  } else {
    res.status(400).send({ 
      message: 'The mission need to receive the atributes: name, year, country and destinantion' });
  }
};

module.exports = validateMissionData;