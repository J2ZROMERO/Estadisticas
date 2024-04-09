import CommentPoster from './comments.js';

// Initialize CommentPoster instance
const commentPoster = new CommentPoster();

// Get DOM elements
const pdfViewer = document.getElementById('pdfViewer');
const pdfThumbnails = document.querySelectorAll('.pdf-thumbnail');
const myModal = new bootstrap.Modal(document.getElementById('pdfModal'));

// Event listener for opening modal when PDF thumbnail is clicked
pdfThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', function(e) {
    const pdfUrl = this.getAttribute('data-pdf');
    pdfViewer.src = pdfUrl;

    // Show modal
    myModal.show();

    // Function to execute when modal is shown
    function onModalShown() {
      // Determine PDF type and fetch comments
      if (e.target.parentElement.classList.contains('happines')) {
        commentPoster.getRows('pdf1', 'post1', 'happiness', pdfUrl);
      } else if (e.target.parentElement.classList.contains('Cats')) {
        commentPoster.getRows('pdf2', 'post2', 'Cats', pdfUrl);
      } else if (e.target.parentElement.classList.contains('colors')) {
        commentPoster.getRows('pdf3', 'post3', 'colors', pdfUrl);
      } else if (e.target.parentElement.classList.contains('rabbit')) {
        commentPoster.getRows('pdf4', 'post4', 'rabbit', pdfUrl);
      } else if (e.target.parentElement.classList.contains('communism')) {
        commentPoster.getRows('pdf5', 'post5', 'communism', pdfUrl);
      } else if (e.target.parentElement.classList.contains('ai')) {
        commentPoster.getRows('pdf6', 'post6', 'ai', pdfUrl);
      }

      // Remove event listener to prevent multiple calls
      myModal._element.removeEventListener('shown.bs.modal', onModalShown);
    }

    // Listen for modal shown event
    myModal._element.addEventListener('shown.bs.modal', onModalShown);
  });
});

// Event listener for submitting comment form
document.getElementById('commentForm').addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission
  const name = document.getElementById('name');
  const comment = document.getElementById('comment');
  commentPoster.postComment(name, comment);

  // Toggle visibility of comment form
  commentForm.classList.toggle('d-none');
  if (!commentForm.classList.contains('d-none')) {
    toggleCommentFormButton.textContent = 'No comment? Click here to hide the form.';
  } else {
    toggleCommentFormButton.textContent = 'Add Comment';
  }
});

// Event listener for closing the modal
document.querySelector('.btn-close').addEventListener('click', function(e) {
  // Clear comments list and reset PDF viewer
  document.getElementById('commentsList').innerHTML = '';
  document.getElementById('pdfViewerContainer').innerHTML =
    `<div id="loadingSpinner">
       <div class="spinner"></div>
     </div>
     <canvas id="pdfViewer"></canvas> `;
  document.getElementById('pageCount').textContent = '0 - 0';
});

// Event listener for toggling the comment form
document.addEventListener('DOMContentLoaded', function() {
  toggleCommentFormButton.addEventListener('click', () => {
    // Toggle visibility of comment form
    commentForm.classList.toggle('d-none');
    if (!commentForm.classList.contains('d-none')) {
      toggleCommentFormButton.textContent = 'No comment? Click here to hide the form.';
    } else {
      toggleCommentFormButton.textContent = 'Add Comment';
    }
  });
});

// Define toggleCommentFormButton and commentForm
const toggleCommentFormButton = document.getElementById('toggleCommentForm');
const commentForm = document.getElementById('commentForm');
