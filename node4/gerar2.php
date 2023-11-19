<?php

set_time_limit(1000);
ini_set("memory_limit", "1G");


$xml = simplexml_load_file("https://www.oceane.com.br/XMLData/n-googleshopping.xml");

$ns = $xml->getNamespaces(true);

$xmlstr = "<?xml version='1.0' standalone='yes'?>";
$xmlstr .= "<smartCustomXml>";

foreach($xml->entry as $item){
    
$g = $item->children($ns["g"]);

   $e = explode("/",$g->link);

   //print_r($e);
      

    $linktracker = "https://rankmediabrasil.g2afse.com/click?pid=16&offer_id=17&path=/".$e[3]."/".$e[4];

    $xmlstr .="
     <product>
        <pid>$item->id</pid>
        <name><![CDATA[$g->title]]></name>
        <product_type><![CDATA[$g->product_type]]></product_type>
        <google_product_category><![CDATA[$g->google_product_category]]></google_product_category>
        <description><![CDATA[$g->description]]></description>
        <page_url><![CDATA[$linktracker]]></page_url>
        <image_url><![CDATA[$g->image_link]]></image_url>
        <price>$g->price</price>
     </product>";

}//final do foreach

$xmlstr .= "</smartCustomXml>";

$fp = fopen('oceane.xml', 'w+');
fwrite($fp, $xmlstr."\n");
fclose($fp);


?>