<%option explicit%><!--#include file="asp/ASPSpellClass.asp"--><%	dim LicenseKey, SaveToCentralDictionary%><!--#include file="settings/default-settings.asp"--><%	
Server.ScriptTimeout=30   
 Response.Expires = 0
    Response.Expiresabsolute = Now() - 1
    Response.AddHeader "pragma","no-cache"
    Response.AddHeader "cache-control","private"
    Response.CacheControl = "no-cache" 
		
Dim sent_langs, objASPSpell, objASPSpellDYM,lang, arrLangs, note, script, sender, args, i, dlimit1, dlimit2, dlimit5, command, words, suggestcountinit, error_type_words(), spell_check_words(), suggest_words(), maxsuglength, suggestcount, word, ok, doSuggest, centralDictionaryFile,  OpenFileobj, FSOobj,FilePath, centralDictionaryFilePath, sValid

	Set objASPSpell = ASPSpellObjectProvider.Create("aspspellcheck")
	

	  objASPSpell.ignoreCaseMistakes =false
	  objASPSpell.ignoreAllCaps = false
	  objASPSpell.IgnoreNumeric = false
	  objASPSpell.IgnoreEmailAddresses = false
	  objASPSpell.IgnoreWebAddresses = false
	  objASPSpell.newLineNewSentance = false
	  objASPSpell.LicenseKey = LicenseKey
      objASPSpell.DictionaryPath = (replace(LCASE(Request.ServerVariables("PATH_INFO")),"core/default.asp","dictionaries/"))+""
	  objASPSpell.AddCustomDictionary("custom.txt")
	  objASPSpell.LoadCustomBannedWords("language-rules/banned-words.txt")
	

     ' call LoadCommonTypos(objASPSpell,"language-rules/common-mistakes.txt")
              ////////////////////////////////
	
	

			Response.Buffer = true
			'Response.ContentType = "text/plain"

              lang = "English (International)"
              note = ""
              script = false
              sender = ""
              args = ""
	
    if (Request.QueryString("args")&"" <> "") then args = Request.QueryString("args")
    if (Request.QueryString("lan")&"" <> "") then lang = Request.QueryString("lan")
    if (Request.QueryString("note")&"" <> "") then note = Request.QueryString("note")
    if (Request.QueryString("sender")&"" <> "") then sender = Request.QueryString("sender")
    if (Request.QueryString("script")&"" <> "") then script = true
	if (Request.QueryString("command")&"" <> "") then command = UCASE(Trim(Request.QueryString("command"))) else response.write("No Command"):Response.end()
	
	
	  	 dlimit1 = chr(1)
         dlimit2 = chr(2)
         dlimit5 = chr(5)
	
	

	
	
		arrLangs = Split(lang,",")
			for i=0 to UBOUND(arrLangs)
			objASPSpell.AddDictionary(trim(arrLangs(i)))
		next
	
		   
           




			IF (command ="SAVEWORD") THEN
			
			 Response.Write("SAVEWORD")
                Response.Write(dlimit5)
                Response.Write(sender) 
                Response.Write(dlimit5) 
               

