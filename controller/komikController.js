const db = require("../models");
const KomikService = require("../service/komikService");

async function createKomik(req, res) {
  try {
    const komikData = req.body; // PERBAIKAN: sebelumnya typo omikData

    if (req.file) {
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer;
    }

    const result = await KomikService.createKomik(db, komikData);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function getAllKomik(req, res) {
  try {
    const result = await KomikService.getAllKomik(db);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function getKomikById(req, res) {
  try {
    const { id } = req.params;
    const result = await KomikService.getKomikById(db, id);

    if (!result) {
      return res.status(404).json({ success: false, error: "Komik not found" });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function updateKomik(req, res) {
  try {
    const komikData = req.body;

    if (req.file) {
      komikData.imageType = req.file.mimetype;
      komikData.imageName = req.file.originalname;
      komikData.imageData = req.file.buffer;
    }

    const result = await KomikService.updateKomik(db, req.params.id, komikData);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

async function deleteKomik(req, res) {
  try {
    const result = await KomikService.deleteKomik(db, req.params.id);
    res.json({ success: true, message: result.message });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = {
  createKomik,
  getAllKomik,
  getKomikById,
  updateKomik,
  deleteKomik,
};
