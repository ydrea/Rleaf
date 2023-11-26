onUploadProgress: progressEvent => {
  setUploadPercentage(
    parseInt(
      Math.round((progressEvent.loaded * 100) / progressEvent.total)
    )
  );
},
  setTimeout(() => setUploadPercentage(0), 2000);
