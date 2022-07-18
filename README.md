# TEST para MELI

* API: https://api.spaceflightnewsapi.net/v3/articles?_limit=100

- [x] El api debe exponer los datos de
  - titulo
  - imagen
  - url
- [x] Se deben paginar los datos de a 10
- [x] Solo se pueden hacer llamadas al api cada 5min
- [x] Establecer estrategia de pagiado eficiente
- [ ] Desarrollar la solución, con los testing unitarios correspondientes
  
## Tasks - testing
- [ ] Backend funcional exportando 100 registros 
- [ ] Especificar que se exporten los campos necesarios
- [x] Crear paginador eficiente
- [x] Que el front lea el api
- [x] Que se pinten los datos
- [x] Poner en funcionamiento REDIS
- [x] Eliminar redis despues de 5min

### Que se evalua
- [ ] Correcta elección de patrones para el problema propuesto
- [ ] Sencillez de código
- [ ] Sustentabilidad del código
- [ ] Uso de estrategias correctas para la solución de problemas
- [ ] Manejo del lenguaje y framework
- [ ] Calidad de unit test
- [ ] Uso de librerias de terceros