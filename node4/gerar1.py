import requests
import xml.etree.ElementTree as et
import threading


url = "https://www.annapegova.com.br/feeds/gshopping"

response = requests.get(url)
xml = response.text 

tree = et.ElementTree(et.fromstring(xml))

raiz = tree.getroot()


topo_xml = '<?xml version="1.0" standalone="yes"?>\n<smartCustomXml>\n'
rodape = '\n</smartCustomXml>'

def cria_xml():
    corpo = ''
    
    for no_principal in raiz:

        for no_item in no_principal.findall('item'):

            pid = no_item[3].text
            title = no_item[0].text
            product_type = no_item[9].text
            description = no_item[2].text
            link = no_item[1].text
            image_link = no_item[4].text
            price = no_item[5].text

            e = link.split('/')
            primeira_parte = e[3]

            if response.status_code == 200 and image_link:
                
                tracker = f'https://rankmediabrasil.g2afse.com/click?pid=16&offer_id=62&path={primeira_parte}/'

                corpo += f'''
                <product>
                    <pid>{pid}</pid>
                    <name><![CDATA[{title}]]></name>
                    <category><![CDATA[{product_type}]]></category>
                    <description><![CDATA[{description}]]></description>
                    <page_url><![CDATA[{tracker}]]></page_url>
                    <image_url><![CDATA[{image_link}]]></image_url>
                    <price><![CDATA[{price}]]></price>
                </product>
                '''

            else:
                return None

            

    return topo_xml + corpo + rodape


aqui = cria_xml()
t1 = threading.Thread(target=cria_xml)
t1.start()
t1.join()


with open(file='/var/www/html/xml.smartrecomenda360.com.br/annapegova/annapegova_python.xml', mode='w', encoding='utf8') as fp:
    fp.write(aqui)