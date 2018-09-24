window.onload = () => {
  const host = 'http://localhost:3030/api/posts';
  const http = new XMLHttpRequest();
  const postParent = document.querySelector('.posts_container');
  http.open('GET', `${host}`, true);


  http.onload = () => {
    if (http.status === 200) {
      const posts = JSON.parse(http.response).posts
      posts.forEach(post => {
        const postDiv = document.createElement('div');
        const titlePost = document.createElement('h2');
        titlePost.innerText = post.title;
        let postLink = document.createElement('a');
        postLink.setAttribute('href', post.url);

        postDiv.appendChild(postLink);
        postLink.appendChild(titlePost);
        postParent.appendChild(postDiv);
      });
    }
  }
  http.send();
};
