const chatModel = require("../Models/chatModel");

const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
