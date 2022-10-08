<?php
function genDescription($text, $title)
    {

        if (preg_match("/[\s\S]{0,50}{$title}[\s\S]{0,50}/i", $text, $match)) {
            return $match[0];
        } else {
            $all_words = explode(" ", $title);
            $options = [];
            foreach ($all_words as $word) {
                preg_match("/[\s\S]{0,50}{$word}[\s\S]{0,50}/i", $text, $match);
                if (!empty($match['0'])) {
                    $desc = $match[0];
                    $words_desc = explode(" ", $desc);
                    $point = 0;
                    foreach ($words_desc as $wd) {
                        if (preg_match("/$wd/", $title)) {
                            $point++;
                        }
                    }
                    $options[$point] = $desc;
                }
            }
        }

        krsort($options); // make the best result(more points) be the first on the array
        foreach ($options as $opt) {
            $description = $opt;
            break; // the first is the best
        }
        if (!empty($description)) {
            return $description;
        }
        return $title;
    } // genDescription
