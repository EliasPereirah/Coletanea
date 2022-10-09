<?php

    /** cut text without cutting words in half **/
    public function cropTextElegantly(string $title, int $limit = 120)
    {
        // quem não tem as manhas não mexe não. :)
        if (strlen($title) > $limit) {
            $all_words = explode(" ", $title);
            $new_title = '';
            foreach ($all_words as $word) {
                $word = trim($word);
                if (strlen("$new_title $word") > $limit) {
                    if (!empty(trim($new_title))) {
                        $title = $new_title;
                        break;
                    }
                } else {
                    $new_title .= " " . $word;
                }
            }// end foreach

            if (strlen($title) > $limit) {
                $title = substr($title, 0, $limit);
            }
            return $title;

        } else {
            // title is already adequate
            return $title;
        }
    } // cropTextElegantly
