import { PDFDocument, rgb, degrees } from 'pdf-lib';

export interface WatermarkOptions {
  name?: string;
  email: string;
  company?: string;
  timestamp?: string;
}

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
 * Watermarks a base64 encoded PDF with the provided user's full name, email, and audit timestamp.
 * Returns a safe Blob URL (blob:http://...) ready for both inline browser preview and direct downloading.
 */
export async function watermarkPdf(
  base64Data: string, 
  user: string | WatermarkOptions
): Promise<string> {
  try {
    // Normalize user parameters
    const userName = typeof user === 'string' 
      ? (user.includes('@') ? 'Authorized Recipient' : user) 
      : (user.name?.trim() || 'Authorized Recipient');
      
    const userEmail = typeof user === 'string' 
      ? (user.includes('@') ? user.trim() : 'authorized@compliance.audit') 
      : (user.email?.trim() || 'authorized@compliance.audit');

    const companyOrg = typeof user === 'object' && user.company ? user.company.trim() : '';
    const dateFormatted = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const timeFormatted = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

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

    // Prominent text templates
    const primaryDiagonal = `CONFIDENTIAL NDA • ${userName.toUpperCase()} (${userEmail.toUpperCase()})`;
    const secondaryDiagonal = `LICENSED FOR ${userEmail.toUpperCase()} ${companyOrg ? `• ${companyOrg.toUpperCase()}` : ''} • DO NOT DISTRIBUTE`;
    const headerBanner = `REACHGRC TRUST AUDIT • NDA PROTECTED DOCUMENT • RECIPIENT: ${userName} <${userEmail}>`;
    const footerBanner = `VERIFIED GRC AUDIT REPORT • ACCESS TIMESTAMP: ${dateFormatted} ${timeFormatted} • AUTHORIZED FOR: ${userName.toUpperCase()} (${userEmail.toLowerCase()})`;

    // Apply multiple security watermarks to each page
    for (const page of pages) {
      const { width, height } = page.getSize();
      
      // 1. Top Header Security Banner (Brand Orange)
      page.drawText(headerBanner, {
        x: 35,
        y: height - 25,
        size: 7,
        color: rgb(1.0, 0.35, 0.1), // brand-orange (#FF8A1C)
        opacity: 0.85,
      });

      // 2. Center Large Diagonal Watermark (Name + Email)
      page.drawText(primaryDiagonal, {
        x: Math.max(30, width / 2 - 220),
        y: height / 2 + 30,
        size: 11,
        color: rgb(0.9, 0.25, 0.15), // brand-red/orange
        opacity: 0.28,
        rotate: degrees(32),
      });

      // 3. Lower Secondary Diagonal Watermark
      page.drawText(secondaryDiagonal, {
        x: Math.max(20, width / 2 - 240),
        y: height / 2 - 80,
        size: 9.5,
        color: rgb(0.45, 0.45, 0.5),
        opacity: 0.22,
        rotate: degrees(32),
      });

      // 4. Upper Repeating Subtle Diagonal Watermark
      page.drawText(`VERIFIED AUDIT IDENTIFIER: RGC-${Math.abs(userName.length * 997 + userEmail.length * 31).toString(16).toUpperCase()} • ${userEmail.toUpperCase()}`, {
        x: Math.max(40, width / 2 - 200),
        y: height / 2 + 140,
        size: 8.5,
        color: rgb(0.5, 0.5, 0.55),
        opacity: 0.18,
        rotate: degrees(32),
      });

      // 5. Bottom Margin Footer Security Stamp (Brand Red)
      page.drawText(footerBanner, {
        x: 35,
        y: 20,
        size: 7,
        color: rgb(0.95, 0.22, 0.1), // brand-red (#FF3918)
        opacity: 0.9,
      });
    }

    // Save the PDF back to binary bytes
    const watermarkedBytes = await pdfDoc.save();
    
    // Convert directly to Blob and return Blob URL
    const blob = new Blob([watermarkedBytes] as BlobPart[], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Error watermarking PDF:", error);
    // Fallback to original Blob URL if watermarking fails
    return base64ToBlobUrl(base64Data);
  }
}