if( NOT SaveToCentralDictionary) THEN response.write "!! SaveToCentralDictionary Must be set true in core/settings/default-settings.asp line 2 to allow for a centralized 'add to dictionary'" : response.end()



 			centralDictionaryFile  = (replace(LCASE(Request.ServerVariables("PATH_INFO")),"core/default.asp","dictionaries/"))+""&"custom.txt"
		  
			on error resume next
			FilePath=Server.MapPath(centralDictionaryFile) 
			Set FSOobj = Server.CreateObject("Scripting.FileSystemObject")
			Set OpenFileobj = FSOobj.OpenTextFile(FilePath, 8)
			OpenFileobj.WriteLine(args)
			OpenFileobj.Close
			on error goto 0
			
			if err.number <>0 then response.write 	"!!Word not saved - "&centralDictionaryFile&" unwritable. Check the permissions for IUSER" : response.end()
			
			

				response.write		 args&" saved to the custom dictionary."

	
		  
		
				
			END IF 	
		 	IF (command = "WINSETUP") THEN
		          
			

		                    words = split(args,dlimit1)
		                    suggestcountinit = 3

		          			redim error_type_words (Ubound(words))
							redim spell_check_words (Ubound(words))
							redim suggest_words (Ubound(words))
							
		                     maxsuglength = 0
		                     suggestcount = 0

		                    for i = 0 to ubound(words) 
		            
		                        error_type_words(i) = ""
		                        if (suggestcount < suggestcountinit + 1) THEN suggest_words(i) = ""
		                        
		         
		                        
		
								IF ( objASPSpell.SpellCheck(words(i))) THEN
									spell_check_words(i) = "T"
									ELSE
									spell_check_words(i) = "F"
									
									 error_type_words(i) = objASPSpell.ErrorTypeWord(words(i))


			                            if (suggestcount < suggestcountinit + 1) THEN
			                            
			                                suggestcount = suggestcount + 1

			                                suggest_words(i) = Join( Fetch_Suggestions(words(i)), dlimit2)
			                                maxsuglength = i + 1
			                            END IF
			
								END IF
		                       

		                        
		                           

		                      
		
		                    next 'i
		
		                   redim preserve  suggest_words (maxsuglength) 
		
		                    Response.Write("WINSETUP")
		                    Response.Write(dlimit5)
		                    Response.Write(sender) 
		                    Response.Write(dlimit5) 
		                    Response.Write(JOIN( spell_check_words,""))
		                    Response.Write(dlimit5) 
		                    Response.Write(JOIN( error_type_words,dlimit1)) 
		                    Response.Write(dlimit5) 
		                    Response.Write(JOIN( suggest_words,dlimit1)) 
		                    Response.Write(dlimit5) 
		                    Response.Write(JOIN( objASPSpell.ListDictionaries(),dlimit2))
						



		                END IF
	
'	   //////////////////////////////// END WINSETUP

			IF (command ="LISTDICTS") THEN
			  Response.Write("WINSETUP")
                Response.Write(dlimit5)
                Response.Write(sender) 
                Response.Write(dlimit5)
                Response.Write(JOIN( objASPSpell.ListDictionaries(),dlimit2))
			END IF 

			IF (command ="WINSUGGEST") THEN

		    words = split(args,dlimit1)
			redim suggest_words (Ubound(words))

    FOR i = 0 to UBOUND(words) 
	suggest_words(i) = Join( Fetch_Suggestions(words(i)), dlimit2)
	NEXT 'i	
	
	     Response.Write		"WINSUGGEST"
	     Response.Write      dlimit5
	     Response.Write		 sender 
	     Response.Write      dlimit5
         Response.Write(JOIN( suggest_words,dlimit1)) 

	
