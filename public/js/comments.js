export default class CommentPoster {
  constructor() {
    this.postNum = '';
    this.pdf = '';
    this.uri = '';  
  }

  async getRows(pdf, postNum, uri, pathPdf) {
    this.pathPdf = pathPdf;
    this.uri = uri;
    this.pdf = pdf;
    this.postNum = postNum;
    let url = `https://script.google.com/macros/s/AKfycbzMw138-uav9dy7FKc_XSIG-WUCq09xrThs9goSrRU4hRuwHa5JC5BV2lCvgSawUOaz/exec?pdfName=${pdf}`;
    this.renderPdf();
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
    document.getElementById('commentsList').innerHTML = "";
    let url = `https://script.google.com/macros/s/AKfycbzMw138-uav9dy7FKc_XSIG-WUCq09xrThs9goSrRU4hRuwHa5JC5BV2lCvgSawUOaz/exec?pdfName=${this.pdf}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      document.getElementById('commentsList').innerHTML = "";
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


  postComment(name, comment) {
    const url = `https://script.google.com/macros/s/AKfycbzMw138-uav9dy7FKc_XSIG-WUCq09xrThs9goSrRU4hRuwHa5JC5BV2lCvgSawUOaz/exec?action=${this.postNum}`;
    
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

renderPdf(){
  var { pdfjsLib } = globalThis;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs';

  var url = '/public/'+ this.pathPdf;
  var pdfDoc = null,
    scale = 1,
    pdfViewerContainer = document.getElementById('pdfViewerContainer');

    function renderPages(pdfDoc) {
      pdfViewerContainer.innerHTML = ''; // Clear existing pages
      for (var pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        var pageContainer = document.createElement('div');
        pageContainer.className = 'pdf-page-container';
        pdfViewerContainer.appendChild(pageContainer);
        pdfDoc.getPage(pageNum).then(function(page) {
          var viewport = page.getViewport({ scale: scale });
          var canvas = document.createElement('canvas');
          var context = canvas.getContext('2d', { willReadFrequently: true });

          canvas.className = 'pdf-page';
          pageContainer.appendChild(canvas);
          var context = canvas.getContext('2d');

          // Adjust canvas size to cover a significant portion of the view
          var containerHeight = pdfViewerContainer.clientHeight;
          var containerWidth = pdfViewerContainer.clientWidth;
          var pageWidth = viewport.width;
          var pageHeight = viewport.height;
          
          // Calculate the scale to fit the entire page in the container
          var scaleX = containerWidth / pageWidth;
          var scaleY = containerHeight / pageHeight;
          var fitScale = Math.min(scaleX, scaleY);
          
          // Apply the fit scale to the viewport
          viewport = page.getViewport({ scale: fitScale });

          // Render PDF page onto the canvas
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          };
          page.render(renderContext);

          // Add spacer between pages
          if (pageNum < pdfDoc.numPages) {
            var spacer = document.createElement('div');
            spacer.className = 'spacer';
            pdfViewerContainer.appendChild(spacer);
          }
        });
      }
    }

  function updatePageCount(pageNum) {
     document.getElementById('pageCount').textContent = pageNum + ' of ' + pdfDoc.numPages;
  }

  function adjustScale(newScale) {
    if (newScale < 0.1) {
      scale = 0.1;
    } else {
      scale = newScale;
    }
    renderPages(pdfDoc);
  }

  document.getElementById('zoomInBtn').addEventListener('click', function() {
    adjustScale(scale + 0.1);
  });

  document.getElementById('zoomOutBtn').addEventListener('click', function() {
    adjustScale(scale - 0.1);
  });

  document.getElementById('downloadBtn').addEventListener('click', function() {
    window.open(url, '_blank');
  });

  pdfjsLib.getDocument(url).promise.then(function(pdfDoc_) {      
    pdfDoc = pdfDoc_;
    renderPages(pdfDoc);
    updatePageCount(1);
  })

  // Add event listener for scroll events on the PDF container
  pdfViewerContainer.addEventListener('scroll', function() {
    let scrollTop = pdfViewerContainer.scrollTop;
    let pageHeight = pdfViewerContainer.clientHeight;
    let totalHeight = pdfViewerContainer.scrollHeight;
    let totalPages = pdfDoc.numPages;

    // Calculate current page based on scroll position
    let currentPage = Math.ceil((totalPages * scrollTop) / (totalHeight - pageHeight));

    // Update page count
    updatePageCount(currentPage);
  });
}
}
