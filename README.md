# tesina-test

Este es un repositorio creado con el fin de realizar una evaluacion sobre los frameworks desarollados para la tesina de grado denominada "Normalizacion e Identificacion de objetos duplicados sobre contenido extraido de la web".

El objetivo es evaluar la usabilidad del framework por cada participante a traves de una guia que se les brindara a continuacion. Luego de haber realizado las tareas solicitadas se les realizara un conjunto de preguntas para evaluar la experiencia de uso por cada participante.


En primer lugar contamos con un dataSet con objetos json extraidos de la web. Cada objeto representa un telefono celular extraido de una pagina web en particular. Todos los objetos cuentan con la misma estructura de datos, pero al momento de realizar la extraccion de los mismos, estos pueden contener basura, datos innecesarios o mal formados. El objetivo aqui es realizar una limpieza o normalizacion de datos a traves del framework de normalizacion. Este framework se encuentra dentro del directorio 'normalizer' y cada participante debera extenderlo creando nuevos normalizadores para poder aplicar sobre cada uno de los campos de los objetos. De esta manera buscamos realizar una transformacion de datos para obtener una fuente lo mas limpia posible.

Luego de ello debemos procesar el archivo obtenido a traves del siguiente framework con el fin de obtener aquellos objetos candidatos a duplicados, es decir que se correspondan al mismo objeto en la vida real. Aqui la tarea sera similar a la anterior, es decir, se debera extender el framework pero en este caso creando comparadores de similitud de datos, tanto para un campo en particular como para un objeto entero. La finalidad aqui es, a traves de un objeto tomado como referencia, obtener aquellos objetos candidatos a duplicados.

A continuacion se presenta una guia para que usted pueda realizar las tareas solicitadas, y al finalizar se le realizara una serie de preguntas para evaluar la experiencia de uso.

En primer medida clonamos el repositorio a traves del comando:

git clone 'ruta'

Luego nos moveremos hasta el directorio /normalizer que es donde se encuentra el framework de normalizacion y ejecutaremos el comando 'npm install' para instalar las dependencias correspondientes.

