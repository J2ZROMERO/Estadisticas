export default class CommentPoster {
    constructor() {
      this.postNum = ''
      this.pdf = ''
    }
  
    async getRows(pdf,postNum) {
      this.pdf = pdf
      this.postNum = postNum
      let url = `https://script.google.com/macros/s/AKfycbyRS-CkZg1Y9eYsTWIBt_azYN2GWPKJS0koUTNc7CCVMeojIEeBff5Hne5GL135wslm/exec?pdfName=${pdf}`;

      console.log("se acaba de asignar el valor " + this.postNum)
  
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
  
    
    async afterPost() {
      
      document.getElementById('commentsList').innerHTML = ""
      
      

      let url = `https://script.google.com/macros/s/AKfycbyRS-CkZg1Y9eYsTWIBt_azYN2GWPKJS0koUTNc7CCVMeojIEeBff5Hne5GL135wslm/exec?pdfName=${this.pdf}`;

      
      
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        document.getElementById('commentsList').innerHTML = ""
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


    postComment(name,comment) {
     // Add event listener to the comment form
    
  const url = `https://script.google.com/macros/s/AKfycbyRS-CkZg1Y9eYsTWIBt_azYN2GWPKJS0koUTNc7CCVMeojIEeBff5Hne5GL135wslm/exec?action=${this.postNum}`;
      
         


        // Post data to the API endpoint
        fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: name.value,
            comment: comment.value
          })
        })
        .then(response => response.text())
        .then(data => { this.afterPost() })
         
        .catch(error =>  {this.showErrorPopup("Ups! there is an error, try it later.")}); // Handle error

        // clean inputs after posting comment  
        name.value = "";
        comment.value = "";

      
    }


   showErrorPopup(message) {
    const errorPopup = document.getElementById('errorPopup');
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorPopup.classList.remove('d-none');
  

    setTimeout(() => {
      errorPopup.classList.add('d-none');
    }, 3000); // Adjust the duration (in milliseconds) as needed
  }
  

    
  }
  
  