const {Storage}=require ("@google-cloud/storage")
const bucketName = 'storage-awarri_llm';
const fs = require('fs');

// Specify the path to the JSON file
const filePath = 'data.json';

// Read the JSON file


async function readBucket(bucketName){
 const storage = new Storage({
    keyFilename:'gpc.json', // Path to your service account key file
  });
  fs.readFile("evaluation.json", 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }
  
    try {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
    //  uploadFile(bucketName, jsonData, 'Evaluations');
      // Do something with the JSON data
     // console.log('Data from JSON file:', jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON data:', parseError);
    }
  });

const bucket = storage.bucket(bucketName);
 
const folders = new Set();
const [Files]=await bucket.getFiles();
Files.forEach(file => {
    const parts = file.name.split('/');
    if (parts.length > 1) {
      // Extract folder name
      folders.add(parts[0]);
    }
  });

  console.log('Folders in the bucket:', Array.from(folders));
console.log("Bucket Found")
//Download the file as a bufferconst 
 const [fileContent] = await Files[0].download();    
 console.log('File content:', 
 fileContent.toString());
 return Files
}


readBucket(bucketName)

async function uploadFile(bucketName, filePath, destinationFileName) {
    const storage = new Storage({
        keyFilename:'gpc.json', // Path to your service account key file
      });
    const bucket = storage.bucket(bucketName);
    //const file = bucket.file(destinationFileName); 
    const timestamp = new Date().getTime(); // Example: Using timestamp as part of the object name
    const objectName = ""+destinationFileName+"/object_"+timestamp+".json";
    const file = bucket.file(objectName);     
    await file.save(JSON.stringify(filePath));
    try {

    //   await storage.bucket(bucketName).upload(filePath, {
    //     destination: destinationFileName,
    //   });
    // console.log(filePath)
    // await file.save(JSON.stringify(filePath));
      console.log(`${filePath} uploaded to ${bucketName}/${destinationFileName}.`);
    } catch (err) {
      console.error('Error uploading file to bucket:', err);
    }
  }
  
//   Example usage

//uploadFile(bucketName, datt, 'Evaluations');
//uploadFile(bucketName, 'evaluation.json', 'Evaluations');


module.exports = {
    uploadFile: uploadFile
  };