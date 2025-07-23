const Vault = require('../models/Vault');

// GET /api/vaults - Get all vaults for authenticated user
const getVaults = async (req, res) => {
  try {
    const vaults = await Vault.find({ userId: req.user.userId })
      .sort({ updatedAt: -1 })
      .select('title description notes summary updatedAt');

    res.json(vaults);
  } catch (error) {
    console.error('Get vaults error:', error);
    res.status(500).json({ message: 'Server error fetching vaults' });
  }
};

// GET /api/vaults/:id - Get specific vault
const getVaultById = async (req, res) => {
  try {
    const vault = await Vault.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId    // ← From auth middleware
    });

    if (!vault) {
      return res.status(404).json({ message: 'Vault not found' });
    }

    res.json(vault);
  } catch (error) {
    console.error('Get vault error:', error);
    res.status(500).json({ message: 'Server error fetching vault' });
  }
};

// POST /api/vaults - Create new vault
const createVault = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newVault = new Vault({
      title,
      description,
      userId: req.user.userId
    });

    await newVault.save();

    res.status(201).json({
      message: 'Vault created successfully',
      vault: {
        _id: newVault._id,
        title: newVault.title,
        description: newVault.description,
        notes: newVault.notes || "",
        summary: newVault.summary || "",
        updatedAt: newVault.updatedAt
      }
    });

  } catch (error) {
    console.error('Create vault error:', error);
    res.status(500).json({ message: 'Server error creating vault' });
  }
};

// PUT /api/vaults/:id - Update vault
const updateVault = async (req, res) => {
  const { notes, summary } = req.body;

  try {
    const vault = await Vault.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });

    if (!vault) {
      return res.status(404).json({ message: 'Vault not found' });
    }

    // Update fields if provided
    if (notes !== undefined) vault.notes = notes;
    if (summary !== undefined) vault.summary = summary;

    await vault.save();

    res.json({
      message: 'Vault updated successfully',
      vault: {
        _id: vault._id,
        title: vault.title,
        description: vault.description,
        notes: vault.notes,
        summary: vault.summary,
        updatedAt: vault.updatedAt
      }
    });

  } catch (error) {
    console.error('Update vault error:', error);
    res.status(500).json({ message: 'Server error updating vault' });
  }
};

// DELETE /api/vaults/:id - Delete vault
const deleteVault = async (req, res) => {
  try {
    const vault = await Vault.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });

    if (!vault) {
      return res.status(404).json({ message: 'Vault not found' });
    }

    res.json({ message: 'Vault deleted successfully' });

  } catch (error) {
    console.error('Delete vault error:', error);
    res.status(500).json({ message: 'Server error deleting vault' });
  }
};

// // POST /api/vaults/:id/generate-summary - Generate AI summary for vault notes
// const generateSummary = async (req, res) => {
//   try {
//     const vault = await Vault.findOne({ 
//       _id: req.params.id, 
//       userId: req.user.userId 
//     });

//     if (!vault) {
//       return res.status(404).json({ message: 'Vault not found' });
//     }

//     if (!vault.notes || vault.notes.trim().length === 0) {
//       return res.status(400).json({ message: 'No notes to summarize' });
//     }

//     // Simple summary generation (replace with actual AI service)
//     const generateMockSummary = (text) => {
//       const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
//       const wordCount = text.split(/\s+/).length;
      
//       return `Summary (${wordCount} words, ${sentences.length} sentences):

// Key Points:
// • This content covers ${sentences.length} main topics
// • Contains approximately ${wordCount} words
// • ${sentences.length > 3 ? 'Multiple ideas discussed' : 'Focused discussion'}

// Main themes identified from your notes. This is a simplified summary - in a real application, this would use AI to generate meaningful summaries.`;
//     };

//     const generatedSummary = generateMockSummary(vault.notes);
//     vault.summary = generatedSummary;
//     await vault.save();

//     res.json({
//       message: 'Summary generated successfully',
//       summary: generatedSummary
//     });

//   } catch (error) {
//     console.error('Generate summary error:', error);
//     res.status(500).json({ message: 'Server error generating summary' });
//   }
// };

module.exports = { getVaults, getVaultById, createVault, updateVault, deleteVault }; 