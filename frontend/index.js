import { backend } from 'declarations/backend';

let quill;

document.addEventListener('DOMContentLoaded', async () => {
  quill = new Quill('#editor', {
    theme: 'snow'
  });

  const newPostBtn = document.getElementById('newPostBtn');
  const postForm = document.getElementById('postForm');
  const newPostForm = document.getElementById('newPostForm');
  const postsSection = document.getElementById('posts');

  newPostBtn.addEventListener('click', () => {
    postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
  });

  newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const image = document.getElementById('postImage').value;
    const body = quill.root.innerHTML;

    try {
      await backend.addPost(title, image, body);
      newPostForm.reset();
      quill.setContents([]);
      postForm.style.display = 'none';
      await displayPosts();
    } catch (error) {
      console.error('Error adding post:', error);
    }
  });

  async function displayPosts() {
    try {
      const posts = await backend.getPosts();
      postsSection.innerHTML = '';
      posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.className = 'post';
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <img src="${post.image}" alt="${post.title}">
          <div class="post-body">${post.body}</div>
          <p class="timestamp">Posted on: ${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
        `;
        postsSection.appendChild(postElement);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  await displayPosts();
});
