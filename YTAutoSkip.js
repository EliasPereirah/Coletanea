/*
Este código JavaScript foi projetado para ser usado em páginas do YouTube para adicionar a capacidade de pular anúncios automaticamente. Ele define duas funções: youtubeAutoSkip e detectWebsite. A função youtubeAutoSkip é chamada quando o usuário está em uma página de vídeo do YouTube e toma o corpo da página HTML como entrada. Ela cria um intervalo de tempo que verifica a cada segundo se o vídeo atual é diferente do vídeo original que foi carregado na página e, se for, recarrega a página.

A função também configura um evento de pressionar uma tecla para permitir que o usuário altere o estado de "pular" (skip) apertando o * tecla. Ele armazena o estado de "pular" em uma variável de armazenamento local do navegador e também configura outro intervalo de tempo que verifica a cada segundo se o tempo atual do vídeo é maior ou menor do que a duração total do vídeo em mais de dois segundos. Se for, ele pula o anúncio pressionando o botão de pular anúncio na página.

A função detectWebsite é chamada quando a página é carregada e verifica se o usuário está em um site do YouTube. Se estiver, ela chama a função youtubeAutoSkip passando o corpo da página HTML e o ID do vídeo original como parâmetros.
*/
function youtubeAutoSkip(yt_body, original_video_id){
    let skip = localStorage.getItem("skip");
    if(skip == null){
        skip = false;
    }else{
        skip = eval(skip); // turn string to boolean
    }
    let key_press = 0;
    document.onkeydown = (event)=>{
        if(event.key === '*'){
            key_press++;
            if((key_press  % 2) == 0){
                skip = !skip;
                localStorage.setItem("skip", skip);
                let can_skip = skip ? 'sim' : 'não';
                console.log("Skpping? "+can_skip);
             }
        }

    }
    

    let regex = /lengthSeconds":"(\d+)"/;
    let found = yt_body.innerHTML.match(regex);
    
    setInterval(()=>{
        currentURL = document.URL;
        let the_url = new URL(document.URL);
        let search_param = the_url.search.match("v=(.*)");
        if(search_param != null){
            video_id = search_param[1].substr(0,11);
        }else{
            video_id = 'empty';
        }

      if(original_video_id != video_id){
          if(currentURL.match("watch") != null){
            if(skip){
                location.reload(); // necessary because in another way would not get the correct total_duration
            }
            return false;
          }else{
           // console.log('This page is not beying reload because it is not a video page');
          }
      }
    },1000)

    if(found != null && found[1] != null){
        let total_duration = parseInt(found[1]);
        let video = document.querySelectorAll("video");
        console.log('Total duration: '+total_duration);
        setInterval(()=>{
           if(total_duration == 0){
              return false; // probably is live
           } 
           if(video[0].duration < (total_duration - 2) | video[0].duration > (total_duration + 2)){
            if(skip){
                video[0].currentTime = 72000;
                document.querySelectorAll(".ytp-ad-skip-button.ytp-button")[0].click();
            }
            
           }
        },1000);
    }else{
       //console.log('Has foud no lengthSeconds');
    }
 
 }

 

function detectWebsite() {
    if(document.URL.search('youtube.com') != -1){
        console.clear();
        console.log('On Youtube');
        let yt_body = document.querySelector("body");
        let the_url = new URL(document.URL);
        let search_param = the_url.search.match("v=(.*)");
        if(search_param != null){
            original_video_id = search_param[1].substr(0,11);
        }else{
            original_video_id = 'empty';
        }
        youtubeAutoSkip(yt_body, original_video_id);
    }
}

detectWebsite();
