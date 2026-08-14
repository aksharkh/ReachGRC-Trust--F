import { PDFDocument, rgb, degrees } from 'pdf-lib';

/**
 * Converts a base64 encoded PDF string directly to a safe browser Blob URL.
 */
export function base64ToBlobUrl(base64Data: string, contentType: string = 'application/pdf'): string {
  try {
    const base64Clean = base64Data.replace(/^data:.*?;base64,/, '').replace(/\s/g, '');
    const binaryString = atob(base64Clean);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: contentType });
    return URL.createObjectURL(blob);
  } catch (err) {
    console.error("Error creating Blob URL:", err);
    return base64Data;
  }
}

/**
 * Watermarks a base64 encoded PDF with the provided email address client-side.
 * Returns a safe Blob URL (blob:http://...).
 */
export async function watermarkPdf(base64Data: string, email: string): Promise<string> {
  try {
    // Strip standard base64 data url prefix if present
    const base64Clean = base64Data.replace(/^data:application\/pdf;base64,/, '').replace(/\s/g, '');
    
    // Convert base64 to binary byte array
    const binaryString = atob(base64Clean);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Load the PDF document
    const pdfDoc = await PDFDocument.load(bytes);
    const pages = pdfDoc.getPages();
    const watermarkText = `VERIFIED AUDIT DATA • NDA CONFIDENTIAL • VIEWED BY ${email.toUpperCase()} • DATE: ${new Date().toLocaleDateString()}`;

    // Apply watermark to each page
    for (const page of pages) {
      const { width, height } = page.getSize();
      
      // Draw bottom-margin footer watermark in brand red
      page.drawText(watermarkText, {
        x: 40,
        y: 30,
        size: 7.5,
        color: rgb(1.0, 0.22, 0.09), // brand-red (#FF3918)
        opacity: 0.85,
      });

      // Draw light diagonal watermark in the center of the page
      page.drawText(`VERIFIED AUDIT FILE - REGISTERED TO: ${email.toUpperCase()}`, {
        x: width / 2 - 200,
        y: height / 2 - 50,
        size: 11,
        color: rgb(0.5, 0.5, 0.5),
        opacity: 0.15,
        rotate: degrees(30),
      });
    }

    // Save the PDF back to binary bytes
    const watermarkedBytes = await pdfDoc.save();
    
    // Convert directly to Blob and return Blob URL to prevent Chrome navigation/download blocks
    const blob = new Blob([watermarkedBytes] as BlobPart[], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error watermarking PDF:", error);
    // Fallback to original Blob URL if watermarking fails
    return base64ToBlobUrl(base64Data);
  }
}
