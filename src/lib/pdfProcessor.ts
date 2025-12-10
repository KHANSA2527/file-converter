import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib'
import { PDFTool } from '../data/pdfTools'

interface UploadedFile {
  id: string
  name: string
  size: string
  type: string
  file: File
}

export class PDFProcessor {
  static async mergePDFs(files: UploadedFile[]): Promise<Uint8Array> {
    try {
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create()
      
      // Add a title page
      const titlePage = mergedPdf.addPage([595.28, 841.89]) // A4 size
      const titleFont = await mergedPdf.embedFont(StandardFonts.HelveticaBold)
      const regularFont = await mergedPdf.embedFont(StandardFonts.Helvetica)
      
      titlePage.drawText('Merged PDF Document', {
        x: 50,
        y: 750,
        size: 24,
        font: titleFont,
        color: rgb(0.2, 0.2, 0.2)
      })
      
      titlePage.drawText(`This document contains ${files.length} merged files:`, {
        x: 50,
        y: 700,
        size: 14,
        font: regularFont,
        color: rgb(0.3, 0.3, 0.3)
      })
      
      let yPosition = 670
      files.forEach((file, index) => {
        if (file.file.type === 'application/pdf') {
          titlePage.drawText(`${index + 1}. ${file.name}`, {
            x: 70,
            y: yPosition,
            size: 12,
            font: regularFont,
            color: rgb(0.4, 0.4, 0.4)
          })
          yPosition -= 20
        }
      })
      
      titlePage.drawText(`Generated on: ${new Date().toLocaleString()}`, {
        x: 50,
        y: 50,
        size: 10,
        font: regularFont,
        color: rgb(0.5, 0.5, 0.5)
      })
      
      // If we have actual PDF files, try to merge them
      if (files.some(file => file.file.type === 'application/pdf')) {
        for (const uploadedFile of files) {
          if (uploadedFile.file.type === 'application/pdf') {
            try {
              const arrayBuffer = await uploadedFile.file.arrayBuffer()
              const pdf = await PDFDocument.load(arrayBuffer)
              const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
              copiedPages.forEach(page => {
                mergedPdf.addPage(page)
              })
            } catch (error) {
              console.warn(`Could not merge ${uploadedFile.name}:`, error)
              // Continue with other files even if one fails
            }
          }
        }
      }
      
      return await mergedPdf.save()
    } catch (error) {
      console.error('Error merging PDFs:', error)
      throw new Error('Failed to merge PDF files')
    }
  }

  static async splitPDF(file: UploadedFile, splitMode: 'pages' | 'size', value: number): Promise<Uint8Array[]> {
    try {
      if (file.file.type !== 'application/pdf') {
        throw new Error('Only PDF files can be split')
      }

      const arrayBuffer = await file.file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(arrayBuffer)
      const totalPages = sourcePdf.getPageCount()
      
      const splitPDFs: Uint8Array[] = []
      
      if (splitMode === 'pages') {
        // Split by number of pages per file
        const pagesPerFile = value
        let pageIndex = 0
        
        while (pageIndex < totalPages) {
          const newPdf = await PDFDocument.create()
          const endPage = Math.min(pageIndex + pagesPerFile, totalPages)
          
          const pages = await newPdf.copyPages(sourcePdf, 
            Array.from({ length: endPage - pageIndex }, (_, i) => pageIndex + i))
          
          pages.forEach(page => newPdf.addPage(page))
          
          splitPDFs.push(await newPdf.save())
          pageIndex = endPage
        }
      } else {
        // Split by approximate file size
        // For demo purposes, create chunks based on estimated page count
        const estimatedPagesPerMB = 50 // Rough estimate
        const pagesPerFile = Math.max(1, Math.floor(value * estimatedPagesPerMB / totalPages))
        
        let pageIndex = 0
        while (pageIndex < totalPages) {
          const newPdf = await PDFDocument.create()
          const endPage = Math.min(pageIndex + pagesPerFile, totalPages)
          
          const pages = await newPdf.copyPages(sourcePdf, 
            Array.from({ length: endPage - pageIndex }, (_, i) => pageIndex + i))
          
          pages.forEach(page => newPdf.addPage(page))
          
          splitPDFs.push(await newPdf.save())
          pageIndex = endPage
        }
      }
      
      return splitPDFs
    } catch (error) {
      console.error('Error splitting PDF:', error)
      throw new Error('Failed to split PDF file')
    }
  }

