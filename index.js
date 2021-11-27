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
    	string+="\ncategory: Algoritmi con Scratch, Altri linguaggi, Chiacchiere computazionali, Coding ed elettronica, Conoscere Scratch, Corso base di Scratch, Didattica con Scratch, Giochi con Scratch, Off Topic, Top 10";
    	string+="\ntags: ['Cicli', 'Pixel Art', 'Geografia', 'Matematica', 'Geometria', 'Top 10', 'Trucchi Scratch', 'Pillole di Scratch', 'Platform', 'Python', 'Minecraft', 'Raspberry PI', 'Giochi classici', 'Gameplay', 'Natale', 'Editor Grafico', '#supereasy', 'Informatica', 'Musica', 'Sparare', 'Animazioni', 'Variabili e Liste', 'Sicurezza informatica', 'Ingegneria sociale', 'C#', 'Unity', 'Gli Sprite', 'Controlli e condizioni', 'Interazioni', 'Storytelling', 'I messaggi', 'Cloni', 'Deep web e Dark web', 'Sport', 'Strumenti Scratch', 'Javascript e HTML5', 'Open source', 'Microbit', 'makecode', 'Fisica', 'Guidare', 'Shop', 'Scratch2']";
      string+="\nkeywords: ['Scratch', 'Scratch3']";
    	string+="\nthumbnail: " + title + ".jpg";
      string+="\nthumbnailText: " + out.items[0].snippet.title;
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

      //console.log(out.items[0].snippet.thumbnails.maxres);
      if(out.items[0].snippet.thumbnails.maxres !== undefined){
        document.getElementById("image").src = out.items[0].snippet.thumbnails.maxres.url;
        document.getElementById("linkImage").href = out.items[0].snippet.thumbnails.maxres.url;
        document.getElementById("linkImage").download = title;
        document.getElementById("error").innerHTML = "";
      }else{
        document.getElementById("image").src = "";
        document.getElementById("error").innerHTML += "Non è possibile recuperare l'immagine";
      }

      download(title + ".mdx",string);

    })
    .catch(err => { throw err });

  }

}


