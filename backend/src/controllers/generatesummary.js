const Vault = require('../models/Vault');
const OpenAI = require("openai");

// POST /api/vaults/:id/generate-summary - Generate AI summary for vault notes
const generateSummary = async (req, res) => {
  try {
    const vault = await Vault.findOne({ 
      _id: req.params.id, 
      userId: req.user.userId 
    });

    if (!vault) {
      return res.status(404).json({ message: 'Vault not found' });
    }

    if (!vault.notes || vault.notes.trim().length === 0) {
      return res.status(400).json({ message: 'No notes to summarize' });
    }

    const generateMockSummary = async (text) => {
        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        const prompt = "Generate a summary of the text provided by the user. The summary should include all the main points added by the user." +  
        "If in case the you feel that the summary can include some more details please add that too" + text;

        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system", 
                    content: "You are a helpful assistant that extracts the summary of the text provided by the user."
                },
                {
                    role: "user", 
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        });

        return response.choices[0].message.content;
    };

    const generatedSummary = await generateMockSummary(vault.notes);
    vault.summary = generatedSummary;
    await vault.save();

    res.json({
      message: 'Summary generated successfully',
      summary: generatedSummary
    });

  } catch (error) {
    console.error('Generate summary error:', error);
    res.status(500).json({ message: 'Server error generating summary' });
  }
};

module.exports = { generateSummary }; 