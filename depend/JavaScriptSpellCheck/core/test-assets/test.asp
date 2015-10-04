<%option explicit%><%	
Server.ScriptTimeout=20   
 Response.Expires = 0
    Response.Expiresabsolute = Now() - 1
    Response.AddHeader "pragma","no-cache"
    Response.AddHeader "cache-control","private"
    Response.CacheControl = "no-cache" 
			
			 Response.Write("No Command")
              
               	
%>