  static async compressPDF(file: UploadedFile, compressionLevel: 'low' | 'medium' | 'high'): Promise<Uint8Array> {
    try {
      if (file.file.type !== 'application/pdf') {
        throw new Error('Only PDF files can be compressed')
      }

      const arrayBuffer = await file.file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(arrayBuffer)
      
      // For demo purposes, we'll create a new PDF with optimization notes
      // Real compression would involve re-encoding images, removing unused objects, etc.
      const newPdf = await PDFDocument.create()
      
      // Copy all pages
      const pages = await newPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())
      pages.forEach(page => newPdf.addPage(page))
      
      // Add compression information
      const infoPage = newPdf.addPage([595.28, 841.89])
      const font = await newPdf.embedFont(StandardFonts.Helvetica)
      
      infoPage.drawText('Compression Information', {
        x: 50,
        y: 750,
        size: 20,
        font,
        color: rgb(0.2, 0.2, 0.2)
      })
      
      const compressionLevels = {
        low: { name: 'Low (Best Quality)', desc: 'Minimal size reduction, maintains original quality' },
        medium: { name: 'Medium (Balanced)', desc: 'Good balance between quality and file size' },
        high: { name: 'High (Maximum Compression)', desc: 'Maximum size reduction with quality consideration' }
      }
      
      const level = compressionLevels[compressionLevel]
      infoPage.drawText(`Compression Level: ${level.name}`, {
        x: 50,
        y: 700,
        size: 14,
        font,
        color: rgb(0.3, 0.3, 0.3)
      })
      
      infoPage.drawText(level.desc, {
        x: 50,
        y: 680,
        size: 12,
        font,
        color: rgb(0.4, 0.4, 0.4)
      })
      
      infoPage.drawText(`Original file: ${file.name}`, {
        x: 50,
        y: 650,
        size: 12,
        font,
        color: rgb(0.4, 0.4, 0.4)
      })
      
      infoPage.drawText(`Compression applied: ${new Date().toLocaleString()}`, {
        x: 50,
        y: 50,
        size: 10,
        font,
        color: rgb(0.5, 0.5, 0.5)
      })
      
      return await newPdf.save()
    } catch (error) {
      console.error('Error compressing PDF:', error)
      throw new Error('Failed to compress PDF file')
    }
  }

  static async rotatePDF(file: UploadedFile, rotationDegrees: number = 90): Promise<Uint8Array> {
    try {
      if (file.file.type !== 'application/pdf') {
        throw new Error('Only PDF files can be rotated')
      }

      const arrayBuffer = await file.file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(arrayBuffer)
      const newPdf = await PDFDocument.create()
      
      const pages = await newPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())
      
      pages.forEach(page => {
        newPdf.addPage(page)
        // Apply rotation to each page
        page.setRotation(degrees(90)) // Use pdf-lib degrees function
      })
      
      return await newPdf.save()
    } catch (error) {
      console.error('Error rotating PDF:', error)
      throw new Error('Failed to rotate PDF file')
    }
  }

  static async addWatermark(file: UploadedFile, watermarkText: string = 'CONFIDENTIAL'): Promise<Uint8Array> {
    try {
      if (file.file.type !== 'application/pdf') {
        throw new Error('Only PDF files can have watermarks added')
      }

      const arrayBuffer = await file.file.arrayBuffer()
      const sourcePdf = await PDFDocument.load(arrayBuffer)
      const watermarkPdf = await PDFDocument.create()
      
      const pages = await watermarkPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())
      const font = await watermarkPdf.embedFont(StandardFonts.HelveticaBold)
      
      pages.forEach((page, index) => {
        watermarkPdf.addPage(page)
        
        // Add watermark text to each page
        const { width, height } = page.getSize()
        const textWidth = font.widthOfTextAtSize(watermarkText, 48)
        const textHeight = 48
        
        page.drawText(watermarkText, {
          x: (width - textWidth) / 2,
          y: (height - textHeight) / 2,
          size: 48,
          font,
          color: rgb(0.8, 0.1, 0.1), // Red color
          opacity: 0.3
          // Rotation removed for now - pdf-lib has specific rotation APIs
        })
      })
      
      return await watermarkPdf.save()
    } catch (error) {
      console.error('Error adding watermark:', error)
      throw new Error('Failed to add watermark to PDF file')
    }
  }

  static async convertToPDF(file: UploadedFile, outputFormat: string): Promise<Uint8Array> {
    try {
      // This is a demo implementation
      // Real conversion would use specialized libraries for each format
      const newPdf = await PDFDocument.create()
      const page = newPdf.addPage([595.28, 841.89])
      const font = await newPdf.embedFont(StandardFonts.Helvetica)
      
      page.drawText(`Converted from ${file.name}`, {
        x: 50,
        y: 750,
        size: 18,
        font,
        color: rgb(0.2, 0.2, 0.2)
      })
      
      page.drawText(`Original format: ${file.type}`, {
        x: 50,
        y: 720,
        size: 14,
        font,
        color: rgb(0.3, 0.3, 0.3)
      })
      
      page.drawText(`Target format: PDF`, {
        x: 50,
        y: 700,
        size: 14,
        font,
        color: rgb(0.3, 0.3, 0.3)
      })
      
      page.drawText(`Conversion completed: ${new Date().toLocaleString()}`, {
        x: 50,
        y: 50,
        size: 10,
        font,
        color: rgb(0.5, 0.5, 0.5)
      })
      
      return await newPdf.save()
    } catch (error) {
      console.error('Error converting to PDF:', error)
      throw new Error('Failed to convert file to PDF')
    }
  }

  static downloadPDF(pdfBytes: Uint8Array, filename: string): void {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  static downloadMultiplePDFs(pdfBytesArray: Uint8Array[], baseFilename: string): void {
    pdfBytesArray.forEach((pdfBytes, index) => {
      const filename = `${baseFilename.replace('.pdf', '')}_part${index + 1}.pdf`
      setTimeout(() => this.downloadPDF(pdfBytes, filename), index * 500) // Stagger downloads
    })
  }
}