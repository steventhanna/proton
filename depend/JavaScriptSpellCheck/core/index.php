<?php
header('Content-type: text/html; charset=ISO-8859-1');
header("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past

//  Freeing up memory where available improoves performance on huge dictionary searches.
try{ini_set("memory_limit","255M");}catch(Exception $e){}
include "php/engine.php";
$script = false;
$SaveToCentralDictionary = false;

  error_reporting(0);
if(!isset($_GET["command"])){die("no command");}
if(isset($_GET["lan"]) &&  strlen($_GET["lan"])>0){$lang  = $_GET["lan"];}else{$lang = "English (International)" ;}
if(isset($_GET["note"]) &&  strlen($_GET["lan"])>0){$note  = $_GET["note"];}else{$note = "" ;}
if(isset($_GET["script"])){$script = true ;}
if(isset($_GET["sender"])){$sender = $_GET["sender"] ;}
if(isset($_GET["settingsfile"]) && strstr($_GET["settingsfile"],"/")===false && strstr($_GET["settingsfile"],'\\') ===false && strstr($_GET["settingsfile"],".")===false ){
$settingsfile = $_GET["settingsfile"] ;
}else{$settingsfile = "default-settings";}

$RequestedLangs = explode(",",$lang);




include ("settings/$settingsfile.php");
if(  strtoupper($_GET["command"])=="SAVEWORD" ){

	/*SAVE CENTRAL DICTIONARY ON USER ADD*/
		echo("SAVEWORD");
		echo        chr(5);
		echo		$sender ;
		echo        chr(5);
		if($SaveToCentralDictionary){	
 	$wordToSave = stripcslashes($_GET["args"]);
	$filePath = $spellcheckObject->DictionaryPath.$spellcheckObject->SaveToCentralDictionary;
	if (is_writable($filePath)) {
		$handle = fopen($filePath, 'a');
		fwrite($handle, "\n".$wordToSave);
		fclose($handle);
		echo		"$wordToSave Saved to $filePath";
	}else{
		
			echo	"$wordToSave Not Saved - $filePath Unwritable";
	}}else{
			echo	"!! SaveToCentralDictionary Must be set true in core/index.php line 10 to allow for a centralized 'add to dictionary'";
		
	}

	/*SAVE CENTRAL DICTIONARY ON USER ADD*/

}	

if( strtoupper($_GET["command"])=="WINSETUP" ){
	
	$words = explode(chr(1),stripcslashes($_GET["args"]));
	

	$suggestcountinit = 5;
	
	$error_type_words  	= array();
	$spell_check_words 	= array();
	$suggest_words 		= array();

	$suggestcount = 0;
	
	for($i=0;$i<count($words);$i++){
		$error_type_words[$i]="";
	if($suggestcount <$suggestcountinit+1){
	$suggest_words[$i]=	"";
	}
	
	$spell_check_words[$i] = $spellcheckObject -> SpellCheckWord( $words[$i])?"T":"F";	
				
				
		if($spell_check_words[$i]=="F"){
		$error_type_words[$i] =  $spellcheckObject ->ErrorTypeWord( $words[$i]);
			
		
		if($suggestcount <$suggestcountinit+1){
			$suggestcount++;
			$suggest_words[$i]=	 implode(chr(2),$spellcheckObject -> Suggestions( $words[$i] )) ;
		}
			
		}
	}
		
		echo		"WINSETUP";
		echo        chr(5);
		echo		$sender ;
		echo        chr(5);
		echo		implode("",$spell_check_words);
		echo        chr(5);
		echo		implode(chr(1),$error_type_words);
		echo        chr(5);
		echo		implode(chr(1),$suggest_words);
		echo        chr(5);
		echo 		implode(chr(2),$spellcheckObject ->ListDictionaries());
	

	}
	
	
	
	
	if( strtoupper($_GET["command"])=="WINSUGGEST" ){
	
	$words = explode(chr(1),stripcslashes($_GET["args"]));
	$suggest_words 		= array();
	
	
	
	

	$suggestcount = 0;
	
	
	for($i=0;$i<count($words);$i++){
		$suggest_words[$i]=	 implode(chr(2),$spellcheckObject -> Suggestions( $words[$i] )) ;
		}	
		
		echo		"WINSUGGEST";
		echo        chr(5);
		echo		$sender ;
		echo        chr(5);
		echo		implode(chr(1),$suggest_words);

		
	}
	
	if( strtoupper($_GET["command"])=="CTXSPELL"){
	
	$word = stripcslashes($_GET["args"]);
	
	
	
	$words = explode(chr(1),stripcslashes($_GET["args"]));
	$error_type_words  	= array();
	$spell_check_words 	= array();
	$suggest_words 		= array();
	
	for($i=0;$i<count($words);$i++){
	$error_type_words[$i]="";
	
	
	$spell_check_words[$i] = $spellcheckObject -> SpellCheckWord( $words[$i])?"T":"F";
	
		$error_type_words[$i] ="-"		;
		if($spell_check_words[$i]=="F"){
			$error_type_words[$i] =  $spellcheckObject ->ErrorTypeWord( $words[$i]);
			
		}
	}
	
		
		
		echo		"CTXSPELL";
		echo        chr(5);
		echo		$sender ;
		echo        chr(5);
		echo		implode("",$spell_check_words);
		echo        chr(5);
		echo		implode("",$error_type_words);
		
		
		}
		
	elseif( strtoupper($_GET["command"])=="CTXSUGGEST"){
	
	$word = stripcslashes($_GET["args"]);
	
		echo		"CTXSUGGEST";
		echo        chr(5);
		echo		$sender ;		
		echo        chr(5);
		echo		implode(chr(2),$spellcheckObject -> Suggestions( $word )) ;
	
	if($note=="ADDLANGS"){
		echo        chr(5);	
		echo		implode(chr(2),$spellcheckObject -> ListDictionaries( $word )) ;
	
			}
	}
	elseif( strtoupper($_GET["command"])=="RAWSPELL"){
	
	$word = stripcslashes($_GET["args"]);
	$ok = $spellcheckObject -> SpellCheckWord($word);
		echo		"RAWSPELL";
		echo        chr(5);
		echo		$sender ;		
		echo        chr(5);
		echo 		$word;
		echo        chr(5);
		echo 		$ok?"T":"F";
		echo        chr(5);
		
			if($ok){
			echo $word;	
			echo        chr(5);
			echo "";
			}else{
			echo		implode(chr(2),$spellcheckObject -> Suggestions( $word )) ;	
			echo        chr(5);
			echo		$spellcheckObject -> ErrorTypeWord( $word[$i]);
				}
		
	}
	
	if( strtoupper($_GET["command"])=="APISPELL"  ||strtoupper($_GET["command"])=="APISPELLARRAY"   ){
	
	$words = explode(chr(1),stripcslashes($_GET["args"]));
	
	$doSuggest  = ($note!=="NOSUGGEST");
	
	
	$error_type_words  	= array();
	$spell_check_words 	= array();
	$suggest_words 		= array();

	
	for($i=0;$i<count($words);$i++){
		$error_type_words[$i]="";
	    $suggest_words[$i]= array();
	
		$spell_check_words[$i] = $spellcheckObject -> SpellCheckWord( $words[$i])?"T":"F";	
				
				
		if($spell_check_words[$i]=="F"){
		$error_type_words[$i] =  $spellcheckObject ->ErrorTypeWord( $words[$i]);
			
		
		if($doSuggest){
			$suggest_words[$i]=	 implode(chr(2),$spellcheckObject -> Suggestions( $words[$i] )) ;
		}else{
				$suggest_words[$i]="";
			}
			
		}
	}
		
		echo		strtoupper($_GET["command"]);
		echo        chr(5);
		echo		$sender ;
		echo        chr(5);
		echo		implode("",$spell_check_words);
		echo        chr(5);
		echo		implode(chr(1),$error_type_words);
		echo        chr(5);
		echo		implode(chr(1),$suggest_words);
		echo        chr(5);
		echo 		implode(chr(1),$words);
		

	}
	
	if( strtoupper($_GET["command"])=="LISTDICTS"     ){
		$in = stripcslashes($_GET["args"]);
		echo		"LISTDICTS";
		echo        chr(5);
		echo		$sender ;
		echo        chr(5);
		echo 		implode(chr(2),$spellcheckObject ->ListDictionaries());
	
				
		}
	
	if( strtoupper($_GET["command"])=="APIDYM"     ){
		$in = stripcslashes($_GET["args"]);
		echo		strtoupper("APIDYM");
		echo        chr(5);
		echo		$sender ;
		echo        chr(5);
		echo 		$in;
		echo        chr(5);
		echo		$spellcheckObject ->didYouMean($in);
		echo        chr(5);
		echo         $lang;
				
		}
		
		if( strtoupper($_GET["command"])=="APIVALIDATE"){
			$words = explode(chr(1),stripcslashes($_GET["args"]));
			$spellcheckObject -> CaseSensitive = ($note=="CASESENSITVE");
			$error_type_words  	= array();
			$spell_check_words 	= array();
			$valid = true;


			for($i=0;$i<count($words);$i++){
				$error_type_words[$i]="";
			    $suggest_words[$i]= array();

				$spell_check_words[$i] = $spellcheckObject -> SpellCheckWord( $words[$i])?"T":"F";	


				if($spell_check_words[$i]=="F"){
				$valid = false;
				$error_type_words[$i] =  $spellcheckObject ->ErrorTypeWord( $words[$i]);

			
				}
			}

			echo		"APIVALIDATE";
			echo        chr(5);
			echo		$sender ;
			echo        chr(5);
			echo		implode("",$spell_check_words);
			echo        chr(5);
			echo		implode(chr(1),$error_type_words);
			echo        chr(5);
			echo 		implode(chr(1),$words);	
			echo        chr(5);
			echo        $valid?"T":"F";
}
if($script){echo '<script type="text/javascript">window.parent.livespell.ajax.pickupIframe(document.body.innerHTML); </script>';};
?>