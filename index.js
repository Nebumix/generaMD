function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}


function createMD(){

  if(document.getElementById("video").value !== ""){

    let string = "";
    let video = document.getElementById("video").value;


  	if(document.getElementById("video").value.includes("https://studio.youtube.com/video")){
  		let exp = video.split("/");
		video = exp[4];
  	}

  	if(document.getElementById("video").value.includes("https://www.youtube.com/watch?")){
  		let exp = video.split("=");
		video = exp[1];
  	}

  	if(document.getElementById("video").value.includes("https://youtu.be/")){
  		let exp = video.split("/");
		video = exp[3];
  	}


    let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&key=AIzaSyB8czN_uLrtSCZnxURhWgFiGXGQCoeoMYg&id=' + video;
    //let obj;

    fetch(url)
    .then(res => res.json())
    .then((out) => {

      let title = slugify(out.items[0].snippet.title, {
        strict: true,
        lower: true,      // convert to lower case, defaults to `false`
      })

      //console.log('Checkout this JSON! ', out);

    	string+="---";
    	string+="\ntitle: " + out.items[0].snippet.title;
    	string+="\ndate: "+ out.items[0].snippet.publishedAt;
    	string+="\ncategory: Didattica con Scratch";
    	string+="\ntags: ['Geometria', 'Scratch2']";
    	string+="\nthumbnail: " + title + ".jpg";
    	string+="\n---";
    	string+="\n\n" + out.items[0].snippet.description;
      string+="\n\n`youtube: https://www.youtube.com/watch?v=" + out.items[0].id + "`";


      if(document.getElementById("progetto").value !== ""){
        let idProj = document.getElementById("progetto").value;

	  	if(document.getElementById("progetto").value.includes("https://scratch.mit.edu/projects/")){
	  		let expP = idProj.split("/");
			idProj = expP[4];
	  	}

        
        string+="\n* * *";
        string+='\nIl progetto realizzato con Scratch si pu\u00F2 vedere qui sotto, altrimenti nel sito di Scratch cliccando <a href="https://scratch.mit.edu/projects/' + idProj + '" target="_blank">qui</a>.';
        string+='\n<iframe src="https://scratch.mit.edu/projects/' + idProj + '/embed" allowtransparency="true" width="485" height="402" frameborder="0" scrolling="no" allowfullscreen></iframe>';
      }

      document.getElementById("image").src = out.items[0].snippet.thumbnails.maxres.url;

    	download(title + ".mdx",string);

    })
    .catch(err => { throw err });

  }

}


