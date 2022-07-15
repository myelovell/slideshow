# slideshow
Work for NodearkAB. HTML package for slideshows

# Roadmap frontend - My
- [x] Project Setup/ Research 4h
- [x] Få ner 1-50 `imgID_url`, `imgID_title`, `imgID_position`, `template`, `duration` 3h
- [x] Integrera mallar från CodePen 6h
- [x] Applicerar mall beroende på `mall` 2h
- [x] Applicerar uppspelningstid av bild beroende på `duration` 20min
- [x] Itterera genom bilder 1h
- [x] Applicerar plats av `imgID_title` beroende på `imgID_position` 4h
- [x] Croppar bilderna till fullskärm 2h
- [x] Responsivt ändrar bredd/höjd/proportion 5h

Estimerad tid: 28h 
sla
# Roadmap backend - Nikki
- [x] Välj 1-50 bilder med drag and drop - 8h
- [x] Välj titel för bild (valfri) - 1h
- [x] Välj vart texten hamnar enligt ett grid - 4h
- [x] Override alla val - 2h
- [x] Välj mall - 1h

Estimerad tid: 16h

## URL Params
| Parameter         | Type    | Description                               |
| ----------------- | ------- |------------------------------------------ |
| `imgID_url`       | Dynamic | `<img src="imgID_url" alt="imgID_title">` |
| `imgID_title`     | Dynamic | Displays during slideshow                 |
| `imgID_position`  | Dynamic | Between 0-8, determines placement of text |
| `template`        | static  | Typ av mall vald                          |
| `duration`        | Static  | Tid varje bild spelas                     |
| `positionPrio`    | Static  | If present, applies to all titles         |
| `titlePrio`       | Static  | If present, applies to all titles         |

## Future work
- [ ] Rename templates from 0 and 1 to something else
- [ ] Title animations overlap somewhat, bugg fix
- [ ] Adjust font and font size

# Sources
https://codepen.io/anatravas/pen/YEmoJN
https://codepen.io/seanfree/pen/LxPBZy
