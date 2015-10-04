<?php
#	Create a PHPSpellCheck Instance for the SpellCheckButton Class, SpellAsYouType Class and the Javascript/AJAX API
$spellcheckObject = new PHPSpellCheck();

############# LICENSE ############

#	Copy and Paste your license key here.  Buy one onlline at www.phpspellcheck.com 
$spellcheckObject -> LicenceKey="TRIAL";


######### BASIC SETTINGS ##########
$spellcheckObject -> IgnoreAllCaps = false;
$spellcheckObject -> IgnoreNumeric = false;
$spellcheckObject -> CaseSensitive = true;

# Set the tollerance of the spellchecker to 'unlikely' suggestions. 0=intollerant ... 10=very tollerant  
$spellcheckObject -> SuggestionTollerance = 1.5;

############  FILE SYSTEM  ###########

# Set up the file path to the (.dic) dictionaries folder
$spellcheckObject -> DictionaryPath = ("../dictionaries/");

# Loads all dictionaries requested by the API */
foreach($RequestedLangs as $dictionary){   $spellcheckObject -> LoadDictionary(trim($dictionary) );}

############  DICTIONARY SYSTEM  ###########

#Add vocabulary to the spellchecker from a text file loaded from the DictionaryPath
$spellcheckObject -> LoadCustomDictionary("custom.txt");
/* Alternative methods to load vocabulary
$spellcheckObject -> LoadCustomDictionaryFromURL( $URL );
$spellcheckObject ->AddCustomDictionaryFromArray($array)  // This is great for SQL integration
*/

/* Ban a list of words which will never be allowed as correct spellings.  This is great for filtering profanity.*/
$spellcheckObject -> LoadCustomBannedWords("language-rules/banned-words.txt"); 
/*
You can also add banned words from an array which you could easily populate from an SQL query
//$spellcheckObject -> AddBannedWords(array("veryRudeWord"));
*/

/* Load a lost of Enforced Corrections from a file.  This allows you to enforce a spelling suggestion for a specific word or acronym.*/
$spellcheckObject -> LoadEnforcedCorrections("language-rules/enforced-corrections.txt");

/*Load a list of common typing mistakes to fine tune the suggestion performance.*/
$spellcheckObject -> LoadCommonTypos("language-rules/common-mistakes.txt");

?>