/*function uploadImage(inputId) {
	var progressBar = document.getElementById(inputId.replace('Input', 'ProgressBar'));
	var input = document.getElementById(inputId);
	var file = input.files[0];
  
	if (file) {
		var formData = new FormData();
		formData.append("image", file);
  
		// Simulate progress bar
		var progress = 0;
		var interval = setInterval(function () {
			if (progress >= 100) {
				clearInterval(interval);
			} else {
				progress += 10;
				progressBar.style.width = progress + '%';
			}
		}, 500);
  
		// Here you can add code to upload the image to your server using AJAX or other methods
	} else {
		alert("Please select an image to upload.");
	}
  }*/
  function uploadImage(inputId) {
    var progressBar = document.getElementById(inputId.replace('Input', 'ProgressBar'));
    var input = document.getElementById(inputId);
    var file = input.files[0];

    if (file) {
        var formData = new FormData();
        formData.append("image", file);

        // Reset progress bar
        progressBar.style.width = '0%';

        // Simulate progress bar
        var progress = 0;
        var interval = setInterval(function () {
            if (progress >= 100) {
                clearInterval(interval);
            } else {
                progress += 10;
                progressBar.style.width = progress + '%';
            }
        }, 500);

        // Here you can add code to upload the image to your server using AJAX or other methods
    } else {
        // Reset progress bar when no image is selected
        progressBar.style.width = '0%';
        alert("Please select an image to upload.");
    }
}

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${btoa(`${username}:${password}`)}`
  },
  body: JSON.stringify(postData)
})
.then(response => response.json())
.then(data => {
  console.log('Post created:', data);
})
.catch(error => {
  console.error('Error creating post:', error);
});


/*function generateText() {
    const openai = new openai.Api('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');

    openai.Completion.create({
        engine: 'text-davinci-002',
        prompt: 'Once upon a time,',
        max_tokens: 50
    }).then(response => {
        console.log(response.choices[0].text);
    }).catch(error => {
        console.error(error);
    });
}*/
document.addEventListener('DOMContentLoaded', function () { 
	
	const createPostBtn = 
		document.getElementById('createPostBtn'); 
	const createPostModal = 
		document.getElementById('createPostModal'); 
	const closeModal = 
		document.getElementById('closeModal'); 
	const postForm = 
		document.getElementById('postForm'); 
	const postSubmitBtn = 
		document.getElementById('postSubmitBtn'); 
	const postContainer = 
		document.querySelector('.post-container'); 
	const postDetailModal = 
		document.getElementById('postDetailModal'); 
	const closeDetailModal = 
		document.getElementById('closeDetailModal'); 
	const detailTitle = 
		document.getElementById('detailTitle'); 
	const detailDate = 
		document.getElementById('detailDate'); 
	const detailDescription = 
		document.getElementById('detailDescription'); 

	createPostBtn.addEventListener('click', function () { 
		createPostModal.style.display = 'flex'; 
		document.addEventListener('DOMContentLoaded', function () {
			// Your existing code
		
			const postCategoryInput = document.getElementById('postCategory');
		
			// Initialize Awesomplete on the postCategory input
			const categories = ['Travel', 'Food', 'Coding', 'Music']; // Add your categories here
			new Awesomplete(postCategoryInput, { list: categories });
		
			// Your existing code
		});
		

	}); 

	closeModal.addEventListener('click', function () { 
		// Add fadeOut class 
		createPostModal.classList.add('fadeOut'); 
		setTimeout(() => { 
			createPostModal.style.display = 'none'; 
			// Remove fadeOut class 
			createPostModal.classList.remove('fadeOut'); 
		}, 500); 
	}); 

	postForm.addEventListener('submit', function (event) { 
		event.preventDefault(); 

		// Validation 
		const postCategory = 
			document.getElementById('postCategory').value; 
		const postTitle = 
			document.getElementById('postTitle').value; 
		const postDescription = 
			document.getElementById('postDescription').value; 

		if (postCategory.trim() === '' || 
		postTitle.trim() === '' || 
		postDescription.trim() === '') { 
			alert('Please fill out all fields.'); 
			return; 
		} 

		// Get the current date 
		const currentDate = new Date(); 
		const day = currentDate.getDate(); 
		const month = currentDate.toLocaleString('default', 
		{ month: 'short' }); 
		const year = currentDate.getFullYear(); 
		const formattedDate = day + ' ' + month + ' ' + year; 

		// Create a new post element 
		const newPost = document.createElement('div'); 
		newPost.className = 'post-box'; 
		newPost.innerHTML = ` 
			<h1 class="post-title" data-title="${postTitle}"
		data-date="${formattedDate}"
		data-description="${postDescription}"> 
			${postTitle}</h1><br> 
			
		<h2 class="category">${postCategory}</h2><br> 
		<span class="post-date">${formattedDate}</span> 
		<p class="post-description"> 
		${postDescription.substring(0, 100)}...</p> 
		<button class="delete-post" data-title="${postTitle}"> 
		Delete</button> 
		<span class="load-more" data-title="${postTitle}"
		data-date="${formattedDate}"
		data-description="${postDescription}"> 
		Load more</span> 
		`; 

		// Append the new post to the post container 
		postContainer.insertBefore(newPost, 
			postContainer.firstChild); 

		const postCreatedMessage = document 
		.getElementById('postCreatedMessage'); 
		postCreatedMessage.style.display = 'block'; 


		// Close the modal 
		createPostModal.style.display = 'none'; 

		// Reset the form 
		postForm.reset(); 

		setTimeout(() => { 
			postCreatedMessage.style.display = 'none'; 
		}, 3000); 
	}); 

	postContainer.addEventListener('click', function (event) { 
		if (event.target.classList.contains('load-more') || 
		event.target.classList.contains('post-title')) { 
			const title = event.target.getAttribute('data-title'); 
			const date = event.target.getAttribute('data-date'); 
			const description = 
				event.target.getAttribute('data-description'); 

			// Set content in detail modal 
			detailTitle.textContent = title; 
			detailDate.textContent = date; 
			detailDescription.textContent = description; 

			// Display the detail modal 
			postDetailModal.style.display = 'flex'; 
		} 

		if (event.target.classList.contains('delete-post')) { 
			const titleToDelete = 
				event.target.getAttribute('data-title'); 
			const postToDelete = 
				document.querySelector(` 
			.post-title[data-title= 
				"${titleToDelete}"]`).closest('.post-box'); 

			// Add fadeOut class to initiate the animation 
			postToDelete.classList.add('fadeOut'); 

			// Remove the post after the animation completes 
			setTimeout(() => { 
				postContainer.removeChild(postToDelete); 
			}, 500); 

		} 
	}); 

	closeDetailModal.addEventListener('click', function () { 
	
		// Add fadeOut class 
		postDetailModal.classList.add('fadeOut'); 
		setTimeout(() => { 
		postDetailModal.style.display = 'none'; 
			
		// Remove fadeOut class 
		postDetailModal.classList.remove('fadeOut'); 
		}, 500); 
	}); 
}); 
