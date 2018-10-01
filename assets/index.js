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

        const upvote = document.createElement('button');
        upvote.className = 'upvote';
        const upvoteImg = document.createElement('img');
        upvoteImg.setAttribute('src', 'assets/upvote0.png');
        postDiv.appendChild(voter);
        upvote.appendChild(upvoteImg);
        voter.appendChild(upvote);

        const scoreDiv = document.createElement('div');
        scoreDiv.className = 'score';
        scoreDiv.innerHTML = post.score;
        voter.appendChild(scoreDiv);

        const downvote = document.createElement('button');
        downvote.className = 'downvote';
        const downvoteImg = document.createElement('img');
        downvoteImg.setAttribute('src', 'assets/downvote0.png');
        voter.appendChild(downvote);
        downvote.addEventListener('click', () => {
          vote(post.id, "downvote")
          scoreDiv.innerHTML--;
          downvoteImg.setAttribute('src', 'assets/downvoted.png');
          downvote.disabled = true;
          upvote.disabled = true;
        });

        upvote.addEventListener('click', () => {
          vote(post.id, "upvote")
          scoreDiv.innerHTML++;
          upvoteImg.setAttribute('src', 'assets/upvoted.png');
          downvote.disabled = true;
          upvote.disabled = true;
        })
        downvote.appendChild(downvoteImg);

        const titlePost = document.createElement('h2');
        titlePost.innerText = post.title;
        const postLinkDiv = document.createElement('div');
        postLinkDiv.className = "title"
        const postLink = document.createElement('a');
        postLink.setAttribute('href', post.url);

        const timestamp = document.createElement('p')
        const time = post.timestamp
        const hourTime = Math.floor((Date.now() - Date.parse(time)) / 1000 / 60 / 60);
        timestamp.innerHTML = `submitted ${hourTime} hours ago`;

        const btnDelete = document.createElement('button');
        btnDelete.className = "button btnDelete"
        const btnDeleteDiv = document.createElement('div');
        btnDeleteDiv.className = "btnDeleteDiv"
        btnDelete.innerText = 'Delete';

        btnDelete.addEventListener('click', () => {
          fetch(`/posts/${post.id}`, {
            method: 'DELETE',
          }).then(location.href = `http://localhost:3030`);
        });

        const btnModify = document.createElement('button');
        const btnModifyDiv = document.createElement('div');
        btnModifyDiv.className = 'btnModifyDiv';
        btnModify.className = "button btnModify";
        btnModify.innerText = 'Modify';
        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'buttonforchange';

        postLinkDiv.appendChild(postLink);
        postDiv.appendChild(postLinkDiv);
        postLink.appendChild(titlePost);
        postLink.appendChild(timestamp);

        postLinkDiv.appendChild(buttonDiv);
        buttonDiv.appendChild(btnModify);
        buttonDiv.appendChild(btnDelete);
      });

      const vote = (id, vote) => {
        const url = `/posts/${id}/${vote}`;
        fetch(url, {
          method: "PUT",
        });
      };

    };
  }
  http.send();
};
