export default class CommentPoster {
    constructor() {
      this.postNum = ''
    }
  
    async getRows(pdf,postNum) {
      let url = `https://script.google.com/macros/s/AKfycbyRS-CkZg1Y9eYsTWIBt_azYN2GWPKJS0koUTNc7CCVMeojIEeBff5Hne5GL135wslm/exec?pdfName=${pdf}`;
      this.postNum = postNum
      console.log(this.postNum)
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        data.map(obj => {
          // Create li element
          const li = document.createElement('li');
          li.classList.add('list-group-item');
          // Set inner HTML of the li element with name and comment
          li.innerHTML = `<strong>${obj.Name}:</strong> ${obj.Comment}`;
          // Append the li element to the ul parent
          commentsList.appendChild(li);
        });
        return data;
      } catch (error) {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        // Set inner HTML of the li element with error message
        li.innerHTML = "Error al capturar comentarios. Intente de nuevo o contacte al administrador.";
        // Append the li element to the ul parent
        document.getElementById('commentsList').appendChild(li);
      }
    }
  
    postComment() {
      // Add event listener to the comment form
      let names = document.getElementById('name').value;
  let comments = document.getElementById('comment').value;
  
      const url = `https://script.google.com/macros/s/AKfycbyRS-CkZg1Y9eYsTWIBt_azYN2GWPKJS0koUTNc7CCVMeojIEeBff5Hne5GL135wslm/exec?action=${this.postNum}`;
      document.getElementById('commentForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
          
console.log(this.postNum)

        // Post data to the API endpoint
        fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: names,
            comment: comments
          })
        })
        .then(response => response.text())
        .then(data => {
          console.log("Insercion Exitosa");
        
        }) // Handle successful response
        .catch(error => console.error('Error posting data to API:', error)); // Handle error

        
      });
 
      names = "";
      comments = "";
      
      console.log("despues ejecucuion");
    }

    
  }
  
  