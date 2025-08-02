const Document = require('../models/Document');

exports.getAllDocuments = async (req, res) => {
    const docs = await Document.find({ userId: req.user.userId });
    res.json(docs);
};

exports.createDocument = async (req, res) => {
  const { title, category, expiryDate } = req.body;
  const fileUrl = req.file ? `/uploads/${req.file.filename}` : "";

  try {
    const doc = new Document({
      userId: req.user.userId,
      title,
      category,
      expiryDate,
      fileUrl,
    });

    await doc.save();
    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create document" });
  }
};

exports.updateDocument = async (req, res) => {
    const { id } = req.params;
    const doc = await Document.findOneAndUpdate(
        { _id: id, userId: req.user.userId },
        req.body,
        { new: true }
    );
    res.json(doc);
};
exports.deleteDocument = async (req, res) => {
    const { id } = req.params;
    await Document.findOneAndDelete({ _id: id, userId: req.user.userId });
    res.json({ message: "Document deleted successfully" });
};