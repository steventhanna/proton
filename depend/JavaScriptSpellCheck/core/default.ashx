<%@ WebHandler Language="C#" Class="ASPNetSpellWebHandler" %>

using System;
using System.Web;
using ASPNetSpell;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Text;
using System.IO;
using System.Web.Configuration;

public class ASPNetSpellWebHandler : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {

        ASPNetSpell.Helpers.renderAJAXHandler.process(context);   
        
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}