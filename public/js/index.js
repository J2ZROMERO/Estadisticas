import CommentPoster from './comments.js'


const commentPoster = new CommentPoster();

let pdfViewer = document.getElementById('pdfCanvasContainer');
let commentField = document.getElementById('comment');

let pdfThumbnails = document.querySelectorAll('.pdf-thumbnail');
pdfThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', function(e) {
    
    let pdfUrl = this.getAttribute('data-pdf');
    
    pdfViewer.src = pdfUrl;
    if(e.target.parentElement.classList[2]== 'Aerogynamics'){
      commentPoster.getRows('pdf1','post1','Aerogynamics')
      
    }
    if(e.target.parentElement.classList[2]== 'Cats'){
      commentPoster.getRows('pdf2','post2','Cats')
      
    }
    if(e.target.parentElement.classList[2]== 'colors'){
      commentPoster.getRows('pdf3','post3','colors')
      
    }
        if(e.target.parentElement.classList[2]== 'rabbit'){
          commentPoster.getRows('pdf4','post4','rabbit')
      
    }
    if(e.target.parentElement.classList[2]== 'communism'){
      commentPoster.getRows('pdf5','post5','communism')
      
    }
    if(e.target.parentElement.classList[2]== 'pull-ups'){
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



  