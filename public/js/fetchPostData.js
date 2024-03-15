
const postComment = (postFile) => {
    
  document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get data from form fields
    var name = document.getElementById('name').value;
    var comment = document.getElementById('comment').value;
    
    fetch(`https://script.google.com/macros/s/AKfycbwt_Y3eOdLUTtQKZ3wsaKDnJgZXFWNPqp3-YEV7-BGSAUV0qZK_K9n3o2GUrLe6k5PF/exec?action=${postFile}`, {
    method: 'POST',
    mode : 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      comment: comment
    })
  })
  .then(response => response.text())
  .then(data => console.log("Hay un error"))
  .catch(error => console.error('Error posting data to API:', error));
  
});
}

export default postComment; // Export the function