import JSZip from 'jszip'
import { RAR } from 'rarjs'

const downloadZip = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.remove();
}

export const handleFileUpload = async (file, folderName, templateHTML) => {
    console.log({folderName})
    if (!file) {
        throw new Error('Invalid file input');
    }

    if (!folderName) {
        throw new Error('Folder name is required');
    }

    try {
        const { blob, filename } = await processFileAndCreateZip(file, folderName, templateHTML);
        downloadZip(blob, filename);
        return true;
    } catch (error) {
        console.error('Error processing file:', error);
        throw error;
    }
}

const processFileAndCreateZip = async (file, folderName, templateHTML) => {
    const fileType = file.name.split('.').pop().toLowerCase();
    validateFileType(fileType);

    const processedImages = new Map();
    
    switch (fileType) {
        case 'zip':
            await processZipFile(file, processedImages);
            break;
        case 'rar':
            await processRarFile(file, processedImages);
            break;
    }

    return await createExportZip(processedImages, folderName, templateHTML);
}

const validateFileType = (fileType) => {
    if (fileType !== 'zip' && fileType !== 'rar') {
        throw new Error('Unsupported file format. Please use ZIP or RAR');
    }
}

const processZipFile = async (file, processedImages) => {
    const zip = new JSZip();
    const contents = await zip.loadAsync(file);
    const imagePromises = [];

    Object.keys(contents.files).forEach(fileName => {
        processImageFile(fileName, contents.files[fileName], imagePromises, processedImages);
    });

    await Promise.all(imagePromises);
}

const processRarFile = async (file, processedImages) => {
    const rar = new RAR();
    const archive = await rar.load(file);
    const imagePromises = [];

    for (const entry of archive.entries) {
        if (!entry.isDirectory) {
            processImageFile(entry.name, entry, imagePromises, processedImages);
        }
    }

    await Promise.all(imagePromises);
}

const processImageFile = (fileName, file, promises, processedImages) => {
    const match = fileName.match(/^(\d+)\./);
    if (match && fileName.toLowerCase().endsWith('.jpg')) {
        const blockNumber = parseInt(match[1]);
        const fileSize = file._data ? file._data.uncompressedSize : file.size || 0;
        
        if (!processedImages.has(blockNumber) || 
            fileSize > processedImages.get(blockNumber).size) {
            promises.push(
                file.async('blob').then(blob => {
                    processedImages.set(blockNumber, {
                        blob,
                        size: fileSize,
                        name: `banner${blockNumber}_2x.jpg`
                    });
                })
            );
        }
    }
}

const createExportZip = async (processedImages,  folderName, templateHTML) => {
    const exportZip = new JSZip();
    console.log('jnjahsdogdhgi');
    
    const vifolder = exportZip.folder('vi');
    vifolder.file('index.html', templateHTML);

    const assetsFolder = exportZip.folder('assets');
    const imgFolder = assetsFolder.folder('img');
    
    processedImages.forEach(image => {
        imgFolder.file(image.name, image.blob);
    });

    const blob = await exportZip.generateAsync({type: 'blob'});
    return {
        blob,
        filename: `${folderName}.zip`
    };
}