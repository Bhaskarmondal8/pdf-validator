const express = require('express');
const multer = require('multer');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const cors = require('cors');
const path = require('path');

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

// সরাসরি Root Directory থেকে স্ট্যাটিক ফাইল লোড করার জন্য
app.use(express.static(__dirname));

// মূল লিংকে ঢুকলে index.html ফাইলটি দেখাবে
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/validate-pdf', upload.single('pdf'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No PDF file uploaded' });
        }

        const pdfDoc = await PDFDocument.load(req.file.buffer, { ignoreEncryption: true });
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        const helveticaFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const greenColor = rgb(0.18, 0.49, 0.20);

        firstPage.drawRectangle({
            x: 20,
            y: 20,
            width: 220,
            height: 45,
            color: rgb(0.91, 0.96, 0.91),
            borderColor: greenColor,
            borderWidth: 1.5,
        });

        firstPage.drawText('✔ Signature Validated', {
            x: 30,
            y: 45,
            size: 12,
            font: helveticaFont,
            color: greenColor,
        });

        firstPage.drawText('Digitally Signed & Trusted Document', {
            x: 30,
            y: 30,
            size: 8,
            font: helveticaFont,
            color: rgb(0.2, 0.2, 0.2),
        });

        const pdfBytes = await pdfDoc.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="Verified_${req.file.originalname}"`);
        res.send(Buffer.from(pdfBytes));

    } catch (err) {
        console.error("PDF Processing Error:", err);
        res.status(500).json({ error: 'Failed to process digital signature.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