END IF ''' WIN SUGGEST



	IF (command ="CTXSPELL") THEN

    words = split(args,dlimit1)


	redim error_type_words (Ubound(words))
	redim spell_check_words (Ubound(words))
	redim suggest_words (Ubound(words))


  FOR i = 0 to UBOUND(words) 

		error_type_words(i) ="-"		
		IF ( objASPSpell.SpellCheck(words(i))) THEN
			spell_check_words(i) = "T"
		ELSE
			spell_check_words(i) = "F"
			error_type_words(i) =  objASPSpell.ErrorTypeWord(words(i))
		END IF

NEXT 'i
	
	
	 Response.Write	("CTXSPELL")
	 Response.Write (dlimit5)
	 Response.Write	(sender)
	 Response.Write (dlimit5)
     Response.Write(JOIN( spell_check_words,""))
     Response.Write(dlimit5) 
     Response.Write(JOIN( error_type_words,dlimit1))
	
	
END IF 'CTXSPELL


	IF (command ="CTXSUGGEST") THEN

    word = args
	
	 Response.Write	("CTXSUGGEST")
	 Response.Write (dlimit5)
	 Response.Write	(sender)
	 Response.Write (dlimit5)
     Response.Write( Join( Fetch_Suggestions(args), dlimit2) )

	IF(note="ADDLANGS") THEN
		Response.Write (dlimit5)
		 Response.Write(JOIN( objASPSpell.ListDictionaries(),dlimit2))

	END IF
	
END IF 'CTXSUGGEST



	IF (command ="RAWSPELL") THEN

	word =   args
	ok =     objASPSpell.SpellCheck(word)
	Response.Write	("RAWSPELL")
	 Response.Write (dlimit5)
	 Response.Write	(sender)
	Response.Write (word)
	Response.Write	(sender)
	Response.Write (dlimit5)
	IF (ok) THEN 	Response.Write ("T") ELSE 	Response.Write ("F") 
	Response.Write (dlimit5)
	
		if( ok) THEN
	Response.Write (word)
	Response.Write (dlimit5)
	Response.Write ("")
 ELSE 
     	Response.Write( Join( Fetch_Suggestions(word), dlimit2) )
		Response.Write (dlimit5)
		Response.Write objASPSpell.ErrorTypeWord(word)
	END IF
	
	END IF '' RAWSPELL

IF (command ="APISPELL" OR command ="APISPELLARRAY") THEN

 words = split(args,dlimit1)
 doSuggest  = (note<>"NOSUGGEST")

	redim error_type_words (Ubound(words))
	redim spell_check_words (Ubound(words))
	redim suggest_words (Ubound(words))

FOR i = 0 to UBOUND(words) 
	error_type_words(i) = ""
  	IF ( objASPSpell.SpellCheck(words(i))) THEN
		spell_check_words(i) = "T"
		ELSE
		spell_check_words(i) = "F"
		 error_type_words(i) = objASPSpell.ErrorTypeWord(words(i))

			if(doSuggest) THEN
		 	suggest_words(i) = Join( Fetch_Suggestions(words(i)), dlimit2)
			ELSE
		 	suggest_words(i) = ""
			END IF
			
		END IF 
	
NEXT 'i
	
     Response.Write	(command)
	 Response.Write (dlimit5)
	 Response.Write	(sender)
	 Response.Write (dlimit5)
	 Response.Write(JOIN( spell_check_words,""))
	 Response.Write (dlimit5)
     Response.Write(JOIN( error_type_words,dlimit1)) 
     Response.Write(dlimit5) 
     Response.Write(JOIN( suggest_words,dlimit1)) 
     Response.Write(dlimit5)
     Response.Write(JOIN( words,dlimit1)) 

END IF 'APISPELL / APISPELLARRAY

IF (command ="APIDYM" ) THEN

	Set objASPSpellDYM = ASPSpellObjectProvider.Create("aspdidyoumean")
	objASPSpellDYM.setInstallPath( (replace(LCASE(Request.ServerVariables("PATH_INFO")),"core/default.asp","dictionaries/"))+"")
	objASPSpellDYM.setSugguestionsLimit(1)
	arrLangs = Split(lang,",")
		for i=0 to UBOUND(arrLangs)
		objASPSpellDYM.AddDictionary(trim(arrLangs(i)))
	next

	 Response.Write	("APIDYM")
	 Response.Write (dlimit5)
	 Response.Write	(sender)
	 Response.Write (dlimit5)
	 Response.Write (args)
	 Response.Write (dlimit5)
	 Response.Write	(objASPSpellDYM.SuggestionString(args))
	 Response.Write (dlimit5)
	 Response.Write (lang)
			
END IF 'APIDYM




IF (command ="APIVALIDATE") THEN

 words = split(args,dlimit1)
 objASPSpell.ignoreCaseMistakes  = (note="CASESENSITVE")

	redim error_type_words (Ubound(words))
	redim spell_check_words (Ubound(words))
sValid = "T"

FOR i = 0 to UBOUND(words) 
	error_type_words(i) = ""
  	IF ( objASPSpell.SpellCheck(words(i))) THEN
		spell_check_words(i) = "T"
		ELSE
		spell_check_words(i) = "F"
		sValid = "F"
		 error_type_words(i) =  objASPSpell.ErrorTypeWord(words(i))
		END IF 
	
NEXT 'i
	
     Response.Write	(command)
	 Response.Write (dlimit5)
	 Response.Write	(sender)
	 Response.Write (dlimit5)
	 Response.Write(JOIN( spell_check_words,""))
	 Response.Write (dlimit5)
     Response.Write(JOIN( error_type_words,dlimit1)) 
     Response.Write(dlimit5) 
     Response.Write(JOIN( words,dlimit1)) 
     Response.Write(dlimit5) 
     Response.Write(sValid) 

END IF 'APIVALIDATE	


IF (script) THEN response.write ("<script type=""text/javascript"">window.parent.livespell.ajax.pickupIframe(document.body.innerHTML); </script>")

Response.flush
response.end()
%><%

FUNCTION  Fetch_Suggestions (word)
on error resume next
	Fetch_Suggestions = objASPSpell.Suggestions(word)
		if err.number >0 then Fetch_Suggestions = split("","-")
on error goto 0
END FUNCTION	
	


	
%>