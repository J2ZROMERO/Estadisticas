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
  let name = document.getElementById('name');
  let comment = document.getElementById('comment');
  commentPoster.postComment(name,comment)
  
  commentForm.classList.toggle('d-none'); // Toggle visibility of comment form
  if (!commentForm.classList.contains('d-none')) {
    toggleCommentFormButton.textContent = 'No comment? Click here to hide the form.';
  } else {
    toggleCommentFormButton.textContent = 'Add Comment';
  }

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


// JavaScript to toggle comment form visibility and change button text

  document.addEventListener('DOMContentLoaded', function() {
    toggleCommentFormButton.addEventListener('click', () => {
      commentForm.classList.toggle('d-none'); // Toggle visibility of comment form
      if (!commentForm.classList.contains('d-none')) {
        toggleCommentFormButton.textContent = 'No comment? Click here to hide the form.';
      } else {
        toggleCommentFormButton.textContent = 'Add Comment';
      }
    });
  });




  const toggleCommentFormButton = document.getElementById('toggleCommentForm');
  const commentForm = document.getElementById('commentForm');

