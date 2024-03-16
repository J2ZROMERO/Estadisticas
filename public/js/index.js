import CommentPoster from './comments.js'


const commentPoster = new CommentPoster();

let pdfViewer = document.getElementById('pdfViewer');
let commentField = document.getElementById('comment');

let pdfThumbnails = document.querySelectorAll('.pdf-thumbnail');
pdfThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', function(e) {
    
    let pdfUrl = this.getAttribute('data-pdf');
    
    pdfViewer.src = pdfUrl;
    if(e.target.parentElement.classList[2]== 'pdf-1'){
      commentPoster.getRows('pdf1','post1')
      
    }
    if(e.target.parentElement.classList[2]== 'pdf-2'){
      commentPoster.getRows('pdf2','post2')
      
    }
    if(e.target.parentElement.classList[2]== 'pdf-3'){
      commentPoster.getRows('pdf3','post3')
      
    }
        if(e.target.parentElement.classList[2]== 'pdf-4'){
          commentPoster.getRows('pdf4','post4')
      
    }
    if(e.target.parentElement.classList[2]== 'pdf-5'){
      commentPoster.getRows('pdf5','post5')
      
    }
    if(e.target.parentElement.classList[2]== 'pdf-6'){
      commentPoster.getRows('pdf6','post6')
      
    }

    


  });
});


document.getElementById('commentForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  

  commentPoster.postComment()




  // Clear form fields after posting
});



// Initialize modal manually
let myModal = new bootstrap.Modal(document.getElementById('pdfModal'));

// Show modal when PDF thumbnail is clicked
pdfThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', function(e) {
    myModal.show();
  });
});






document.querySelector('.btn-close').addEventListener('click', function(e) {
  document.getElementById('commentsList').innerHTML = " "
})


