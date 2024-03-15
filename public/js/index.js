import getRows from './fetchGetData.js';
import postComment from './fetchPostData.js';  





let pdfViewer = document.getElementById('pdfViewer');
let commentField = document.getElementById('comment');

let pdfThumbnails = document.querySelectorAll('.pdf-thumbnail');
pdfThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', function() {
    let pdfUrl = this.getAttribute('data-pdf');
    pdfViewer.src = pdfUrl;
  });
});

// Initialize modal manually
let myModal = new bootstrap.Modal(document.getElementById('pdfModal'));

// Show modal when PDF thumbnail is clicked
pdfThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', function(e) {
    
    if(e.target.parentElement.classList[2]== 'pdf-1'){
        postComment('post1');
        
    }
    if(e.target.parentElement.classList[2]== 'pdf-2'){
      postComment('post2');
     ;
     }if(e.target.parentElement.classList[2]== 'pdf-3'){
      postComment('post3');
    
    }
    if(e.target.parentElement.classList[2]== 'pdf-4'){
      postComment('post4');
    
  }
     if(e.target.parentElement.classList[2]== 'pdf-5'){
      postComment('post5');
     
}
    if(e.target.parentElement.classList[2]== 'pdf-6'){
      postComment('post6');
      
}
    myModal.show();
  });
});






