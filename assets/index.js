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
        postDiv.className = 'postDiv';
        postParent.appendChild(postDiv);

        const voter = document.createElement('div');
        voter.className = 'voterDiv';

        const upvote = document.createElement('div');
        upvote.className = 'upvote';
        const upvoteImg = document.createElement('img');
        upvoteImg.setAttribute('src', 'assets/upvoted.png');
        postDiv.appendChild(voter);
        upvote.appendChild(upvoteImg);
        voter.appendChild(upvote);

        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score';
        scoreDiv.innerHTML = post.score;
        voter.appendChild(scoreDiv);

        const downvote = document.createElement('div');
        downvote.className = 'downvote';
        const downvoteImg = document.createElement('img');
        downvoteImg.setAttribute('src', 'assets/downvoted.png');
        voter.appendChild(downvote);
        downvote.appendChild(downvoteImg);


        const titlePost = document.createElement('h2');
        titlePost.innerText = post.title;
        const postLinkDiv = document.createElement('div');
        postLinkDiv.className = "title"
        const postLink = document.createElement('a');
        postLink.setAttribute('href', post.url);


        postLinkDiv.appendChild(postLink);
        postDiv.appendChild(postLinkDiv);
        postLink.appendChild(titlePost);



      });
    }
  }
  http.send();
};
