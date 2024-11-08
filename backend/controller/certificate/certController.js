const express = require('express');
const QRCode = require('qrcode');
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3009;

// Mock data - In a real application, this data would likely come from a database
const students = [
  { id: 1, name: 'Alice', course: 'JavaScript for Beginners' },
  { id: 2, name: 'Bob', course: 'Advanced Node.js' },
  { id: 3, name: 'Charlie', course: 'Web Development with React' }
];

// Endpoint to generate and download a certificate
app.get('/generate-certificate/:studentId', async (req, res) => {
  const studentId = parseInt(req.params.studentId, 10);
  const student = students.find(s => s.id === studentId);

  if (!student) {
    return res.status(404).send('Student not found');
  }

  try {
    // Step 1: Generate QR Code (you can customize the QR content)
    const qrContent = `https://example.com/verify/${student.id}`; // This URL would be for validation
    const qrCode = await QRCode.toDataURL(qrContent);

    // Step 2: Generate PDF Certificate
    const doc = new PDFDocument();

    // Set up the response to send the PDF directly to the user
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${student.name}-certificate.pdf"`);
    
    doc.pipe(res); // Pipe the PDF output to the response stream

    // Add certificate content to the PDF
    doc.fontSize(20).text('Certificate of Completion', { align: 'center' });
    doc.moveDown(1);
    doc.fontSize(16).text(`This certifies that ${student.name}`, { align: 'center' });
    doc.moveDown(1);
    doc.fontSize(12).text(`Has completed the course: ${student.course}`, { align: 'center' });
    doc.moveDown(2);
    
    // Add QR Code
    doc.image(qrCode, 150, 250, { width: 100, height: 100 });

    doc.end(); // Finalize the PDF
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
