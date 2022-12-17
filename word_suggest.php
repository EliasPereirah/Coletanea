<?php
function suggestWord($word, $dictionary, $maxDistance =2) {
    // Inicializa a variável de distância mínima com um valor muito grande
    $minDistance = PHP_INT_MAX;
    // Inicializa a variável que armazenará a palavra ou frase mais próxima
    $closestWord = "";

    // Percorre todas as palavras ou frases do dicionário
    foreach ($dictionary as $dictionaryWord) {
        // Calcula a distância entre a palavra ou frase digitada pelo usuário e a palavra ou frase do dicionário
        $distance = levenshtein($word, $dictionaryWord);
        // Se a distância for menor que a distância mínima atual, atualiza as variáveis
        if ($distance < $minDistance) {
            $minDistance = $distance;
            if($distance <= $maxDistance){
                $closestWord = $dictionaryWord;
            }
        }
    }

    // Retorna a palavra ou frase mais próxima
    return $closestWord;
}

// Exemplo de uso da função
$dictionary = array("amizade", "amor", "vida", "percepção",'pacificação','buscamos');

$frase = "nós buscames a pacificassão";
$all_words = explode(" ", $frase);

$suggested_phrase = '';
foreach ($all_words as $word){
    $word = trim($word);
    $suggestion = suggestWord($word, $dictionary, 2);
    if($suggestion){
        $suggested_phrase .=' <b>'.$suggestion.'</b>';
    }else{
        $suggested_phrase .=' '.$word;
    }

}
echo  $suggested_phrase;
